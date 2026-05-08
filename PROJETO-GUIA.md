# PROJETO CAIO SORRISO — Guia Estratégico

> Documento de referência para futuras conversas. Atualizado: Maio 2026.

---

## 1. QUEM É O CLIENTE

**Nome:** Caio Sorriso  
**Perfil:** Apresentador e analista esportivo de TV aberta brasileira  
**Arquétipo:** Comunicador popular, irreverente, carismático — "alguém que parece real"

**Emissoras atuais:**
- RedeTV! — American Zone (Domingos 18h-19h)
- Band — Os Donos da Bola
- SBT — Parcerias pontuais
- Copa do Mundo 2026 — Cobertura confirmada (EUA, México, Canadá)

**Redes sociais:**
- Instagram: https://www.instagram.com/caiosorrisooficial/
- YouTube: https://www.youtube.com/@caiosorrisooficial

---

## 2. OBJETIVO CENTRAL

Transformar Caio Sorriso em:
1. **Ativo de atenção** com valor de marca próprio
2. **Plataforma de monetização** via patrocínios, cursos, palestras e livro
3. **Autoridade digital** como analista esportivo

**Estratégia macro:** TV aberta puxa o digital → digital retroalimenta o offline

---

## 3. NÚMEROS DO MÍDIA KIT

### American Zone — RedeTV! (12 meses)
| Canal | Entrega |
|-------|---------|
| VHT Abertura 5" | 52 inserções |
| Comercial 30" | 104 inserções |
| Ação Integrada 90" | 52 inserções |
| Intervenção Tela 15" | 52 inserções |
| VHT Encerramento 5" | 52 inserções |
| Assinatura Chamadas 5" | 208 inserções |
| Comercial 30" Chamadas | 208 inserções |

### Digital (12 meses)
| Plataforma | Ativações |
|------------|-----------|
| YouTube | 260 |
| Instagram | 312 |
| Facebook | 312 |
| TikTok | 208 |
| **Total Digital** | **1.092** |

**Valor total de entrega de mídia:** R$ 114.486.450,00/ano

### Presença Nacional
- São Paulo: R$ 23,8M
- Rio de Janeiro: R$ 10,8M
- Belo Horizonte: R$ 6,5M
- + 40 praças em todo o Brasil

---

## 4. IDENTIDADE VISUAL (SUGESTÃO — manual da marca a criar)

### Paleta de cores proposta para a marca pessoal:
```
Primária: #0099FF (azul elétrico — energia, esportes, modernidade)
Secundária: #FFB400 (ouro — excelência, premium, calor humano)
Fundo: #050C18 (navy profundo — profissional, cinematográfico)
Acento: #00C896 (verde-água — fresco, digital, juventude)
Texto: #FFFFFF / #8899BB
```

### Tipografia sugerida:
- Display/Títulos: **Barlow Condensed** 700/800/900 (esportivo, impactante)
- Corpo: **Inter** 400/500/600/700 (limpo, legível)

### Tom de marca:
- NÃO é: corporativo, frio, overproduzido
- É: humano, direto, popular, energético, confiável

---

## 5. SITE — ESTRUTURA TÉCNICA

### Stack:
- **Framework:** Astro 4.x (static site)
- **CSS:** Tailwind CSS 3.x
- **Deploy:** GitHub Pages (preview) → Cloudflare Pages (produção)
- **Domínio alvo:** caiosorriso.com.br

### Localização:
```
C:\Users\USER\Documents\MAIA\CODING\caio-sorriso\
```

### Rodar localmente:
```bash
cd "C:\Users\USER\Documents\MAIA\CODING\caio-sorriso"
npm run dev
# Acesse: http://localhost:4321
```

### Build para produção:
```bash
npm run build
# Saída: /dist/
```

### Deploy GitHub Pages:
```bash
git init
git add .
git commit -m "feat: site Caio Sorriso v1"
git branch -M main
git remote add origin https://github.com/SEU_USER/caio-sorriso.git
git push -u origin main
# Ative GitHub Pages em Settings > Pages > Branch: main, /dist
```

---

## 6. SEÇÕES DO SITE

