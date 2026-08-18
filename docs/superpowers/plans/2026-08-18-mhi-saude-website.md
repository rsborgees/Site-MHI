# MHI Saúde Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the MHI Saúde single-page institutional website (green/white theme, real contact data) on top of the existing Vite + React scaffold in `frontend/`.

**Architecture:** Static, no-backend React SPA. One page composed of independent, self-contained section components (`Header`, `Hero`, `About`, `Services`, `Differentials`, `Contact`, `Footer`, `WhatsAppButton`), each with its own JSX + CSS file, driven by shared data constants (`contact.js`, `services.js`, `differentials.js`). A small `Icon` component renders inline SVGs so no icon library dependency is needed.

**Tech Stack:** React 19, Vite 8 (existing scaffold), Vitest + jsdom + @testing-library/react + @testing-library/jest-dom for component tests. No new runtime dependencies.

**Spec:** `docs/superpowers/specs/2026-08-18-mhi-saude-website-design.md`

## Global Constraints

- No backend, no contact form — contact happens via WhatsApp (`https://wa.me/5571996488616`), phone (`tel:+5571996488616`), and Instagram (`https://www.instagram.com/mhifisio`).
- Real address: `Edf. Ilha de Pharos - Av. Gen. Severino Filho, 966 - Loja 01 - Itapuã, Salvador - BA, 41600-090`.
- No new runtime dependencies beyond `react`/`react-dom` already in `package.json`. Icons are hand-authored inline SVG via a shared `Icon` component — do not add an icon library.
- Site is single-page with anchor navigation (`#sobre`, `#servicos`, `#diferenciais`, `#contato`).
- Color palette is green/white, sampled from `frontend/src/assets/logo.png` (dark green ~`#0a5c3a`–`#0f7a49` family). Exact tokens are defined in Task 1 and must be reused via CSS variables, never hard-coded hex values in component CSS.
- This project has no git history yet. Task 1 initializes git and every subsequent task ends with a commit.
- Every component task follows TDD: failing test → implementation → passing test.

---

### Task 1: Git init, global theme, shared constants, test infrastructure

**Files:**
- Create: `frontend/src/test/setup.js`
- Create: `frontend/src/constants/contact.js`
- Create: `frontend/src/constants/contact.test.js`
- Create: `frontend/src/constants/services.js`
- Create: `frontend/src/constants/services.test.js`
- Create: `frontend/src/constants/differentials.js`
- Create: `frontend/src/constants/differentials.test.js`
- Modify: `frontend/vite.config.js`
- Modify: `frontend/package.json`
- Modify: `frontend/src/index.css`

**Interfaces:**
- Produces: `CONTACT` object `{ whatsappNumber, whatsappDisplay, phoneHref, instagramHandle, instagramUrl, address }`, `WHATSAPP_URL` string, `MAPS_EMBED_URL` string — all from `frontend/src/constants/contact.js`.
- Produces: `SERVICES` array of `{ id, icon, title, description }` from `frontend/src/constants/services.js`.
- Produces: `DIFFERENTIALS` array of `{ id, icon, title, description }` from `frontend/src/constants/differentials.js`.
- Produces: global CSS variables on `:root` (`--color-green-900`, `--color-green-700`, `--color-green-600`, `--color-green-500`, `--color-green-100`, `--color-bg`, `--color-bg-alt`, `--color-text`, `--color-text-muted`, `--color-white`, `--color-border`, `--shadow-sm`, `--shadow-md`, `--radius-md`, `--radius-lg`, `--font-sans`, `--header-height`, `--container-width`) and utility classes (`.container`, `.section`, `.section-alt`, `.section-header`, `.eyebrow`, `.btn`, `.btn-primary`, `.btn-outline`) in `frontend/src/index.css`, consumed by every later component's CSS.

- [ ] **Step 1: Initialize git**

```bash
cd "/Users/ds/Desktop/Projetos DS/MHI Fisio" && git init && git add -A && git commit -m "chore: initial commit of Vite scaffold"
```

- [ ] **Step 2: Install test dependencies**

```bash
cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 3: Add test config and script**

Modify `frontend/vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
```

Create `frontend/src/test/setup.js`:

```js
import '@testing-library/jest-dom'
```

Modify `frontend/package.json` scripts block to add a `test` script:

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "test": "vitest run",
    "preview": "vite preview"
  },
```

- [ ] **Step 4: Write the failing tests for the contact constants**

Create `frontend/src/constants/contact.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { CONTACT, WHATSAPP_URL, MAPS_EMBED_URL } from './contact'

describe('contact constants', () => {
  it('exposes the real phone/whatsapp number', () => {
    expect(CONTACT.whatsappNumber).toBe('5571996488616')
    expect(CONTACT.phoneHref).toBe('tel:+5571996488616')
  })

  it('builds the WhatsApp URL from the phone number', () => {
    expect(WHATSAPP_URL).toBe('https://wa.me/5571996488616')
  })

  it('builds a Google Maps embed URL containing the encoded address', () => {
    expect(MAPS_EMBED_URL.startsWith('https://www.google.com/maps?q=')).toBe(true)
    expect(MAPS_EMBED_URL).toContain(encodeURIComponent(CONTACT.address))
  })
})
```

- [ ] **Step 5: Run tests to verify they fail**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- contact.test.js`
Expected: FAIL with "Cannot find module './contact'" (or similar)

- [ ] **Step 6: Implement the contact constants**

Create `frontend/src/constants/contact.js`:

```js
export const CONTACT = {
  whatsappNumber: '5571996488616',
  whatsappDisplay: '(71) 99648-8616',
  phoneHref: 'tel:+5571996488616',
  instagramHandle: '@mhifisio',
  instagramUrl: 'https://www.instagram.com/mhifisio',
  address:
    'Edf. Ilha de Pharos - Av. Gen. Severino Filho, 966 - Loja 01 - Itapuã, Salvador - BA, 41600-090',
}

