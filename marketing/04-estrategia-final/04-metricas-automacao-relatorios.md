# Métricas, Automação e Relatórios (Eixo J + novo pedido do Thiago)

---

## Métricas de acompanhamento

Seguidores totais não serve como métrica isolada agora — o Instagram está "limpando" seguidores comprados ao mesmo tempo que ganha seguidores reais, então o número líquido pode cair mesmo crescendo de verdade.

Métricas adotadas (coletar semanalmente, por rede):

1. **Ganho bruto de seguidores** (novos no período, não o saldo líquido)
2. **Visualizações**
3. **Engajamento** (curtidas + comentários / visualizações)
4. **Comentários**
5. **Cliques no link único** (`/links`) — via Google Analytics do site

---

## Automação — visão geral (a detalhar)

Ideia do Thiago: reduzir trabalho manual e criar um fluxo onde a equipe coordena e a "produção" roda sozinha.

### 1. "Caça-tendência" (n8n)

Fluxo: busca periódica de notícias/lances esportivos em alta viralização → manda mensagem no grupo de WhatsApp pedindo pro Caio gravar reação curta → ele responde → equipe edita e reposta nas 3 redes.

**Em aberto antes de construir:**
- Vocês já têm conta n8n (cloud ou self-hosted) ou seria a primeira vez configurando?
- O grupo de WhatsApp é um grupo normal (várias pessoas) ou já existe alguma integração tipo WhatsApp Business API?
- Fonte de "tendência esportiva" preferida (Google Trends, X/Twitter, ESPN, etc.)?

### 2. Relatório semanal automático

Todo domingo/segunda, mandar no grupo do WhatsApp o resultado da última semana + últimos 30 dias das 3 redes (as 5 métricas acima).

**Caminho mais rápido**: testar o plano free do **Metricool** (até 1 marca/20 posts grátis) — já vem com analytics e relatório automático prontos, pode ser mais rápido que construir do zero no n8n. Se não for suficiente, n8n entra como camada extra.

### 3. Edição rápida — fluxo CapCut

1. Caio grava reação (celular) → manda no grupo
2. Edição no CapCut mobile (com Brand Template aplicado) — ~5-10min
3. Publicar direto pro Instagram e TikTok pelo próprio CapCut
4. Subir o mesmo vídeo como Short no app do YouTube — upload separado, rápido (~1min)

### 4. Brand Template no Opus Clip

Configurar 1 template de marca (logo, cores #0099FF/#FFB400/#00C896, fonte Barlow Condensed/Inter) pra aplicar automaticamente em todos os cortes gerados.

---

## Entregável — Relatório de retenção do Caio

Relatório dos últimos 2 meses, pra argumentar continuidade do trabalho:

- Site institucional no ar (antes vs. depois)
- Crescimento das 3 redes no período (seguidores, views, engajamento)
- Comparativo com o cenário do diagnóstico (`01-pesquisa-redes/diagnostico-redes-jun2026.md`)

A montar quando houver dados de pelo menos 2 meses de execução da estratégia.
