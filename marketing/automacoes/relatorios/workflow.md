# Workflow — Relatório Semanal de Performance

> Como executar: abra uma sessão no Claude Code e diga **"gera o relatório semanal"**.
> O Claude puxa os dados disponíveis via API, completa com o que você colar manualmente,
> gera análise com insights e envia no Telegram.

---

## Credenciais (preencher conforme for configurando)

```
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# YouTube Data API v3 (configurado)
YOUTUBE_API_KEY=*** (armazenado como GitHub Secret)
YOUTUBE_CHANNEL_ID=UCwKwG8HtVRoU_BoEATv6GRg

# Instagram — via Porter Metrics MCP (configurado)
# Não precisa de token manual. O MCP do Porter puxa os dados direto.
# Autenticar na próxima sessão do Claude Code (login Porter + autorizar Instagram).

# TikTok API for Business (requer verificação de empresa — em andamento)
TIKTOK_ACCESS_TOKEN=

# Link único — Google Analytics (opcional, para cliques no /links)
GA_PROPERTY_ID=
GA_API_KEY=
```

---

## Métricas a coletar (as 5 definidas na estratégia)

| Métrica | Instagram | TikTok | YouTube |
|---|---|---|---|
| Ganho bruto de seguidores (não líquido) | IG Graph API | TikTok API | YT Data API |
| Visualizações | IG Insights | TikTok Analytics | YT Analytics API |
| Engajamento (curtidas + comentários / views) | IG Insights | TikTok Analytics | YT Analytics API |
| Comentários | IG Insights | TikTok Analytics | YT Analytics API |
| Cliques no link único (/links) | Google Analytics | — | — |

**Período coberto:** última semana + últimos 30 dias (para comparativo).

---

## Modo de execução

### Modo A — APIs configuradas (automático)
Se as credenciais acima estiverem preenchidas, o Claude busca os dados direto das APIs
e gera o relatório completo sem interação.

### Modo B — Entrada manual (enquanto APIs não estão configuradas)
O Claude pergunta os números de cada rede (você cola do Instagram Insights, TikTok Analytics e YouTube Studio)
e gera a análise + insights com os dados fornecidos. Funciona já agora, sem configuração.

---

## Formato do relatório — Telegram

```
📊 Relatório Caio Sorriso — Semana [X] ([DATA])

INSTAGRAM @caiosorrisooficial
├ 📈 Novos seguidores: +[X] (semana) / +[X] (30 dias)
├ 👁 Views: [X] (semana)
├ 💬 Engajamento: [X]%
└ 🔗 Cliques no link: [X]

TIKTOK @sorrisocaio
├ 📈 Novos seguidores: +[X] (semana)
├ 👁 Views: [X]
└ 💬 Engajamento: [X]%

YOUTUBE @caiosorrisooficial
├ 📈 Novos inscritos: +[X] (semana)
├ 👁 Views: [X]
└ ⏱ Tempo médio de visualização: [X]min

---
🧠 ANÁLISE:
[Insights gerados pelo Claude: qual rede performou melhor, qual formato viralizou,
o que repetir na próxima semana, o que ajustar]

📅 Próxima semana: [recomendação principal com base nos dados]
```

---

## Status das APIs

| Integração | Status |
|---|---|
| Telegram Bot | A configurar (ver caca-tendencias/workflow.md) |
| YouTube Data API v3 | Configurado (MCP + GitHub Secrets) |
| Instagram (Porter Metrics MCP) | Configurado — precisa logar na próxima sessão |
| TikTok API for Business | Pendente verificação de empresa (em andamento) |
| Google Analytics | A configurar (após GA instalado no site) |

---

## Notas operacionais

- Rodar todo domingo à noite ou segunda de manhã
- Comparar sempre com a semana anterior — tendência importa mais que número absoluto
- Seguidores: usar ganho BRUTO (novos no período), não líquido — Instagram está removendo bots ao mesmo tempo que ganha seguidores reais
- Usar Modo B até todas as APIs estarem configuradas — os insights gerados pelo Claude têm o mesmo valor com dados manuais