| Seção | ID | Arquivo |
|-------|-----|---------|
| Hero (full-screen) | `#inicio` | `Hero.astro` |
| Ticker ao vivo (ESPN) | — | `Ticker.astro` |
| Sobre / Bio | `#sobre` | `About.astro` |
| Programas | `#programas` | `Programs.astro` |
| Números / Stats | `#numeros` | `Stats.astro` |
| Alcance Nacional | — | `NationalReach.astro` |
| Mídia Kit (tabs) | `#midia-kit` | `MediaKit.astro` |
| Redes Sociais | `#social` | `SocialMedia.astro` |
| YouTube | `#youtube` | `YouTube.astro` |
| Patrocínio | `#anuncie` | `Sponsorship.astro` |
| Produtos | `#produtos` | `Products.astro` |
| Contato Comercial | `#contato` | `Contact.astro` |
| Footer | — | `Footer.astro` |

---

## 7. IMAGENS NECESSÁRIAS

### Obrigatórias (o site funciona sem elas mas fica melhor com):

| Arquivo | Caminho | Tamanho | Descrição |
|---------|---------|---------|-----------|
| `hero-caio.png` | `public/images/` | 800×1100px | Caio em pé, fundo transparente (PNG), pose dinâmica, traje profissional. Será posicionado à direita do hero. |
| `caio-bio.jpg` | `public/images/` | 600×800px | Foto profissional, estúdio ou evento, enquadramento 3/4. |
| `og-image.jpg` | `public/images/` | 1200×630px | Imagem para redes sociais / link preview. Fundo escuro, nome em destaque. |

### Para programas:

| Arquivo | Caminho | Tamanho | Descrição |
|---------|---------|---------|-----------|
| `program-american-zone.jpg` | `public/images/` | 800×350px | Arte/thumbnail American Zone RedeTV! |
| `program-donos-da-bola.jpg` | `public/images/` | 800×350px | Arte/thumbnail Os Donos da Bola Band |
| `program-copa.jpg` | `public/images/` | 800×350px | Arte Copa do Mundo 2026 |

### Para Instagram feed:

| Arquivo | Caminho | Tamanho | Descrição |
|---------|---------|---------|-----------|
| `instagram-1.jpg` até `instagram-6.jpg` | `public/images/` | 400×400px cada | Screenshots dos últimos posts do Instagram |

### Patrocinadores:

| Arquivo | Caminho | Tamanho | Descrição |
|---------|---------|---------|-----------|
| `sponsor-bete.png` | `public/images/` | 200×80px | Logo Bete Esporte (fundo transparente) |

---

## 8. PRODUTOS FUTUROS NO SITE

| Produto | Status | Ação necessária |
|---------|--------|-----------------|
| Cursos do Caio Sorriso | Em breve | Integrar plataforma (ex: Hotmart, Kiwify) ou construir no site |
| Palestras | Disponível | Conectar formulário a CRM/email |
| Livro | Em breve | Integrar pré-venda quando disponível |

---

## 9. PRÓXIMOS PASSOS — ROADMAP DIGITAL

### Fase 1 — Concluída ✅
- [x] Site institucional / media kit digital

### Fase 2 — Próximo
- [ ] Subir no GitHub + Cloudflare
- [ ] Conectar domínio caiosorriso.com.br
- [ ] Configurar formulário de contato (Formspree ou EmailJS)
- [ ] Manual da marca (logo, tipografia, cores)
- [ ] Criar pasta de imagens e fotografar Caio

### Fase 3 — Médio prazo
- [ ] Automação de redes sociais (n8n ou similar)
- [ ] Integração Instagram feed real (Behold.so ou API)
- [ ] Plataforma de cursos integrada
- [ ] Agente de geração de conteúdo automático

### Fase 4 — Longo prazo
- [ ] Agente de e-mail marketing
- [ ] Sistema de CRM para leads de patrocínio
- [ ] Dashboard de métricas unificado (TV + digital)

---

## 10. PATROCINADORA ATUAL

**Bete Esporte** — https://betesporte.bet.br/sports/desktop  
Patrocinadora oficial. Manter branding em evidência no site.

---

## 11. CONCORRENTES / REFERÊNCIAS

- https://ge.globo.com/ (referência de qualidade digital)
- https://www.band.com.br/esportes (parceiro)

---

## 12. CONTATOS DA PLATAFORMA ANTIGA (MIGRAR)

- Agência antiga: https://www.hdplanmkt.com.br/ (encerrando)
- Plataforma de cursos antiga: https://www.plenusup.com.br/ (encerrando)
- Ambas migrando para o novo site

---

*Guia mantido por MAIA — Atualizar sempre que houver mudanças estratégicas relevantes.*
