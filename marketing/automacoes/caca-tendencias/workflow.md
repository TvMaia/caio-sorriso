# Workflow — Caça-Tendências e Análise

> Como executar: abra uma sessão no Claude Code e diga **"roda o caça-tendências"**.
> O Claude lê este arquivo, executa as buscas, analisa e envia no Telegram.

---

## Objetivo

Encontrar temas esportivos com potencial de VIRALIZAÇÃO — não qualquer notícia. O foco é: o que pode explodir em views se o Caio gravar uma opinião de 15-30s sobre isso? Pensar como algoritmo: volume de busca, polêmica, timing, potencial de comentário e compartilhamento.

---

## Credenciais

```
TELEGRAM_BOT_TOKEN=*** (armazenado como GitHub Secret)
TELEGRAM_CHAT_ID=*** (armazenado como GitHub Secret)
```

---

## Fontes de busca (executar TODAS, cruzar resultados)

1. **Google Trends — Brasil, tempo real**
   - WebSearch: buscar "Google Trends" dos assuntos esportivos em alta no Brasil HOJE
   - Foco: volume de busca real, não achismo. O que as pessoas estão digitando no Google agora.

2. **X/Twitter — Trending Topics Brasil**
   - WebSearch: buscar os trending topics de esportes no X/Twitter Brasil
   - Indicador-chave de viralização social em tempo real

3. **Google News RSS — Esportes BR**
   - URL: `https://news.google.com/rss/search?q=futebol+OR+Copa+do+Mundo+OR+NBA+OR+NFL&hl=pt-BR&gl=BR&ceid=BR:pt-419`
   - Filtro: últimas 24h

4. **ge.globo RSS**
   - URL: `https://ge.globo.com/rss/`
   - Principal portal esportivo BR — referência de pauta mainstream

5. **YouTube Trending Brasil — Esportes**
   - Via YouTube MCP Server (API Key configurada)
   - Categoria 17 (Sports), region BR
   - Mostra o que está viralizando em vídeo — alinhamento direto com o formato do Caio

6. **Google Keywords / Volume de busca** (futuro)
   - Quando disponível, cruzar com Google Ads Keyword Planner ou SemRush/Ubersuggest pra validar volume
   - Por enquanto, usar Google Trends como proxy de volume

---

## Critérios de seleção — foco em VIRALIZAÇÃO

Não é uma lista de notícias. É uma curadoria de oportunidades de conteúdo viral. Cada tema é avaliado por:

### 1. Volume de busca / trending (peso principal)
- Está no Google Trends? → forte sinal
- Está nos trending topics do X? → forte sinal
- Aparece em 2+ fontes simultaneamente? → confirmação de viralização
- Está no YouTube Trending BR? → validação de que o formato vídeo funciona pra esse tema

### 2. Potencial de opinião forte (o que diferencia o Caio de um portal genérico)
- Polêmica: VAR, erro de arbitragem, pênalti duvidoso, expulsão contestada
- Decisão controversa: convocação, escalação, demissão de técnico
- Rivalidade/provocação: clássico, eliminação, goleada humilhante
- Surpresa: zebra, resultado inesperado, recorde quebrado

### 3. Timing (janela de oportunidade)
- Pré-jogo grande (clássico, eliminatória, final): pauta de expectativa/previsão
- Pós-jogo quente (últimas 6h): reação imediata — MAIOR potencial viral
- Controvérsia em andamento: debate aberto, público dividido

### 4. Potencial de engajamento (algoritmo)
- Tema que gera comentários (pessoas querem dar opinião → algoritmo impulsiona)
- Tema que gera compartilhamento ("manda pro amigo que torce pro time X")
- Tema que gera rewatch (lance absurdo, erro grotesco)

### Descartar
- Notícias puramente informativas sem ângulo de opinião (ex: "CBF anuncia data de jogo")
- Temas com mais de 24h sem desdobramento novo
- Qualquer coisa fora do universo esportivo

---

## Output: não é lista de notícias — são PAUTAS

Para cada tema selecionado (top 3-5), entregar:

```
🏆 CAÇA-TENDÊNCIAS — [DATA HOJE]

1️⃣ [TEMA]
📊 Volume: [Google Trends / X Trending / YouTube Trending — de onde veio o sinal]
🎯 Ângulo viral: [qual opinião forte o Caio pode dar — ex: "concordar/discordar de X", "provocar torcida do Y"]
🗣️ Gancho: [frase de abertura sugerida pro vídeo — 1 linha, direta, polêmica]
🔗 [link de referência]

2️⃣ [TEMA]
📊 Volume: [fonte do sinal]
🎯 Ângulo viral: [sugestão de posicionamento]
🗣️ Gancho: [frase de abertura]
🔗 [link]

3️⃣ [TEMA]
📊 Volume: [fonte]
🎯 Ângulo viral: [sugestão]
🗣️ Gancho: [frase]
🔗 [link]

---
💬 Mensagem pronta pro grupo do Caio (copiar e colar):
"Caio, [tema 1] tá explodindo agora. Manda um vídeo de 15-20s falando o que você acha — pode ser rápido, sem roteiro. [link de referência]"

📝 Títulos sugeridos pro post (SEO + viral):
Instagram: [título + hashtags relevantes]
TikTok: [título curto, gancho nos primeiros 3 seg]
YouTube Shorts: [título com keyword principal + curiosidade]
```

---

## Como enviar no Telegram

```bash
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d "chat_id=${TELEGRAM_CHAT_ID}" \
  -d "text=${MENSAGEM}" \
  -d "parse_mode=HTML"
```

---

## Notas operacionais

- Rodar preferencialmente às 9h (antes de começar o dia de trabalho)
- Durante a Copa: rodar também às 18h pra capturar discussões pré/pós-jogo
- Se nenhum tema tiver volume real de busca/trending: avisar "sem oportunidade viral hoje — melhor não postar nada fraco" em vez de forçar uma lista
- O objetivo é qualidade, não quantidade: 1 pauta viral vale mais que 5 medianas
