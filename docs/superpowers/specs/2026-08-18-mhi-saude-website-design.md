# MHI Saúde — Site Institucional (Design)

## Objetivo
Site institucional single-page para o centro de fisioterapia MHI Saúde, usando o scaffold Vite + React já existente em `frontend/`. Sem backend — conteúdo estático, hospedável em qualquer CDN.

## Identidade visual
- Paleta extraída da logo (`frontend/src/assets/logo.png`): verde escuro/médio em gradiente + branco.
- Tipografia sans-serif limpa, estilo saúde/wellness.
- Ícones em SVG (sem fotos reais disponíveis por enquanto).

## Dados reais de contato
- WhatsApp: `(71) 99648-8616` → link `https://wa.me/5571996488616`
- Instagram: `@mhifisio`
- Endereço: Edf. Ilha de Pharos - Av. Gen. Severino Filho, 966 - Loja 01 - Itapuã, Salvador - BA, 41600-090

## Estrutura da página (ordem)
1. **Header fixo** — logo, nav (Sobre, Serviços, Diferenciais, Contato), CTA "Agendar" (WhatsApp)
2. **Hero** — headline, subtítulo, CTA WhatsApp, visual em paleta verde/branco (sem foto)
3. **Sobre** — texto institucional curto
4. **Serviços** — grid de cards com ícones (conteúdo genérico de fisioterapia: ortopédica, esportiva, RPG, pilates clínico, etc. — placeholder editável)
5. **Diferenciais** — 3-4 destaques
6. **Contato/Localização** — endereço, telefone, Instagram, Google Maps embed com o endereço real
7. **Footer** — logo, links rápidos, redes sociais, copyright
8. **Botão flutuante do WhatsApp** — fixo, visível em todas as seções, linkando para o wa.me

## Componentes React
`Header`, `Hero`, `About`, `Services`, `Differentials`, `Contact`, `Footer`, `WhatsAppButton` — cada um em seu próprio arquivo dentro de `frontend/src/components/`.

## Arquivos afetados
- `frontend/src/App.jsx` — recomposto com os novos componentes, remove conteúdo padrão do Vite
- `frontend/src/App.css` — substituído por estilos dos novos componentes
- `frontend/src/index.css` — variáveis de cor atualizadas (verde/branco)
- `frontend/index.html` — título e favicon atualizados para MHI Saúde
- `frontend/src/assets/` — remove `react.svg`, `vite.svg`, `hero.png` (placeholders do template, não usados)

## Fora de escopo
- Formulário de contato (não solicitado — contato via WhatsApp/telefone/Instagram)
- Fotos reais (usar ícones/ilustrações até o cliente fornecer fotos)
- Múltiplas páginas (site é single-page com âncoras)
