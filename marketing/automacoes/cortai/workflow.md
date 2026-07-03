# CortAI — Processamento Inteligente de Vídeos

> Como executar: abra uma sessão no Claude Code e diga **"roda o cortai"** ou **"processa os vídeos da pasta X"**.
> O Claude lê este arquivo, transcreve os vídeos, identifica temas, sugere cortes, executa e prepara upload.

---

## O que é

Sistema de corte, curadoria e publicação de vídeos longos (30+ min) em clipes curtos otimizados pra redes sociais. Funciona como um Opus Clip, mas com inteligência real: entende o contexto, separa por tema, remove propaganda, sugere thumbs e gera títulos SEO — tudo rodando local, grátis, dentro do Claude Code.

---

## Pré-requisitos (instalar uma vez)

```bash
# 1. Python 3.11+ (python.org → download → instalar com "Add to PATH" marcado)
python --version

# 2. ffmpeg (ffmpeg.org → download → extrair → adicionar ao PATH do Windows)
ffmpeg -version

# 3. requests (para chamar a Groq API de transcrição)
pip install requests
```

Transcrição é via Groq API (não Whisper local — ver Etapa 1). Precisa da
`GROQ_API_KEY` no arquivo `marketing/automacoes/cortai/.env`.

Verificar se tudo funciona:
```bash
python --version && ffmpeg -version && python -c "import requests; print('ok')"
```

---

## Credenciais

Todas as credenciais (YouTube API, Telegram, etc.) estão na **memória local do projeto** (`reference_credenciais.md`). O Claude lê automaticamente ao abrir a sessão.

Para upload no YouTube: além da API Key (já configurada, serve pra leitura), é necessário **OAuth 2.0** para upload. Configurar uma vez:
1. Google Cloud Console → APIs & Services → Credentials → Create OAuth Client ID
2. Tipo: Desktop Application
3. Baixar o `client_secret.json` e colocar na pasta do projeto
4. Na primeira execução, o navegador abre pra autorizar — depois não pede mais

---

## Fluxo completo

### Etapa 1 — Transcrição (via Groq API, não Whisper local)

```
Entrada: vídeos na pasta marketing/automacoes/cortai/to cut/
         └── DDB 2806 BET.mp4
```

**Transcrição é feita na Groq API, não no Whisper local.** O CPU do Thiago
(4 núcleos, sem GPU) não aguenta o faster-whisper `medium` — rodava a ~5x o
tempo real (1h+ por 12 min de áudio) e travava. A Groq roda o mesmo modelo
open-source (`whisper-large-v3`) na nuvem, de graça (free tier, sem cartão):
transcreveu 29 min de áudio em ~17s.

Fluxo (script `transcrever_groq.py`):
1. ffmpeg extrai o áudio e comprime pra mp3 mono 64k (cabe no limite de 25MB do free tier)
2. POST pra `https://api.groq.com/openai/v1/audio/transcriptions`
   (model `whisper-large-v3`, language `pt`, response_format `verbose_json`)
3. A `GROQ_API_KEY` fica em `marketing/automacoes/cortai/.env` (gitignored)

Saída: `.txt` timestamped em `transcricoes/`.

---

### Etapa 2 — Análise inteligente (Claude)

O Claude lê todas as transcrições e identifica:

**Temas discutidos:**
- Agrupa trechos por assunto (ex: "VAR do jogo Flamengo x Palmeiras", "convocação da seleção", "NBA playoffs")
- Mapeia timestamps de início e fim de cada tema
- Detecta quando o mesmo tema volta a ser discutido em outro momento do vídeo

**Momentos-chave (potencial de clipe viral):**
- Opinião forte/polêmica do Caio
- Humor/risada/reação espontânea
- Discordância entre apresentadores
- Frase de efeito / punchline
- Revelação ou informação exclusiva

**Blocos a REMOVER:**
- Propaganda/patrocínio ("patrocinador", "link na descrição", "aproveite a promoção")
- Vinheta de abertura/encerramento (se repetitiva)
- Silêncio longo / intervalo
- Conversa off-topic sem valor de conteúdo

