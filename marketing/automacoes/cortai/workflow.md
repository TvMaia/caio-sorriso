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

# 3. Whisper (transcrição de áudio, grátis, local)
pip install faster-whisper
```

Verificar se tudo funciona:
```bash
python --version && ffmpeg -version && python -c "from faster_whisper import WhisperModel; print('ok')"
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

### Etapa 1 — Transcrição

```
Entrada: pasta com vídeos (ex: marketing/videos/episodios/)
         ├── ep01-donos-da-bola-2026-06-10.mp4
         ├── ep02-donos-da-bola-2026-06-12.mp4
         └── ep03-american-zone-2026-06-15.mp4
```

O Claude roda o Whisper em cada vídeo:
```bash
# faster-whisper: transcreve com timestamps por segmento
# Modelo "medium" = melhor custo-benefício qualidade/velocidade em português
# ~5-15 min por 30 min de vídeo (CPU) / ~1-3 min (GPU)
python -c "
from faster_whisper import WhisperModel
model = WhisperModel('medium', device='cpu', compute_type='int8')
segments, info = model.transcribe('video.mp4', language='pt')
for s in segments:
    print(f'[{s.start:.1f} → {s.end:.1f}] {s.text}')
"
```

Saída: arquivo `.txt` com transcrição timestamped por vídeo.

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

### Etapa 5 — Thumbnails sugeridas

Para cada clipe, o Claude gera uma **especificação visual de thumbnail**:

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

**Como gerar a thumb:**
- Opção 1: Thiago cria no Canva/CapCut com base na especificação
- Opção 2: Claude gera via Canva MCP (se disponível e configurado)
- Opção 3: Claude gera via código (PIL/Pillow — básico mas funcional)

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

Critérios dos títulos:
- YouTube: keyword principal no início, complemento com contexto, máx 60 chars
- Shorts/Reels/TikTok: gancho emocional, emojis estratégicos, hashtags relevantes
- Sempre incluir nome do programa (SEO) e nome do Caio (marca pessoal)
- Perguntas retóricas e provocações geram mais cliques e comentários

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

```
pasta-escolhida/
├── originais/
│   ├── ep01-donos-da-bola-2026-06-10.mp4
│   ├── ep02-donos-da-bola-2026-06-12.mp4
│   └── ep03-american-zone-2026-06-15.mp4
├── transcricoes/
│   ├── ep01-donos-da-bola-2026-06-10.txt
│   ├── ep02-donos-da-bola-2026-06-12.txt
│   └── ep03-american-zone-2026-06-15.txt
├── cortes/
│   ├── corte_01_var_flamengo.mp4
│   ├── corte_01_var_flamengo.jpg          ← thumb pareada
│   ├── corte_01_var_flamengo_metadata.txt ← título/descrição/tags
│   ├── corte_02_convocacao.mp4
│   ├── corte_02_convocacao.jpg
│   └── ...
├── frames/                                ← previews extraídos
│   ├── ep01_03m25s.jpg
│   ├── ep01_14m30s.jpg
│   └── ...
└── mapa_de_cortes.md                      ← resumo geral gerado pelo Claude
```

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

- Vídeos de 30 min levam ~5-15 min pra transcrever (CPU). Se tiver GPU NVIDIA, muda o device pra `cuda` e cai pra ~1-3 min.
- Cortes com ffmpeg são rápidos (~2-5s por clipe).
- Sempre apresentar o mapa de cortes pro Thiago ANTES de executar — nunca cortar sem aprovação.
- Se o vídeo não tiver o Caio falando (só imagem de jogo), avisar que a análise será limitada (baseada só em frames, não em transcript).
- Thumbs: se Thiago não gerar manualmente, perguntar se quer que o Claude tente gerar via Canva MCP ou PIL básico.
