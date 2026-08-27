# Mohd Umair Lari — Professional Portfolio

[![CI & Build Verification](https://github.com/Mohd-Umair-Lari/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Mohd-Umair-Lari/portfolio/actions/workflows/ci.yml)
[![Built with TanStack Start](https://img.shields.io/badge/TanStack-Start-blue)](https://tanstack.com/start)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-CSS%204-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=threedotjs)](https://threejs.org/)

> Modern, high-performance, and responsive personal portfolio showcasing applied ML research, full-stack systems, cloud architecture, and IEEE publications.

---

## ⚡ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (Full-stack SSR with Nitro engine & TanStack Router)
- **UI & Animations**: React 19, [Tailwind CSS v4](https://tailwindcss.com), [Framer Motion](https://www.framer.com/motion/), [Lucide Icons](https://lucide.dev)
- **3D & Graphics**: Three.js, [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **SEO & Meta**: Semantic HTML5, Dynamic XML Sitemap, OpenGraph & Twitter cards, SVG favicon, robots.txt

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- Node.js 20+ (Node 22 recommended)
- npm, bun, or pnpm

### 1. Install dependencies

```bash
npm install
```

### 2. Run local development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified by Vite) in your browser.

### 3. Build & Preview

```bash
# Typecheck
npm run typecheck

# Lint and format
npm run lint
npm run format

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment Options

### Option 1: Cloudflare Pages / Workers (Recommended)

This project is pre-configured with Nitro's `cloudflare-module` preset.

1. **Deploy with Cloudflare Wrangler CLI:**
   ```bash
   npm run build
   npx wrangler pages deploy .output/public
   # or deploy worker bundle:
   npx wrangler deploy
   ```
2. **Via Cloudflare Dashboard (Git Integration):**
   - Framework Preset: `None` / `Custom`
   - Build Command: `npm run build`
   - Output Directory: `.output/public`

---

### Option 2: Vercel

1. Install [Vercel CLI](https://vercel.com/cli) or import the repository in the Vercel Dashboard.
2. Build Settings:
   - **Framework Preset**: `Other` (or `Vite`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.output/public`
3. Environment Variables:
   - `VITE_SITE_URL`: `https://your-domain.vercel.app`

---

### Option 3: Netlify

1. Connect repository in Netlify Dashboard.
2. Build Settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.output/public`
3. Environment Variables:
   - `VITE_SITE_URL`: `https://your-domain.netlify.app`

---

### Option 4: Docker & Google Cloud Run

A multi-stage production `Dockerfile` is included in the root directory.

1. **Build container image:**
   ```bash
   docker build -t umair-portfolio .
   ```
2. **Run locally:**
   ```bash
   docker run -p 8080:8080 umair-portfolio
   ```
3. **Deploy to Google Cloud Run:**
   ```bash
   gcloud builds submit --tag gcr.io/[PROJECT-ID]/umair-portfolio
   gcloud run deploy umair-portfolio \
     --image gcr.io/[PROJECT-ID]/umair-portfolio \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

---

### Option 5: Self-Hosted / VPS (Node.js)

```bash
npm run build
NODE_ENV=production PORT=8080 node .output/server/index.mjs
```

Use PM2 or Systemd to keep the service running behind Nginx / Caddy.

---

## 📁 Project Structure

```
├── public/
│   ├── favicon.svg             # Vector favicon
│   ├── og-image.svg            # OpenGraph & social preview image
│   ├── robots.txt              # Search engine crawler instructions
│   └── Umair_Lari_Resume.pdf   # Resume download asset
├── src/
│   ├── components/
│   │   ├── DotSphere.tsx       # Interactive 3D Three.js particle sphere
│   │   └── ui/                 # Accessible UI components (buttons, badges, cards)
│   ├── routes/
│   │   ├── __root.tsx          # Root shell layout, meta tags, and font links
│   │   ├── index.tsx           # Single-page portfolio content and sections
│   │   └── sitemap[.]xml.ts    # Dynamic XML sitemap generator route
│   ├── styles.css              # Tailwind CSS 4 theme & tokens
│   ├── router.tsx              # TanStack Router instance configuration
│   ├── start.ts                # Client entry
│   └── server.ts               # SSR error handling & server entry
├── Dockerfile                  # Multi-stage container definition
├── vite.config.ts              # Vite & TanStack Start build configuration
└── package.json                # Project scripts & dependencies
```

---

## 📄 License

© 2026 Mohd Umair Lari. All rights reserved.
