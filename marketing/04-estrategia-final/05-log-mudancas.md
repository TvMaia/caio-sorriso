# Log de Mudanças — Caio Sorriso

> Registro de cada alteração feita (site + redes), com o motivo. Base pro relatório de retenção (`04-metricas-automacao-relatorios.md`).

---

## Site

- **Correção do card/link do TikTok** (`SocialMedia.astro`, `Footer.astro`) — o card apontava pra URL/ícone do Instagram, com cor quase invisível. Corrigido pra `https://www.tiktok.com/@sorrisocaio`, ícone correto, cor `#25F4EE`.
  - *Motivo*: bug encontrado no diagnóstico (`01-pesquisa-redes/diagnostico-redes-jun2026.md`) — TikTok estava praticamente sem divulgação no site.

- **Página `/links` criada** — link único com Site/Mídia Kit, Instagram, TikTok, YouTube e Contato Comercial.
  - *Motivo*: padrão "link único" pra bio das 3 redes, permite medir cliques via Analytics do próprio site (métrica definida em `04-metricas-automacao-relatorios.md`).

- **Domínio customizado configurado** — `astro.config.mjs` e `public/CNAME` apontando pra `www.caiosorriso.com.br`, DNS migrado pra Cloudflare, GitHub Pages com domínio custom.
  - *Motivo*: presença profissional com domínio próprio em vez de `tvmaia.github.io/caio-sorriso`.

---

## Perfis (Eixo E)

- **Bio Instagram, TikTok e descrição YouTube** — ver `01-checklist-perfis.md` pra texto atual aprovado.
  - *Motivo*: bios anteriores eram "currículo" (lista de cargos/programas/regiões), sem gancho de crescimento nem CTA. Reformuladas pra: (1) citar os programas reconhecíveis (Os Donos da Bola, American Zone) por credibilidade, (2) usar a Copa do Mundo 2026 como gancho de crescimento, (3) CTA direto pro link único. YouTube recebeu também palavras-chave de SEO (futebol, Copa do Mundo 2026, análises) e hashtags pra indexação/recomendação.

---

## Status — Fundação (Eixo E)

- **Site no ar** com domínio próprio `www.caiosorriso.com.br`.
- **Instagram e TikTok**: bio/perfil atualizados conforme `01-checklist-perfis.md`.
- **YouTube**: pendente — sem acesso de login no momento, retomar depois.

## Lower third / CTA na TV (Eixo F)

- Mensagem enviada ao grupo solicitando arte de lower third pra produção da Band/RedeTV, com alternativa de a própria equipe produzir se a Copa deixar a produção sem tempo.
  - *Motivo*: aproveitar o "canhão" de alcance da TV aberta pra direcionar audiência pro link único / redes sociais.

---

## Automação / Operação

*(a preencher conforme formos avançando — n8n, Metricool, Brand Template Opus Clip, etc.)*