**Pontos de corte:**
- Início: frase de abertura clara sobre o tema (não cortar no meio de uma frase)
- Fim: conclusão natural, frase de efeito, ou mudança de assunto
- Margem: 0.5s antes e depois pra respiração natural

---

### Etapa 3 — Apresentação do mapa de cortes

O Claude apresenta pro Thiago:

```
📹 MAPA DE CORTES — ep01-donos-da-bola-2026-06-10.mp4

TEMA A: VAR Flamengo x Palmeiras (3 segmentos, total ~4:20)
├ Segmento 1: 03:22 → 05:10 (1:48) — Caio critica decisão do árbitro
├ Segmento 2: 14:30 → 16:45 (2:15) — Debate com outro apresentador
└ Segmento 3: 28:01 → 28:18 (0:17) — Conclusão com frase de efeito
📸 Frame preview: [imagem extraída de 03:25]

TEMA B: Convocação Seleção (2 segmentos, total ~3:10)
├ Segmento 1: 07:00 → 09:15 (2:15) — Lista de convocados, opinião
└ Segmento 2: 22:40 → 23:35 (0:55) — "Fulano não merecia"
📸 Frame preview: [imagem extraída de 07:05]

⛔ REMOVIDOS:
├ 00:00 → 01:30 — Vinheta de abertura
├ 12:00 → 14:00 — Bloco de propaganda
└ 25:00 → 26:30 — Patrocínio

CLIPES SUGERIDOS: 8 clipes de 45s-3min
```

**Thiago revisa:** "aprova todos", "tira o corte 3", "junta tema A e B no mesmo clipe", etc.

---

### Etapa 4 — Execução dos cortes (ffmpeg)

Após aprovação, o Claude executa:

```bash
# Corte preciso por timestamp + crossfade de áudio suave
ffmpeg -i input.mp4 -ss 03:22 -to 05:10 \
  -af "afade=t=in:st=0:d=0.3,afade=t=out:st=108:d=0.5" \
  -c:v libx264 -c:a aac \
  corte_01_var_flamengo.mp4

# Compilar múltiplos segmentos do mesmo tema (com crossfade entre eles)
# 1. Cortar cada segmento
# 2. Criar arquivo de concat
# 3. Concatenar com filtro de áudio suave
ffmpeg -f concat -safe 0 -i segments.txt \
  -af "acrossfade=d=0.3:c1=tri:c2=tri" \
  tema_a_var_flamengo_compilado.mp4

# Extrair frame pra preview/thumb
ffmpeg -ss 03:25 -i input.mp4 -frames:v 1 -q:v 2 \
  frame_03_25.jpg
```

**Formatos de saída:**
- Vertical (9:16) pra Instagram Reels, TikTok, YouTube Shorts
- Horizontal (16:9) pra YouTube vídeo normal
- O Claude pergunta qual formato antes de cortar, ou gera ambos

---

### Etapa 5 — Thumbnails sugeridas (em formato de PROMPT para IA)

Para cada clipe, o Claude gera um **prompt pronto para IA de imagem** (não uma
spec manual). O Thiago gera a thumb numa IA enviando o prompt + uma arte de
referência do rosto do Caio, para a IA basear a expressão facial.
Ferramentas recomendadas: Nano Banana Pro (Gemini image) pela fidelidade do
rosto a partir da referência; Ideogram quando o texto dentro da imagem é
crítico; Canva para finalizar texto/marca. Cada prompt define cena, expressão
desejada, texto principal/secundário (COM acentos), cores da marca e estilo
viral esportivo. Exemplo de spec visual subjacente:

