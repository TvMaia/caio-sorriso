# Workflow — Caça-Tendências e Análise

> Como executar: abra uma sessão no Claude Code e diga **"roda o caça-tendências"**.
> O Claude lê este arquivo, executa as buscas, analisa e envia no Telegram.

---

## Objetivo

Encontrar temas de **futebol** com potencial de VIRALIZAÇÃO — não qualquer notícia. Futebol é o foco principal. Outros esportes (NBA, NFL, Copa) só entram se estiverem explodindo em trending e tiverem ângulo de opinião muito forte. O foco é: o que pode explodir em views se o Caio gravar uma opinião de 15-30s sobre isso? Pensar como algoritmo: volume de busca, polêmica, timing, potencial de comentário e compartilhamento.

---

## Credenciais

Todas as credenciais (Telegram bot token, chat ID, YouTube API Key, etc.) estão armazenadas na **memória local do projeto** (`reference_credenciais.md`) — o Claude lê automaticamente ao abrir a sessão. Não precisam estar neste arquivo (repo público).

---

## Fontes de busca (executar TODAS, cruzar resultados)

1. **Google Trends — Brasil, tempo real**
   - WebSearch: buscar "Google Trends" dos assuntos esportivos em alta no Brasil HOJE
   - Foco: volume de busca real, não achismo. O que as pessoas estão digitando no Google agora.

2. **X/Twitter — Trending Topics Brasil**
   - WebSearch: buscar os trending topics de esportes no X/Twitter Brasil
   - Indicador-chave de viralização social em tempo real

3. **Google News RSS — Futebol BR**
   - URL: `https://news.google.com/rss/search?q=futebol+OR+Brasileirão+OR+Copa+do+Mundo+OR+seleção+brasileira+OR+Flamengo+OR+Palmeiras+OR+Corinthians&hl=pt-BR&gl=BR&ceid=BR:pt-419`
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

### Como usar este arquivo nas Rotinas do Claude.ai

Nas instruções da rotina, basta referenciar este arquivo:

```
Leia e siga exatamente o workflow em:
https://github.com/TvMaia/caio-sorriso/blob/main/marketing/automacoes/caca-tendencias/workflow.md

Não há credenciais necessárias. Ao finalizar, gere o resultado como arquivo TXT
com o nome tendencias-[DATA].txt — o conteúdo chegará na notificação da rotina.
```

Assim o prompt da rotina fica curto e as regras ficam todas aqui, versionadas no repositório. Qualquer ajuste no workflow vale automaticamente na próxima execução da rotina.

---

### Princípios do texto

O resultado é gerado como **arquivo TXT** e entregue via notificação da rotina. Thiago copia e encaminha para o Caio e para os redatores da equipe. O texto precisa ser lido por:
- **Thiago** (gestor de marketing — quer entender o potencial viral e tomar decisão rápida)
- **Caio Sorriso** (apresentador — precisa entender o que está acontecendo, por que é relevante pra ele, e se inspirar pra gravar)
- **Redatores da equipe** (precisam de contexto suficiente pra desenvolver o conteúdo sem depender do Caio)

**Regras de escrita:**
- Linguagem simples, direta, como conversa de WhatsApp — sem jargão de marketing
- Parágrafos curtos, uma ideia por linha, respiração entre os blocos
- Explicar o PORQUÊ de cada sugestão — não basta dizer "está em alta", tem que dizer o que está acontecendo e por que o Caio tem algo a dizer sobre isso
- Tom animado mas objetivo — não exagerar em emojis, usar só os estruturais
- O Caio e a equipe precisam sair da leitura com vontade de agir — a mensagem tem que inspirar ação

