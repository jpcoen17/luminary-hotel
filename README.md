# LUMINARY — Ultra-Immersive Luxury Hotel Website

> A cinematic, AAA-quality 3D hotel experience built with Next.js 15, React Three Fiber, and Framer Motion.

---

## ✦ Overview

LUMINARY is a full-stack, production-ready luxury property website designed to feel like entering a virtual hotel. It features:

- **Cinematic 3D scenes** — rain, lobby, room, balcony, facilities
- **Smooth cinematic transitions** — GSAP + Framer Motion + Lenis
- **Interactive room configurator** — live 3D style switching
- **AI Concierge** — floating assistant UI
- **Luxury design system** — gold, marble, dark cinematic

---

## ✦ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Framework (App Router) |
| TypeScript | Type safety |
| TailwindCSS | Utility styling |
| React Three Fiber | 3D rendering |
| Three.js | 3D engine |
| @react-three/drei | 3D helpers |
| Framer Motion | UI animations |
| GSAP | Cinematic timelines |
| Lenis | Smooth scrolling |
| @react-three/postprocessing | Bloom, DOF, film grain |

---

## ✦ Fonts

- **Cormorant Garamond** — Luxury display / headings (serif)
- **Plus Jakarta Sans** — Body text / UI (clean sans-serif)
- **DM Mono** — Labels / captions / metadata (monospace)

---

## ✦ Setup

### Prerequisites
- Node.js 18.17+ or 20+
- npm or pnpm

### Installation

```bash
# 1. Navigate to project directory
cd luminary-hotel

# 2. Install dependencies
npm install
# or
pnpm install

# 3. Start development server
npm run dev
# or
pnpm dev

# 4. Open browser
# http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

---

## ✦ Project Structure

```
luminary-hotel/
├── app/
│   ├── components/
│   │   ├── 3d/                   # Three.js scene components
│   │   │   ├── HeroScene.tsx     # Rain + building + city
│   │   │   ├── LobbyScene.tsx    # Marble + chandelier + lobby
│   │   │   ├── RoomScene.tsx     # Bedroom + city view + controls
│   │   │   ├── BalconyScene.tsx  # Cityscape + atmosphere
│   │   │   └── FacilityScene.tsx # Pool + Gym + Cowork
│   │   └── ui/                   # UI section components
│   │       ├── LoadingScreen.tsx
│   │       ├── CustomCursor.tsx
│   │       ├── Navigation.tsx
│   │       ├── SectionMinimap.tsx
│   │       ├── GlassCard.tsx
│   │       ├── AnimatedText.tsx
│   │       ├── AIConcierge.tsx
│   │       ├── HeroSection.tsx
│   │       ├── LobbySection.tsx
│   │       ├── ElevatorSection.tsx
│   │       ├── RoomSection.tsx
│   │       ├── BalconySection.tsx
│   │       ├── FacilitiesSection.tsx
│   │       ├── ConfiguratorSection.tsx
│   │       ├── GallerySection.tsx
│   │       ├── BookingSection.tsx
│   │       └── Footer.tsx
│   ├── hooks/
│   │   └── index.ts              # Custom hooks (scroll, mouse, audio, lenis)
│   ├── lib/
│   │   ├── constants.ts          # Room data, facilities, nav items
│   │   └── utils.ts              # Utility functions, easing
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   ├── globals.css               # Global styles, cursor, animations
│   ├── layout.tsx                # Root layout with fonts
│   └── page.tsx                  # Main page assembling all sections
├── public/
│   ├── models/                   # GLTF/GLB 3D models (add your own)
│   ├── textures/                 # Image textures (add your own)
│   └── audio/                    # Audio files (optional)
├── package.json
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── README.md
```

---

## ✦ Adding 3D Assets

The project uses procedural Three.js geometry by default. To enhance with real models:

### 3D Models (GLTF/GLB)
Place in `/public/models/` and import via `useGLTF`:
```tsx
import { useGLTF } from '@react-three/drei';
const { scene } = useGLTF('/models/room.glb');
```

### HDR Environment Maps
Place `.hdr` files in `/public/textures/` and use:
```tsx
import { Environment } from '@react-three/drei';
<Environment files="/textures/apartment.hdr" />
```

Recommended free sources:
- [Poly Haven](https://polyhaven.com/hdris) — Free HDRIs
- [Sketchfab](https://sketchfab.com) — Free 3D models
- [ambientCG](https://ambientcg.com) — PBR textures

---

## ✦ Customization

### Colors (tailwind.config.js)
```js
gold: {
  300: '#f4db8e',
  400: '#e8c56a',
  500: '#d4922a',
  600: '#b8741a',
}
```

### Room Data (app/lib/constants.ts)
Edit the `ROOMS` array to change room names, prices, descriptions.

### Sections
Each section is a standalone component in `app/components/ui/`. Enable/disable by editing `app/page.tsx`.

---

## ✦ Performance Notes

- All 3D canvases use `dpr={[1, 1.5]}` for performance/quality balance
- `dynamic(() => import(...), { ssr: false })` prevents server-side 3D rendering
- `Suspense` boundaries prevent blocking render
- Mobile devices automatically get simplified scenes

---

## ✦ Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## ✦ Browser Support

| Browser | Status |
|---|---|
| Chrome 90+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Safari 15+ | ✅ Full support |
| Edge 90+ | ✅ Full support |
| Mobile Chrome | ✅ Optimized |
| Mobile Safari | ✅ Optimized |

> WebGL 2.0 required for 3D scenes. Falls back gracefully on older devices.

---

## ✦ License

This project is created as a premium template. All rights reserved.

---

*"Where luxury meets the extraordinary."*
— LUMINARY, Jakarta 2025
