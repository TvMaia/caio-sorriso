# Workflow — Relatório Semanal de Performance

> Como executar: abra uma sessão no Claude Code e diga **"gera o relatório semanal"**.
> O Claude puxa os dados, gera o relatório visual como HTML e publica no GitHub Pages (`TvMaia/caio-relatorios`).
> Depois envia o link no Telegram.

---

## Objetivo

Gerar um relatório que VENDE o trabalho que está sendo feito. Não é um dump de números — é uma narrativa de crescimento. Cada métrica vem acompanhada de interpretação, contexto positivo, insights acionáveis e sugestões de próximos passos. O tom é profissional mas confiante: "estamos crescendo e aqui está a prova".

---

## Credenciais

```
TELEGRAM_BOT_TOKEN=*** (GitHub Secret)
TELEGRAM_CHAT_ID=*** (GitHub Secret)

# YouTube
YOUTUBE_API_KEY=*** (GitHub Secret)
YOUTUBE_CHANNEL_ID=UCwKwG8HtVRoU_BoEATv6GRg

# Instagram — via Porter Metrics MCP
# Autenticar no MCP quando solicitado (login Porter → autorizar Instagram do Caio)
```

---

## Métricas a coletar

| Métrica | Instagram | YouTube |
|---|---|---|
| Ganho bruto de seguidores/inscritos | Porter Metrics MCP | YouTube MCP |
| Visualizações totais | Porter Metrics MCP | YouTube MCP |
| Engajamento (curtidas + comentários / views) | Porter Metrics MCP | YouTube MCP |
| Comentários | Porter Metrics MCP | YouTube MCP |
| Top posts/vídeos do período | Porter Metrics MCP | YouTube MCP |
| Tempo médio de visualização | — | YouTube MCP |

**Período:** última semana + últimos 30 dias (comparativo).

---

## Modo de execução

### Modo A — MCPs autenticados (automático)
Porter Metrics + YouTube MCP puxam os dados. Claude gera análise completa sem interação.

### Modo B — Entrada manual
Thiago cola os números de cada rede (dos apps Instagram Insights e YouTube Studio).
Claude gera a análise com o mesmo nível de qualidade.

---

## Tom e estilo do relatório

O relatório existe pra mostrar que o trabalho está dando resultado. Regras:

1. **Nunca números soltos** — cada métrica tem uma frase interpretando o que significa.
   - Ruim: "Views: 12.450"
   - Bom: "12.450 visualizações esta semana — crescimento de 34% vs. semana anterior, puxado pelo Reel sobre [tema X] que sozinho gerou 4.200 views."

2. **Destaque o positivo primeiro** — mesmo em semanas fracas, algo cresceu. Liderar com isso.

3. **Contextualize quedas** — se algo caiu, explicar por que (menos posts, semana sem jogo grande, Instagram cortando bots, etc.) e o que fazer pra reverter.

4. **Insights acionáveis** — não "o engajamento poderia melhorar". Sim "o engajamento nos Reels de reação (4,2%) é 3x maior que nos cortes genéricos (1,1%) — dobrar a produção de reações na próxima semana."

5. **Sugestões concretas** — cada relatório termina com 2-3 ações específicas pra próxima semana, baseadas nos dados, não genéricas.

6. **Comparativo temporal** — sempre mostrar a tendência (semana vs. anterior, mês vs. anterior). Crescimento é narrativa, não foto.

---

## Estrutura do relatório (HTML publicado no GitHub Pages)

O relatório é publicado como página HTML no repo `TvMaia/caio-relatorios`.
URL fixa: `https://tvmaia.github.io/caio-relatorios/`
Visual: usar `frontend-design` skill — layout tipo PDF interativo, não site. Limpo, sofisticado, com a paleta de cores da marca (#0099FF, #FFB400, #00C896, fundo #050C18).

### Seções do relatório

**1. Header**
- "Relatório de Performance — Caio Sorriso"
- Período coberto (ex: "Semana 3 — 09 a 15 Jun 2026")
- Logo CS

**2. Resumo executivo (3-4 linhas)**
- O que aconteceu esta semana em 1 parágrafo. Tom confiante.
- Ex: "Terceira semana consecutiva de crescimento. O Instagram cresceu 18% em visualizações, impulsionado pela reação ao clássico de quarta-feira. TikTok segue em fase de construção com resultados iniciais promissores."

**3. Instagram — @caiosorrisooficial**
- Cards visuais com as métricas + variação % vs. semana anterior
- Novos seguidores (bruto), views, engajamento, comentários
- Top 3 posts da semana (com tema/formato e métricas)
- Interpretação: o que funcionou e por quê
- Insight acionável

**4. YouTube — @caiosorrisooficial**
- Mesma estrutura: cards + variação + top vídeos
- Inscritos, views, watch time médio
- Shorts vs. vídeos longos: qual performou melhor?
- Interpretação + insight acionável

**5. TikTok — @sorrisocaio** (quando dados disponíveis)
- Mesma estrutura

**6. Comparativo cross-platform**
- Qual rede cresceu mais esta semana?
- Onde o público está mais engajado?
- Formato que mais funciona (reação, corte, bastidor)?

**7. Plano de ação — próxima semana**
- 2-3 ações concretas derivadas dos dados
- Ex: "Priorizar reações a lances polêmicos (engajamento 3x maior). Testar 2 Shorts horizontais reaproveitando acervo do programa."

**8. Rodapé**
- "Relatório gerado automaticamente | Dados: Instagram Insights, YouTube Analytics"
- Data/hora de geração

---

## Fluxo de publicação

1. Claude gera o HTML do relatório (via frontend-design skill)
2. Claude clona/atualiza o repo `TvMaia/caio-relatorios`
3. Salva o HTML como `index.html` (sobrescreve o anterior — sempre a versão mais recente)
4. Commit + push → GitHub Pages atualiza automaticamente (~2 min)
5. Claude envia mensagem no Telegram: "Relatório atualizado: https://tvmaia.github.io/caio-relatorios/"

---

## Status das integrações

| Integração | Status |
|---|---|
| Telegram Bot | Configurado (secrets nos 2 repos) |
| YouTube MCP Server | Configurado (API Key + Channel ID) |
| Instagram (Porter Metrics MCP) | Configurado — autenticar na próxima sessão |
| TikTok | Pendente verificação de empresa |

---

## Notas operacionais

- Rodar todo domingo à noite ou segunda de manhã
- Comparar sempre com a semana anterior
- Seguidores: SEMPRE ganho bruto (não líquido) — Instagram está limpando bots, o número líquido distorce
- O HTML sobrescreve o anterior (link fixo, sempre atualizado)
- Manter `marketing/04-estrategia-final/05-log-mudancas.md` atualizado após cada relatório