```
📸 THUMB — corte_01_var_flamengo.mp4

Frame base: extrair de 04:22 (Caio com expressão de indignação)
Texto principal: "ROUBARAM O FLAMENGO?" 
  → Fonte: bold, caps, amarelo #FFB400
  → Posição: centro-inferior, com sombra preta pra contraste
Texto secundário: "VAR anulou gol legítimo"
  → Fonte: regular, branco, menor
  → Posição: abaixo do principal
Fundo: frame do vídeo escurecido (overlay preto 40%) pra destacar texto
Emoção: indignação/surpresa
Cores da marca: #FFB400 (texto), #0099FF (destaque opcional), #050C18 (overlay)

Referência de estilo: thumbnail esportiva de alta performance
(alto contraste, expressão facial forte, texto curto e provocativo,
sem poluição visual, máximo 5 palavras no título principal)
```

**Formato de entrega (decidido pelo Thiago):** o Claude escreve um arquivo
`thumbnails.txt` na pasta do vídeo, com um bloco por corte. Cada bloco traz:
- EXPRESSÃO DESEJADA (o que o rosto do Caio deve transmitir)
- PROMPT pronto para colar na IA de imagem (cena, texto principal/secundário
  COM acentos, cores da marca, estilo viral, instrução de usar a arte de
  referência do rosto enviada junto)

**Como gerar a thumb:**
- O Thiago abre a IA de imagem, cola o PROMPT e anexa uma arte de referência
  do rosto do Caio (a IA copia a expressão pedida).
- Ferramentas recomendadas, nessa ordem:
  1. Nano Banana Pro (Gemini image) — melhor fidelidade do rosto a partir da referência
  2. Ideogram — quando o texto dentro da imagem precisa sair perfeito
  3. Canva — para finalizar texto/marca por cima

**Pareamento automático:**
O arquivo da thumb DEVE ter o mesmo nome do vídeo:
```
corte_01_var_flamengo.mp4  →  corte_01_var_flamengo.jpg
corte_02_convocacao.mp4    →  corte_02_convocacao.jpg
```
O Claude detecta o `.jpg`/`.png` pareado automaticamente ao fazer upload.

---

### Etapa 6 — Títulos, descrições e hashtags (SEO + viral)

Para cada clipe aprovado, o Claude gera:

```
📝 METADATA — corte_01_var_flamengo.mp4

YOUTUBE (horizontal):
Título: "VAR ROUBOU O FLAMENGO? Gol anulado polêmico | Os Donos da Bola"
Descrição: "O VAR anulou o gol do Flamengo contra o Palmeiras e a torcida
não perdoou. Caio Sorriso dá sua opinião sobre a decisão mais polêmica
da rodada. #VAR #Flamengo #Palmeiras #OsDonosDaBola"
Tags: VAR, Flamengo, Palmeiras, gol anulado, Os Donos da Bola, Caio Sorriso

YOUTUBE SHORTS (vertical):
Título: "VAR ROUBOU? 😤 #flamengo #var #futebol"

INSTAGRAM REELS:
Legenda: "O VAR tirou o gol do Mengão e o Caio não ficou quieto 🔥
Concordam ou não? Comenta aí 👇
.
.
.
#VAR #Flamengo #Palmeiras #FutebolBrasileiro #OsDonosDaBola
#CaioSorriso #CopaDoMundo2026 #Futebol #Polêmica"

TIKTOK:
Legenda: "VAR ROUBOU O FLAMENGO? 😤🔥 #var #flamengo #futebol
#palmeiras #osdonosdabola #esporte #viral #fy"
```

Critérios (padrões decididos pelo Thiago):
- TÍTULOS: clickbait honesto — provocam o clique (pergunta retórica, tensão,
  número, "polêmica") SEM mentir sobre o conteúdo do corte. Keyword principal
  no início, nome do programa e do Caio quando couber.
- DESCRIÇÕES: longas e ricas em palavras-chave. O Thiago acredita no SEO do
  YouTube — quanto maior e com mais keywords relevantes, melhor. Incluir
  seção de PALAVRAS-CHAVE e bloco de HASHTAGS no fim.
- ACENTUAÇÃO obrigatória em TUDO (títulos, descrições, hashtags, legendas).
  Nunca entregar texto sem acento. Ver feedback_acentos na memória.
