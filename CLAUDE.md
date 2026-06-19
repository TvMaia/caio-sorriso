# CLAUDE.md — Projeto Caio Sorriso

## O que é este projeto

Site e estratégia de marketing digital do apresentador Caio Sorriso (Band/RedeTV!, Copa do Mundo 2026).
Domínio: www.caiosorriso.com.br | Deploy: GitHub Pages via Actions | Stack: Astro 4.x + Tailwind CSS

## Workflows disponíveis

### "Roda o caça-tendências"
Busca tendências esportivas do dia (Google News, ge.globo, UOL), analisa potencial de opinião pro Caio, envia top 3-5 no Telegram.
Playbook completo: `marketing/automacoes/caca-tendencias/workflow.md`

### "Gera o relatório semanal"
Puxa métricas das redes (Instagram via Porter Metrics MCP, YouTube via YouTube MCP Server), gera análise com insights, publica como HTML visual no repo `TvMaia/caio-relatorios` (GitHub Pages separado).
Playbook completo: `marketing/automacoes/relatorios/workflow.md`

## MCPs necessários para os workflows

- **Porter Metrics** — Instagram analytics. Se não estiver autenticado, pedir pro Thiago logar (flow no navegador).
- **YouTube MCP Server** — YouTube analytics. API Key já configurada. Channel ID: `UCwKwG8HtVRoU_BoEATv6GRg`.

## Documentação de estratégia

- `marketing/04-estrategia-final/00-estrategia-consolidada.md` — visão geral
- `marketing/04-estrategia-final/05-log-mudancas.md` — log de todas as mudanças feitas (manter atualizado)

## Regras importantes

- Nunca editar código (src/) sem confirmação explícita do Thiago.
- Thiago quer um relatório de tudo que foi feito com motivos — manter `05-log-mudancas.md` atualizado.
- Idioma: sempre português brasileiro.
