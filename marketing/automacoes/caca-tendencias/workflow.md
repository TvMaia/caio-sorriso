# Workflow — Caça-Tendências e Análise

> Como executar: abra uma sessão no Claude Code e diga **"roda o caça-tendências"**.
> O Claude lê este arquivo, executa as buscas, analisa e envia no Telegram.

---

## Credenciais (preencher uma vez)

```
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

---

## Fontes de busca (executar todas)

1. **Google News RSS — Esportes BR**
   - Query: `futebol OR "Copa do Mundo" OR "Seleção Brasileira" OR NBA OR NFL OR VAR`
   - Filtro: últimas 24h
   - URL: `https://news.google.com/rss/search?q=futebol+OR+Copa+do+Mundo&hl=pt-BR&gl=BR&ceid=BR:pt-419`

2. **ge.globo RSS**
   - Feed geral de esportes do Globo Esporte
   - URL: `https://ge.globo.com/rss/`

3. **UOL Esportes RSS**
   - URL: `https://esporte.uol.com.br/rss.xml`

4. **YouTube Trending Brasil — Esportes** (se API key disponível)
   - Categoria 17 (Sports), region BR
   - `YOUTUBE_API_KEY=` *(opcional, preencher se tiver)*

---

## Critérios de seleção e pontuação

Cada item recebe uma pontuação de 0 a 10:

**+2 pontos — é esporte:**
futebol, copa, gol, seleção, nba, nfl, time, pênalti, var, expulsão, jogador, técnico, campeonato, torneio, bola, árbitro, torcida

**+3 pontos — tem potencial de opinião (critério principal):**
VAR, polêmica, erro, injusto, expulsão, contestado, confusão, briga, suspenso, flagrante, "deveria ter", "não era", "roubaram", "escândalo", pênalti, falta

**+2 pontos — recência:**
- Últimas 6h: +2
- Últimas 12h: +1
- Últimas 24h: +0

**+1 ponto — aparece em 2+ fontes:**
Mesmo tema em múltiplas fontes = sinal mais forte de viralização

**Descartar:**
- Score abaixo de 3
- Notícias de mais de 24h
- Temas sem conexão com esporte (política, celebridade, etc.)

**Selecionar:** top 3 a 5 itens com maior pontuação.

---

## Formato da mensagem — Telegram

```
🏆 Tendências esportivas — [DATA HOJE]

1️⃣ [TÍTULO DO TEMA]
📰 [Fonte] • há [X]h
🎯 Potencial: [motivo — ex: polêmica de VAR, tema viral no Google]
🔗 [link]

2️⃣ [TÍTULO DO TEMA]
📰 [Fonte] • há [X]h
🎯 Potencial: [motivo]
🔗 [link]

3️⃣ [TÍTULO DO TEMA]
📰 [Fonte] • há [X]h
🎯 Potencial: [motivo]
🔗 [link]

---
💬 Sugestão de mensagem pro Caio (copiar e colar no grupo):
"Caio, separamos esse lance: [título do tema 1]. Manda um áudio ou vídeo de 15-20s falando o que você achou — pode ser rápido, sem roteiro."
```

---

## Como enviar no Telegram

```bash
curl -s -X POST "https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d "chat_id={TELEGRAM_CHAT_ID}" \
  -d "text={MENSAGEM}" \
  -d "parse_mode=HTML"
```

---

## Notas operacionais

- Rodar preferencialmente às 9h (antes de começar o dia de trabalho)
- Durante a Copa: rodar também às 18h pra capturar discussões pré-jogo
- Se nenhum item atingir score mínimo: avisar no Telegram "sem temas relevantes hoje" em vez de mandar lista fraca