- Shorts/Reels/TikTok: gancho emocional, emojis estratégicos, hashtags relevantes.
- Saída: arquivo `titulos_descricoes.txt` na pasta do vídeo, um bloco por corte,
  com o vídeo de origem no topo (pra identificar a origem no upload/agendamento).

---

### Etapa 7 — Upload e publicação

Após Thiago aprovar os clipes + thumbs:

```
Thiago: "sobe os cortes 1, 3, 5 e 7 no YouTube"
                    ↓
Claude verifica:
  ✅ corte_01_var_flamengo.mp4 + corte_01_var_flamengo.jpg (thumb)
  ✅ corte_03_convocacao.mp4 + corte_03_convocacao.jpg
  ✅ corte_05_nba.mp4 (⚠️ sem thumb — avisar)
  ✅ corte_07_copa.mp4 + corte_07_copa.jpg
                    ↓
Upload via YouTube Data API (OAuth 2.0):
  - Vídeo + título + descrição + tags + thumbnail
  - Visibilidade: public/unlisted/private (Thiago decide)
  - Playlist: adicionar automaticamente se existir
                    ↓
Confirma links dos vídeos publicados no Telegram
```

---

## Estrutura de pastas (gerada automaticamente)

A saída é organizada **por vídeo de origem**. Como no futuro serão 5-6 vídeos
longos gerando dezenas de cortes, cada corte fica numa subpasta com o nome do
vídeo de onde veio — assim dá pra rastrear a origem na hora do upload/agendamento.

```
marketing/automacoes/cortai/
├── to cut/                                 ← vídeos longos a processar
│   └── DDB 2806 BET.mp4
├── transcricoes/                           ← .txt timestamped (gitignored o .mp3)
│   └── DDB 2806 BET_<timestamp>.txt
└── cutted/
    └── DDB 2806 BET/                        ← subpasta = nome do vídeo de origem
        ├── corte_01_paysandu_ferroviaria.mp4
        ├── corte_02_csa_futebol_alagoano.mp4
        ├── ...
        ├── titulos_descricoes.txt          ← 1 bloco por corte (com vídeo de origem no topo)
        └── thumbnails.txt                  ← prompts de IA, 1 bloco por corte
```

As thumbs geradas na IA voltam pra essa mesma pasta, com o mesmo nome do corte
(`corte_01_paysandu_ferroviaria.jpg`), pra pareamento automático no upload.

---

## Configurações ajustáveis

| Parâmetro | Padrão | Pode mudar |
|---|---|---|
| Modelo Whisper | `medium` | `small` (mais rápido) ou `large-v3` (mais preciso) |
| Duração mínima do clipe | 30s | Qualquer valor |
| Duração máxima do clipe | 3min | Qualquer valor |
| Crossfade de áudio | 0.3s | 0.1s a 1.0s |
| Formato de saída | vertical 9:16 | horizontal 16:9, ambos |
| Idioma da transcrição | português (pt) | qualquer idioma suportado pelo Whisper |

---

## Notas operacionais

- Transcrição via Groq é quase instantânea (~17s pra 29 min de áudio). O gargalo não é mais essa etapa.
- Cortes com ffmpeg neste CPU rodam a ~2x o tempo real mesmo com preset veryfast (ex.: 14 min de cortes levaram ~24 min). É CPU-bound, normal. Acompanhar pelo Zoião.
- Acompanhamento: o Zoião (painel flutuante local em `marketing/automacoes/painel/`) mostra progresso em tempo real. Não consome tokens — é 100% local.
- Sempre apresentar o mapa de cortes pro Thiago ANTES de executar — nunca cortar sem aprovação.
- Se o vídeo não tiver o Caio falando (só imagem de jogo), avisar que a análise será limitada (baseada só em frames, não em transcript).
- Thumbs: o Claude entrega PROMPTS de IA (`thumbnails.txt`); o Thiago gera na IA com a arte de referência do rosto. Ver Etapa 5.