**Regras da frase de abertura (Como gravar):**
A frase sugerida precisa ser um gancho de stop scrolling — alguém rolando o feed para tudo pra ouvir. Não pode ser genérica. Critérios obrigatórios:
- Começa com provocação, pergunta polêmica ou afirmação surpreendente — nunca com "Olá" ou apresentação
- Máximo 10 palavras — o algoritmo decide nos primeiros 2 segundos
- Gera curiosidade ou discordância imediata — o espectador precisa querer saber o que vem depois
- Tom de quem sabe o que está falando, não de locutor — natural, como papo de bar
- Exemplos do que funciona: "Isso foi roubo e todo mundo sabe." / "Esse cara não merecia estar na seleção." / "Sabe por que o Brasil vai perder? Eu sei."
- Exemplos do que NÃO funciona: "Hoje vou falar sobre..." / "Pessoal, temos novidades..." / "Então, o que aconteceu foi..."

### Formato do arquivo TXT (estrutura exata)

O arquivo deve se chamar `tendencias-[AAAA-MM-DD].txt` e ter o seguinte conteúdo:

```
🏆 TENDÊNCIAS DO DIA — [DATA]

Caio e equipe, aqui estão os temas que estão bombando no futebol hoje. Cada um vem com sugestão de como gravar e o que falar — é só escolher e partir pra ação.

━━━━━━━━━━━━━━━

1️⃣ *[NOME DO TEMA EM CAIXA ALTA]*

O que está acontecendo:
[2-3 linhas explicando o fato de forma simples, como se estivesse contando pra um amigo. Sem termos técnicos.]

Por que está bombando:
[1-2 linhas — de onde veio o sinal: X/Twitter, Google Trends, ge.globo, YouTube. Quantas pessoas estão falando sobre isso.]

Por que é pra você:
[1-2 linhas — qual é o ângulo único que o Caio tem pra dar. Por que a opinião DELE importa nesse tema específico. O que ele sabe ou viveu que outros não sabem.]

Como gravar (15-30 segundos, vertical):
"[Frase de abertura stop scrolling — máx 10 palavras, provoca ou surpreende, nunca começa com apresentação]"

CTA sugerido (falar no final do vídeo):
"[Frase curta que pede ação — ex: 'Comenta aqui o que você acha.' / 'Segue pra mais análises assim.' / 'Manda pra aquele amigo que discorda de você.']"

🔗 [link da notícia de referência]

━━━━━━━━━━━━━━━

2️⃣ *[NOME DO TEMA]*

O que está acontecendo:
[explicação simples]

Por que está bombando:
[fonte do sinal]

Por que é pra você:
[ângulo do Caio]

Como gravar (15-30 segundos, vertical):
"[frase de abertura stop scrolling]"

CTA sugerido:
"[frase de encerramento que gera ação]"

🔗 [link]

━━━━━━━━━━━━━━━

3️⃣ *[NOME DO TEMA]*

O que está acontecendo:
[explicação simples]

Por que está bombando:
[fonte do sinal]

Por que é pra você:
[ângulo do Caio]

Como gravar (15-30 segundos, vertical):
"[frase de abertura stop scrolling]"

CTA sugerido:
"[frase de encerramento que gera ação]"

🔗 [link]

━━━━━━━━━━━━━━━

📝 *Títulos prontos pra usar no post:*

Tema 1 — Instagram/Reels: [título + hashtags]
Tema 1 — TikTok: [título curto]
Tema 1 — YouTube Shorts: [título com keyword]

━━━━━━━━━━━━━━━

💡 *Dica do dia:*
[Uma frase de contexto estratégico — ex: "Esse tema tem janela de 6h, ideal postar até o meio-dia." ou "Se gravar hoje, pega o pico da discussão antes do jogo."]
```

---

## Entrega do resultado

Ao finalizar a análise, **gerar um arquivo TXT** com o nome `tendencias-[AAAA-MM-DD].txt` contendo o relatório completo no formato acima. Não enviar por Telegram. O arquivo aparece na notificação da rotina — Thiago copia e encaminha para o Caio e redatores.

---

## Notas operacionais

- Rodar preferencialmente às 9h (antes de começar o dia de trabalho)
- Durante a Copa: rodar também às 18h pra capturar discussões pré/pós-jogo
- Se nenhum tema tiver volume real de busca/trending: avisar "sem oportunidade viral hoje — melhor não postar nada fraco" em vez de forçar uma lista
- O objetivo é qualidade, não quantidade: 1 pauta viral vale mais que 5 medianas