export const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsappNumber}`

export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  CONTACT.address,
)}&output=embed`
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- contact.test.js`
Expected: PASS (3 tests)

- [ ] **Step 8: Write the failing tests for services/differentials data**

Create `frontend/src/constants/services.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { SERVICES } from './services'

describe('SERVICES', () => {
  it('has at least 4 services, each with id/icon/title/description', () => {
    expect(SERVICES.length).toBeGreaterThanOrEqual(4)
    SERVICES.forEach((service) => {
      expect(typeof service.id).toBe('string')
      expect(service.id.length).toBeGreaterThan(0)
      expect(typeof service.icon).toBe('string')
      expect(typeof service.title).toBe('string')
      expect(typeof service.description).toBe('string')
    })
  })

  it('has unique ids', () => {
    const ids = SERVICES.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
```

Create `frontend/src/constants/differentials.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { DIFFERENTIALS } from './differentials'

describe('DIFFERENTIALS', () => {
  it('has at least 3 items, each with id/icon/title/description', () => {
    expect(DIFFERENTIALS.length).toBeGreaterThanOrEqual(3)
    DIFFERENTIALS.forEach((item) => {
      expect(typeof item.id).toBe('string')
      expect(item.id.length).toBeGreaterThan(0)
      expect(typeof item.icon).toBe('string')
      expect(typeof item.title).toBe('string')
      expect(typeof item.description).toBe('string')
    })
  })

  it('has unique ids', () => {
    const ids = DIFFERENTIALS.map((d) => d.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
```

- [ ] **Step 9: Run tests to verify they fail**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- services.test.js differentials.test.js`
Expected: FAIL (modules not found)

- [ ] **Step 10: Implement services and differentials data**

Create `frontend/src/constants/services.js`:

```js
export const SERVICES = [
  {
    id: 'ortopedica',
    icon: 'medical',
    title: 'Fisioterapia Ortopédica',
    description:
      'Tratamento de lesões musculoesqueléticas, pós-operatórios e dores articulares com técnicas manuais e reabilitação funcional.',
  },
  {
    id: 'esportiva',
    icon: 'pulse',
    title: 'Fisioterapia Esportiva',
    description:
      'Prevenção e recuperação de lesões esportivas, com foco no retorno seguro e completo à atividade física.',
  },
  {
    id: 'rpg',
    icon: 'spine',
    title: 'RPG - Reeducação Postural Global',
    description:
      'Correção postural e alívio de dores crônicas por meio de alongamentos globais individualizados.',
  },
  {
    id: 'pilates',
    icon: 'balance',
    title: 'Pilates Clínico',
    description:
      'Fortalecimento, equilíbrio e consciência corporal com exercícios adaptados a cada paciente.',
  },
  {
    id: 'neurologica',
    icon: 'target',
    title: 'Fisioterapia Neurológica',
    description:
      'Reabilitação funcional para pacientes com sequelas neurológicas, estimulando autonomia e qualidade de vida.',
  },
  {
    id: 'respiratoria',
    icon: 'shield',
    title: 'Fisioterapia Respiratória',
    description:
      'Técnicas para melhora da capacidade respiratória e prevenção de complicações pulmonares.',
  },
]
```

Create `frontend/src/constants/differentials.js`:

```js
export const DIFFERENTIALS = [
  {
    id: 'personalizado',
    icon: 'users',
    title: 'Atendimento Personalizado',
    description:
      'Avaliação individual e plano de tratamento feito sob medida para cada paciente.',
  },
  {
    id: 'qualificados',
    icon: 'shield',
    title: 'Profissionais Qualificados',
    description:
      'Equipe de fisioterapeutas experientes e em constante atualização técnica.',
  },
  {
    id: 'estrutura',
    icon: 'layers',
    title: 'Estrutura Completa',
    description:
      'Equipamentos modernos para reabilitação, fortalecimento e exercícios terapêuticos.',
  },
  {
    id: 'horarios',
    icon: 'clock',
    title: 'Horários Flexíveis',
    description:
      'Agendamento facilitado, com horários que se adaptam à sua rotina.',
  },
]
```

- [ ] **Step 11: Run tests to verify they pass**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test`
Expected: PASS (all tests so far)

- [ ] **Step 12: Replace the global theme**

Replace the full contents of `frontend/src/index.css` with:

```css
:root {
  --color-bg: #ffffff;
  --color-bg-alt: #f2faf5;
  --color-green-900: #06301f;
  --color-green-700: #0a5c3a;
  --color-green-600: #0f7a49;
  --color-green-500: #189a5c;
  --color-green-100: #e3f5ea;
  --color-text: #1c2b24;
  --color-text-muted: #55706a;
  --color-white: #ffffff;
  --color-border: #d9ece1;
  --shadow-sm: 0 2px 8px rgba(6, 48, 31, 0.08);
  --shadow-md: 0 12px 32px rgba(6, 48, 31, 0.14);
  --radius-md: 14px;
  --radius-lg: 24px;
  --font-sans: 'Poppins', system-ui, 'Segoe UI', Roboto, sans-serif;
  --header-height: 76px;
  --container-width: 1160px;

  font: 16px/1.6 var(--font-sans);
  color: var(--color-text);
  background: var(--color-bg);
  color-scheme: light;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
}

main {
  display: block;
  padding-top: var(--header-height);
}

section[id] {
  scroll-margin-top: var(--header-height);
}

h1,
h2,
h3 {
  font-family: var(--font-sans);
  font-weight: 600;
  color: var(--color-green-900);
  margin: 0;
}

h1 {
  font-size: 44px;
  line-height: 1.15;
  letter-spacing: -0.5px;
}
h2 {
  font-size: 32px;
  line-height: 1.2;
  letter-spacing: -0.3px;
}
h3 {
  font-size: 20px;
  line-height: 1.3;
}

p {
  margin: 0;
}

a {
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}

.container {
  width: var(--container-width);
  max-width: 100%;
  margin: 0 auto;
  padding: 0 24px;
}

.section {
  padding: 96px 0;
}

.section-alt {
  background: var(--color-bg-alt);
}

.section-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 56px;
}

.eyebrow {
  display: inline-block;
  color: var(--color-green-600);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.section-header p {
  color: var(--color-text-muted);
  margin-top: 12px;
  font-size: 17px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background: var(--color-green-600);
  color: var(--color-white);
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  box-shadow: var(--shadow-md);
}

.btn-outline {
  background: transparent;
  border-color: var(--color-green-600);
  color: var(--color-green-600);
}

@media (max-width: 768px) {
  h1 {
    font-size: 32px;
  }
  h2 {
    font-size: 26px;
  }
  .section {
    padding: 64px 0;
  }
}
```

- [ ] **Step 13: Verify tests still pass and commit**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test`
Expected: PASS

```bash
cd "/Users/ds/Desktop/Projetos DS/MHI Fisio" && git add -A && git commit -m "feat: add test infra, shared data constants and global theme"
```

---

### Task 2: Shared `Icon` component

**Files:**
- Create: `frontend/src/components/Icon.jsx`
- Create: `frontend/src/components/Icon.test.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `Icon` default export, props `{ name: string, size?: number, className?: string }`. Supported `name` values: `medical`, `pulse`, `spine`, `balance`, `target`, `shield`, `users`, `clock`, `layers`, `pin`, `phone`, `instagram`, `chat`, `menu`, `close`. Renders `null` for an unknown name. Renders an `<svg>` with `role="presentation"` otherwise.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/Icon.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Icon from './Icon'

describe('Icon', () => {
  it('renders an svg for a known icon name', () => {
    const { container } = render(<Icon name="medical" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('applies the requested size', () => {
    const { container } = render(<Icon name="chat" size={40} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '40')
    expect(svg).toHaveAttribute('height', '40')
  })

  it('renders nothing for an unknown icon name', () => {
    const { container } = render(<Icon name="does-not-exist" />)
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- Icon.test.jsx`
Expected: FAIL ("Cannot find module './Icon'")

- [ ] **Step 3: Implement the Icon component**

Create `frontend/src/components/Icon.jsx`:

```jsx
const PATHS = {
  medical: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </>
  ),
  pulse: <polyline points="2,12 7,12 9,6 13,18 15,12 22,12" />,
  spine: (
    <>
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="8" y1="5" x2="16" y2="5" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </>
  ),
  balance: (
    <>
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="4" y1="8" x2="20" y2="8" />
      <circle cx="4" cy="8" r="2.2" />
      <circle cx="20" cy="8" r="2.2" />
      <line x1="8" y1="20" x2="16" y2="20" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 L20 6.5 V12 C20 17 16.5 20.5 12 22 C7.5 20.5 4 17 4 12 V6.5 Z" />
      <polyline points="8.5,12 11,14.5 15.5,9.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="9" r="3.2" />
      <circle cx="16" cy="10" r="2.6" />
      <path d="M3.5 20c0-4 2.7-6.3 6-6.3s6 2.1 6.6 5.3" />
      <path d="M14.8 14.2c2.9.2 5.7 2 5.7 5.8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12,7 12,12 16,14" />
    </>
  ),
  layers: (
    <>
      <polygon points="12,3 21,8 12,13 3,8" />
      <polyline points="3,13 12,18 21,13" />
      <polyline points="3,17.5 12,22 21,17.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  phone: (
    <path d="M6 3h3l1.5 4.5-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2L21 15v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  chat: (
    <>
      <path d="M4 12a8 8 0 1 1 3.3 6.4L4 20l1.4-3.6A7.96 7.96 0 0 1 4 12z" />
      <line x1="8.5" y1="11" x2="15.5" y2="11" />
      <line x1="8.5" y1="14" x2="13.5" y2="14" />
    </>
  ),
  menu: (
    <>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
  close: (
    <>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </>
  ),
}

function Icon({ name, size = 24, className = '' }) {
  const path = PATHS[name]
  if (!path) return null

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="presentation"
      aria-hidden="true"
    >
      {path}
    </svg>
  )
}

export default Icon
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- Icon.test.jsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
cd "/Users/ds/Desktop/Projetos DS/MHI Fisio" && git add -A && git commit -m "feat: add shared inline-SVG Icon component"
```

---

### Task 3: `WhatsAppButton` component

**Files:**
- Create: `frontend/src/components/WhatsAppButton.jsx`
- Create: `frontend/src/components/WhatsAppButton.css`
- Create: `frontend/src/components/WhatsAppButton.test.jsx`

**Interfaces:**
- Consumes: `Icon` from `./Icon` (Task 2), `WHATSAPP_URL` from `../constants/contact` (Task 1).
- Produces: `WhatsAppButton` default export, no props. Renders a fixed-position floating link.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/WhatsAppButton.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import WhatsAppButton from './WhatsAppButton'
import { WHATSAPP_URL } from '../constants/contact'

describe('WhatsAppButton', () => {
  it('links to the WhatsApp URL and opens in a new tab safely', () => {
    render(<WhatsAppButton />)
    const link = screen.getByRole('link', { name: /fale conosco no whatsapp/i })
    expect(link).toHaveAttribute('href', WHATSAPP_URL)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
    expect(link.getAttribute('rel')).toContain('noreferrer')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- WhatsAppButton.test.jsx`
Expected: FAIL ("Cannot find module './WhatsAppButton'")

- [ ] **Step 3: Implement the component**

Create `frontend/src/components/WhatsAppButton.jsx`:

```jsx
import Icon from './Icon'
import { WHATSAPP_URL } from '../constants/contact'
import './WhatsAppButton.css'

function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Fale conosco no WhatsApp"
    >
      <Icon name="chat" size={28} />
    </a>
  )
}

export default WhatsAppButton
```

Create `frontend/src/components/WhatsAppButton.css`:

```css
.whatsapp-float {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--color-green-600);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  z-index: 100;
  transition: transform 0.2s ease, background 0.2s ease;
}

.whatsapp-float:hover {
  background: var(--color-green-700);
  transform: scale(1.06);
}

@media (max-width: 768px) {
  .whatsapp-float {
    right: 16px;
    bottom: 16px;
    width: 52px;
    height: 52px;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- WhatsAppButton.test.jsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd "/Users/ds/Desktop/Projetos DS/MHI Fisio" && git add -A && git commit -m "feat: add floating WhatsApp button"
```

---

### Task 4: `Header` component

**Files:**
- Create: `frontend/src/components/Header.jsx`
- Create: `frontend/src/components/Header.css`
- Create: `frontend/src/components/Header.test.jsx`

**Interfaces:**
- Consumes: `Icon` (Task 2), `WHATSAPP_URL` from `../constants/contact` (Task 1), `logo` image from `../assets/logo.png`.
- Produces: `Header` default export, no props. Fixed nav bar with anchors `#sobre`, `#servicos`, `#diferenciais`, `#contato` and a mobile toggle button.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/Header.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'
import { WHATSAPP_URL } from '../constants/contact'

describe('Header', () => {
  it('renders the logo and all nav links', () => {
    render(<Header />)
    expect(screen.getByAltText(/mhi saúde/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Sobre' })).toHaveAttribute('href', '#sobre')
    expect(screen.getByRole('link', { name: 'Serviços' })).toHaveAttribute('href', '#servicos')
    expect(screen.getByRole('link', { name: 'Diferenciais' })).toHaveAttribute(
      'href',
      '#diferenciais',
    )
    expect(screen.getByRole('link', { name: 'Contato' })).toHaveAttribute('href', '#contato')
  })

  it('renders a booking CTA that opens WhatsApp', () => {
    render(<Header />)
    const cta = screen.getByRole('link', { name: 'Agendar' })
    expect(cta).toHaveAttribute('href', WHATSAPP_URL)
    expect(cta).toHaveAttribute('target', '_blank')
  })

  it('toggles the mobile menu open state when the toggle button is clicked', () => {
    render(<Header />)
    const toggle = screen.getByRole('button', { name: /abrir menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggle)

    expect(screen.getByRole('button', { name: /fechar menu/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- Header.test.jsx`
Expected: FAIL ("Cannot find module './Header'")

- [ ] **Step 3: Implement the component**

Create `frontend/src/components/Header.jsx`:

```jsx
import { useState } from 'react'
import logo from '../assets/logo.png'
import Icon from './Icon'
import { WHATSAPP_URL } from '../constants/contact'
import './Header.css'

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#contato', label: 'Contato' },
]

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="header__brand">
          <img src={logo} alt="MHI Saúde - Centro de Fisioterapia" />
        </a>

        <nav className={`header__nav ${open ? 'is-open' : ''}`}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary header__cta"
          >
            Agendar
          </a>
        </nav>

        <button
          type="button"
          className="header__toggle"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          <Icon name={open ? 'close' : 'menu'} size={26} />
        </button>
      </div>
    </header>
  )
}

export default Header
```

Create `frontend/src/components/Header.css`:

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-white);
  box-shadow: var(--shadow-sm);
  z-index: 50;
  height: var(--header-height);
  display: flex;
  align-items: center;
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.header__brand img {
  height: 44px;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.header__nav ul {
  list-style: none;
  display: flex;
  gap: 28px;
  margin: 0;
  padding: 0;
}

.header__nav a {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
}

.header__nav a:hover {
  color: var(--color-green-600);
}

.header__cta {
  padding: 10px 22px;
  font-size: 15px;
}

.header__toggle {
  display: none;
  background: none;
  border: none;
  color: var(--color-green-700);
  cursor: pointer;
  padding: 4px;
}

@media (max-width: 900px) {
  .header__toggle {
    display: flex;
  }

  .header__nav {
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    background: var(--color-white);
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 24px;
    box-shadow: var(--shadow-md);
    transform: translateY(-140%);
    transition: transform 0.25s ease;
  }

  .header__nav.is-open {
    transform: translateY(0);
  }

  .header__nav ul {
    flex-direction: column;
    gap: 16px;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- Header.test.jsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
cd "/Users/ds/Desktop/Projetos DS/MHI Fisio" && git add -A && git commit -m "feat: add site header with nav and mobile menu"
```

---

### Task 5: `Hero` component

**Files:**
- Create: `frontend/src/components/Hero.jsx`
- Create: `frontend/src/components/Hero.css`
- Create: `frontend/src/components/Hero.test.jsx`

**Interfaces:**
- Consumes: `Icon` (Task 2), `WHATSAPP_URL` from `../constants/contact` (Task 1), `logo` from `../assets/logo.png`.
- Produces: `Hero` default export, no props. Renders `<section id="top">` with an `<h1>`, a primary WhatsApp CTA and a secondary anchor CTA to `#servicos`.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/Hero.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'
import { WHATSAPP_URL } from '../constants/contact'

describe('Hero', () => {
  it('renders the main headline', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', { level: 1, name: /cuidando do seu movimento/i }),
    ).toBeInTheDocument()
  })

  it('renders a primary CTA to WhatsApp and a secondary CTA to the services section', () => {
    render(<Hero />)
    const primary = screen.getByRole('link', { name: /agende sua avaliação/i })
    expect(primary).toHaveAttribute('href', WHATSAPP_URL)

    const secondary = screen.getByRole('link', { name: /conheça os serviços/i })
    expect(secondary).toHaveAttribute('href', '#servicos')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- Hero.test.jsx`
Expected: FAIL ("Cannot find module './Hero'")

- [ ] **Step 3: Implement the component**

Create `frontend/src/components/Hero.jsx`:

```jsx
import logo from '../assets/logo.png'
import Icon from './Icon'
import { WHATSAPP_URL } from '../constants/contact'
import './Hero.css'

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="eyebrow">Centro de Fisioterapia</span>
          <h1>Cuidando do seu movimento, cuidando de você</h1>
          <p className="hero__lead">
            Na MHI Saúde você encontra atendimento humanizado, avaliação individualizada e
            tratamentos baseados em evidências para recuperar sua mobilidade e qualidade de
            vida.
          </p>
          <div className="hero__actions">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <Icon name="chat" size={20} />
              Agende sua avaliação
            </a>
            <a href="#servicos" className="btn btn-outline">
              Conheça os serviços
            </a>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__blob" aria-hidden="true"></div>
          <img src={logo} alt="MHI Saúde" className="hero__logo" />
        </div>
      </div>
    </section>
  )
}

export default Hero
```

Create `frontend/src/components/Hero.css`:

```css
.hero {
  padding: calc(var(--header-height) + 56px) 0 80px;
  overflow: hidden;
}

.hero__inner {
  display: flex;
  align-items: center;
  gap: 48px;
}

.hero__content {
  flex: 1 1 480px;
}

.hero__lead {
  margin-top: 20px;
  font-size: 18px;
  color: var(--color-text-muted);
  max-width: 520px;
}

.hero__actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;
  flex-wrap: wrap;
}

.hero__visual {
  position: relative;
  flex: 1 1 360px;
  display: flex;
  justify-content: center;
}

.hero__blob {
  position: absolute;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, var(--color-green-100), var(--color-green-500) 120%);
  opacity: 0.35;
  filter: blur(10px);
}

.hero__logo {
  position: relative;
  width: 320px;
  max-width: 100%;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-md);
}

@media (max-width: 900px) {
  .hero__inner {
    flex-direction: column;
    text-align: center;
  }

  .hero__actions {
    justify-content: center;
  }

  .hero__lead {
    margin-inline: auto;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- Hero.test.jsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd "/Users/ds/Desktop/Projetos DS/MHI Fisio" && git add -A && git commit -m "feat: add hero section"
```

---

### Task 6: `About` component

**Files:**
- Create: `frontend/src/components/About.jsx`
- Create: `frontend/src/components/About.css`
- Create: `frontend/src/components/About.test.jsx`

**Interfaces:**
- Consumes: nothing external.
- Produces: `About` default export, no props. Renders `<section id="sobre">` with an `<h2>`, an institutional paragraph, and a 3-item highlight list.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/About.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import About from './About'

describe('About', () => {
  it('renders the section heading and institutional text', () => {
    render(<About />)
    expect(
      screen.getByRole('heading', { level: 2, name: /quem cuida do seu movimento/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/atendimento humanizado/i)).toBeInTheDocument()
  })

  it('renders three highlight items', () => {
    render(<About />)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- About.test.jsx`
Expected: FAIL ("Cannot find module './About'")

- [ ] **Step 3: Implement the component**

Create `frontend/src/components/About.jsx`:

```jsx
import './About.css'

const HIGHLIGHTS = [
  'Avaliação individual e criteriosa',
  'Tratamentos baseados em evidências',
  'Atendimento humanizado do início ao fim',
]

function About() {
  return (
    <section id="sobre" className="section about">
      <div className="container about__inner">
        <div className="about__text">
          <span className="eyebrow">Sobre nós</span>
          <h2>Quem cuida do seu movimento é a MHI Saúde</h2>
          <p>
            A MHI Saúde é um centro de fisioterapia dedicado a cuidar da sua saúde e qualidade
            de vida. Unimos avaliação criteriosa, tratamentos baseados em evidências e
            atendimento humanizado para ajudar cada paciente a recuperar o movimento e retomar
            sua rotina com confiança.
          </p>
        </div>
        <ul className="about__highlights">
          {HIGHLIGHTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default About
```

Create `frontend/src/components/About.css`:

```css
.about__inner {
  display: flex;
  gap: 56px;
  align-items: flex-start;
}

.about__text {
  flex: 1 1 55%;
}

.about__text p {
  margin-top: 16px;
  color: var(--color-text-muted);
  font-size: 17px;
}

.about__highlights {
  flex: 1 1 40%;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.about__highlights li {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 18px 22px;
  font-weight: 500;
  color: var(--color-green-900);
  box-shadow: var(--shadow-sm);
}

@media (max-width: 900px) {
  .about__inner {
    flex-direction: column;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- About.test.jsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd "/Users/ds/Desktop/Projetos DS/MHI Fisio" && git add -A && git commit -m "feat: add about section"
```

---

### Task 7: `Services` component

**Files:**
- Create: `frontend/src/components/Services.jsx`
- Create: `frontend/src/components/Services.css`
- Create: `frontend/src/components/Services.test.jsx`

**Interfaces:**
- Consumes: `Icon` (Task 2), `SERVICES` from `../constants/services` (Task 1).
- Produces: `Services` default export, no props. Renders `<section id="servicos">` with one `<article>` card per entry in `SERVICES`.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/Services.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Services from './Services'
import { SERVICES } from '../constants/services'

describe('Services', () => {
  it('renders one card per service with its title and description', () => {
    render(<Services />)
    expect(screen.getAllByRole('article')).toHaveLength(SERVICES.length)
    SERVICES.forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument()
      expect(screen.getByText(service.description)).toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- Services.test.jsx`
Expected: FAIL ("Cannot find module './Services'")

- [ ] **Step 3: Implement the component**

Create `frontend/src/components/Services.jsx`:

```jsx
import Icon from './Icon'
import { SERVICES } from '../constants/services'
import './Services.css'

function Services() {
  return (
    <section id="servicos" className="section section-alt services">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">O que fazemos</span>
          <h2>Nossos serviços</h2>
          <p>Tratamentos completos para cada fase da sua recuperação.</p>
        </div>
        <div className="services__grid">
          {SERVICES.map((service) => (
            <article key={service.id} className="service-card">
              <div className="service-card__icon">
                <Icon name={service.icon} size={28} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
```

Create `frontend/src/components/Services.css`:

```css
.services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.service-card {
  background: var(--color-white);
  border-radius: var(--radius-md);
  padding: 32px 28px;
  box-shadow: var(--shadow-sm);
  text-align: left;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.service-card__icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-green-100);
  color: var(--color-green-600);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.service-card h3 {
  margin-bottom: 10px;
}

.service-card p {
  color: var(--color-text-muted);
  font-size: 15px;
}

@media (max-width: 900px) {
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .services__grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- Services.test.jsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd "/Users/ds/Desktop/Projetos DS/MHI Fisio" && git add -A && git commit -m "feat: add services section"
```

---

### Task 8: `Differentials` component

**Files:**
- Create: `frontend/src/components/Differentials.jsx`
- Create: `frontend/src/components/Differentials.css`
- Create: `frontend/src/components/Differentials.test.jsx`

**Interfaces:**
- Consumes: `Icon` (Task 2), `DIFFERENTIALS` from `../constants/differentials` (Task 1).
- Produces: `Differentials` default export, no props. Renders `<section id="diferenciais">` with one card per entry in `DIFFERENTIALS`.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/Differentials.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Differentials from './Differentials'
import { DIFFERENTIALS } from '../constants/differentials'

describe('Differentials', () => {
  it('renders the section heading and one card per differential', () => {
    render(<Differentials />)
    expect(
      screen.getByRole('heading', { level: 2, name: /nossos diferenciais/i }),
    ).toBeInTheDocument()
    DIFFERENTIALS.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
      expect(screen.getByText(item.description)).toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- Differentials.test.jsx`
Expected: FAIL ("Cannot find module './Differentials'")

- [ ] **Step 3: Implement the component**

Create `frontend/src/components/Differentials.jsx`:

```jsx
import Icon from './Icon'
import { DIFFERENTIALS } from '../constants/differentials'
import './Differentials.css'

function Differentials() {
  return (
    <section id="diferenciais" className="section differentials">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Por que escolher a MHI Saúde</span>
          <h2>Nossos diferenciais</h2>
        </div>
        <div className="differentials__grid">
          {DIFFERENTIALS.map((item) => (
            <div key={item.id} className="differential-card">
              <Icon name={item.icon} size={30} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Differentials
```

Create `frontend/src/components/Differentials.css`:

```css
.differentials__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.differential-card {
  text-align: center;
  padding: 28px 20px;
  border-radius: var(--radius-md);
  background: var(--color-green-900);
  color: var(--color-white);
}

.differential-card svg {
  color: var(--color-green-500);
  margin-bottom: 14px;
}

.differential-card h3 {
  color: var(--color-white);
  margin-bottom: 8px;
  font-size: 18px;
}

.differential-card p {
  color: rgba(255, 255, 255, 0.75);
  font-size: 14px;
}

@media (max-width: 900px) {
  .differentials__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .differentials__grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- Differentials.test.jsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd "/Users/ds/Desktop/Projetos DS/MHI Fisio" && git add -A && git commit -m "feat: add differentials section"
```

---

### Task 9: `Contact` component

**Files:**
- Create: `frontend/src/components/Contact.jsx`
- Create: `frontend/src/components/Contact.css`
- Create: `frontend/src/components/Contact.test.jsx`

**Interfaces:**
- Consumes: `Icon` (Task 2), `CONTACT`, `WHATSAPP_URL`, `MAPS_EMBED_URL` from `../constants/contact` (Task 1).
- Produces: `Contact` default export, no props. Renders `<section id="contato">` with address, phone link, Instagram link, WhatsApp CTA, and a Google Maps `<iframe>`.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/Contact.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Contact from './Contact'
import { CONTACT, WHATSAPP_URL, MAPS_EMBED_URL } from '../constants/contact'

describe('Contact', () => {
  it('renders the real address, phone, instagram and whatsapp CTA', () => {
    render(<Contact />)

    expect(screen.getByText(CONTACT.address)).toBeInTheDocument()

    const phoneLink = screen.getByRole('link', { name: CONTACT.whatsappDisplay })
    expect(phoneLink).toHaveAttribute('href', CONTACT.phoneHref)

    const instagramLink = screen.getByRole('link', { name: CONTACT.instagramHandle })
    expect(instagramLink).toHaveAttribute('href', CONTACT.instagramUrl)

    const whatsappCta = screen.getByRole('link', { name: /falar no whatsapp/i })
    expect(whatsappCta).toHaveAttribute('href', WHATSAPP_URL)
  })

  it('renders a Google Maps embed for the clinic address', () => {
    render(<Contact />)
    const map = screen.getByTitle(/localização da mhi saúde/i)
    expect(map.tagName).toBe('IFRAME')
    expect(map).toHaveAttribute('src', MAPS_EMBED_URL)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- Contact.test.jsx`
Expected: FAIL ("Cannot find module './Contact'")

- [ ] **Step 3: Implement the component**

Create `frontend/src/components/Contact.jsx`:

```jsx
import Icon from './Icon'
import { CONTACT, WHATSAPP_URL, MAPS_EMBED_URL } from '../constants/contact'
import './Contact.css'

function Contact() {
  return (
    <section id="contato" className="section section-alt contact">
      <div className="container contact__inner">
        <div className="contact__info">
          <span className="eyebrow">Contato</span>
          <h2>Vamos cuidar da sua saúde</h2>
          <p className="contact__lead">Fale com a gente e agende sua avaliação.</p>

          <ul className="contact__list">
            <li>
              <Icon name="pin" size={22} />
              <span>{CONTACT.address}</span>
            </li>
            <li>
              <Icon name="phone" size={22} />
              <a href={CONTACT.phoneHref}>{CONTACT.whatsappDisplay}</a>
            </li>
            <li>
              <Icon name="instagram" size={22} />
              <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">
                {CONTACT.instagramHandle}
              </a>
            </li>
          </ul>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <Icon name="chat" size={20} />
            Falar no WhatsApp
          </a>
        </div>

        <div className="contact__map">
          <iframe
            title="Localização da MHI Saúde no mapa"
            src={MAPS_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  )
}

export default Contact
```

Create `frontend/src/components/Contact.css`:

```css
.contact__inner {
  display: flex;
  gap: 48px;
  align-items: stretch;
}

.contact__info {
  flex: 1 1 45%;
}

.contact__lead {
  margin-top: 12px;
  color: var(--color-text-muted);
  font-size: 17px;
}

.contact__list {
  list-style: none;
  margin: 28px 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact__list li {
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--color-text);
}

.contact__list svg {
  color: var(--color-green-600);
  flex-shrink: 0;
}

.contact__list a {
  text-decoration: none;
  font-weight: 500;
}

.contact__list a:hover {
  color: var(--color-green-600);
}

.contact__map {
  flex: 1 1 50%;
  min-height: 340px;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

@media (max-width: 900px) {
  .contact__inner {
    flex-direction: column;
  }

  .contact__map {
    min-height: 280px;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- Contact.test.jsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd "/Users/ds/Desktop/Projetos DS/MHI Fisio" && git add -A && git commit -m "feat: add contact section with map embed"
```

---

### Task 10: `Footer` component

**Files:**
- Create: `frontend/src/components/Footer.jsx`
- Create: `frontend/src/components/Footer.css`
- Create: `frontend/src/components/Footer.test.jsx`

**Interfaces:**
- Consumes: `Icon` (Task 2), `CONTACT`, `WHATSAPP_URL` from `../constants/contact` (Task 1), `logo` from `../assets/logo.png`.
- Produces: `Footer` default export, no props. Renders `<footer>` with brand, quick nav links, social links and a copyright line with the current year.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/Footer.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import { CONTACT, WHATSAPP_URL } from '../constants/contact'

describe('Footer', () => {
  it('renders quick links to every section', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Sobre' })).toHaveAttribute('href', '#sobre')
    expect(screen.getByRole('link', { name: 'Serviços' })).toHaveAttribute('href', '#servicos')
    expect(screen.getByRole('link', { name: 'Diferenciais' })).toHaveAttribute(
      'href',
      '#diferenciais',
    )
    expect(screen.getByRole('link', { name: 'Contato' })).toHaveAttribute('href', '#contato')
  })

  it('renders social links to instagram and whatsapp', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /instagram da mhi saúde/i })).toHaveAttribute(
      'href',
      CONTACT.instagramUrl,
    )
    expect(screen.getByRole('link', { name: /whatsapp da mhi saúde/i })).toHaveAttribute(
      'href',
      WHATSAPP_URL,
    )
  })

  it('renders a copyright line with the current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${year} MHI Saúde`))).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- Footer.test.jsx`
Expected: FAIL ("Cannot find module './Footer'")

- [ ] **Step 3: Implement the component**

Create `frontend/src/components/Footer.jsx`:

```jsx
import logo from '../assets/logo.png'
import Icon from './Icon'
import { CONTACT, WHATSAPP_URL } from '../constants/contact'
import './Footer.css'

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#contato', label: 'Contato' },
]

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="MHI Saúde - Centro de Fisioterapia" />
          <p>Cuidando do seu movimento, cuidando de você.</p>
        </div>

        <nav className="footer__nav" aria-label="Links rápidos">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__social">
          <a
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da MHI Saúde"
          >
            <Icon name="instagram" size={22} />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp da MHI Saúde"
          >
            <Icon name="chat" size={22} />
          </a>
        </div>
      </div>

      <p className="footer__copy">
        © {year} MHI Saúde - Centro de Fisioterapia. Todos os direitos reservados.
      </p>
    </footer>
  )
}

export default Footer
```

Create `frontend/src/components/Footer.css`:

```css
.footer {
  background: var(--color-green-900);
  color: var(--color-white);
  padding: 56px 0 24px;
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 32px;
}

.footer__brand img {
  height: 40px;
  background: var(--color-white);
  padding: 6px 10px;
  border-radius: 10px;
}

.footer__brand p {
  margin-top: 12px;
  color: rgba(255, 255, 255, 0.7);
  max-width: 260px;
  font-size: 14px;
}

.footer__nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
}

.footer__nav a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 15px;
}

.footer__nav a:hover {
  color: var(--color-white);
}

.footer__social {
  display: flex;
  gap: 14px;
}

.footer__social a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
}

.footer__social a:hover {
  background: var(--color-green-600);
}

.footer__copy {
  text-align: center;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
}

@media (max-width: 700px) {
  .footer__inner {
    flex-direction: column;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- Footer.test.jsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd "/Users/ds/Desktop/Projetos DS/MHI Fisio" && git add -A && git commit -m "feat: add footer"
```

---

### Task 11: Compose `App`, remove template leftovers

**Files:**
- Modify: `frontend/src/App.jsx`
- Delete: `frontend/src/App.css`
- Delete: `frontend/src/assets/react.svg`
- Delete: `frontend/src/assets/vite.svg`
- Delete: `frontend/src/assets/hero.png`
- Delete: `frontend/public/icons.svg`
- Create: `frontend/src/App.test.jsx`

**Interfaces:**
- Consumes: `Header`, `Hero`, `About`, `Services`, `Differentials`, `Contact`, `Footer`, `WhatsAppButton` (Tasks 3-10).
- Produces: `App` default export rendering the full page, unchanged for `main.jsx` (still `import App from './App.jsx'`).

- [ ] **Step 1: Write the failing integration test**

Create `frontend/src/App.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the header, every section and the footer', () => {
    render(<App />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { level: 1, name: /cuidando do seu movimento/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /quem cuida do seu movimento/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /nossos serviços/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /nossos diferenciais/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /vamos cuidar da sua saúde/i }),
    ).toBeInTheDocument()
  })

  it('does not render any leftover Vite/React template markup', () => {
    render(<App />)
    expect(screen.queryByText(/count is/i)).not.toBeInTheDocument()
    expect(screen.queryByAltText(/vite logo/i)).not.toBeInTheDocument()
    expect(screen.queryByAltText(/react logo/i)).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- App.test.jsx`
Expected: FAIL (current `App.jsx` still renders the Vite template)

- [ ] **Step 3: Rewrite `App.jsx` and remove unused template files**

Replace the full contents of `frontend/src/App.jsx`:

```jsx
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Differentials from './components/Differentials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Differentials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
```

Delete the now-unused template files:

```bash
cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend/src" && rm App.css assets/react.svg assets/vite.svg assets/hero.png
cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend/public" && rm icons.svg
```

- [ ] **Step 4: Run test to verify it passes, then run the full suite**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test -- App.test.jsx`
Expected: PASS

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test`
Expected: PASS (every test file, no failures)

- [ ] **Step 5: Commit**

```bash
cd "/Users/ds/Desktop/Projetos DS/MHI Fisio" && git add -A && git commit -m "feat: compose full MHI Saúde page and remove Vite template leftovers"
```

---

### Task 12: Page metadata, favicon, fonts and manual browser QA

**Files:**
- Modify: `frontend/index.html`
- Modify: `frontend/public/favicon.svg`

**Interfaces:**
- Consumes: nothing (no component interfaces — this is metadata/asset only).
- Produces: page `<title>`, meta description, Google Fonts (`Poppins`) link, and a green/white favicon matching the brand.

- [ ] **Step 1: Update `index.html`**

Replace the full contents of `frontend/index.html`:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="MHI Saúde - Centro de Fisioterapia em Salvador. Atendimento humanizado, avaliação individual e tratamentos baseados em evidências."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <title>MHI Saúde - Centro de Fisioterapia</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Replace the favicon with a brand-matching icon**

Replace the full contents of `frontend/public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#0f7a49"/><rect x="21" y="10" width="6" height="28" rx="3" fill="#ffffff"/><rect x="10" y="21" width="28" height="6" rx="3" fill="#ffffff"/></svg>
```

- [ ] **Step 3: Run the full test suite and lint**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm test && npm run lint`
Expected: All tests PASS, lint reports no errors

- [ ] **Step 4: Manual browser verification**

Run: `cd "/Users/ds/Desktop/Projetos DS/MHI Fisio/frontend" && npm run dev`

Open the printed local URL in a browser and confirm:
- Tab title shows "MHI Saúde - Centro de Fisioterapia" and the green favicon
- Header stays fixed on scroll, all 4 nav links scroll to their section, mobile hamburger menu opens/closes below ~900px width
- Hero, Sobre, Serviços, Diferenciais, Contato and Footer render with the green/white palette, no purple/default Vite colors remain
- The Google Maps embed in Contato shows the correct address
- The floating WhatsApp button is visible on every section and opens `https://wa.me/5571996488616`
- Resize to a mobile width (~375px) and confirm no horizontal scrollbar and no overlapping content

Stop the dev server (Ctrl+C) once verified.

- [ ] **Step 5: Commit**

```bash
cd "/Users/ds/Desktop/Projetos DS/MHI Fisio" && git add -A && git commit -m "feat: update page metadata, fonts and favicon for MHI Saúde"
```
