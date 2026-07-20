# Elysian Agency — Immersive Creative Portfolio & Headless CMS

Elysian Agency is a high-fidelity, interactive practice project showcasing a creative portfolio built using a modern frontend and headless CMS stack. It serves as a comprehensive playground to master smooth scroll animations, custom mouse interactions, responsive components, and backend schemas.

---

## 🚀 Tech Stack

- **Frontend (`/frontend`)**:
  * **Next.js 16 (App Router)** — Dynamic server-side rendering with Turbopack.
  * **Tailwind CSS v4** — High-performance utility styles using inline design tokens and OKLCH color spaces.
  * **GSAP 3 & @gsap/react** — Advanced timelines, ScrollTrigger, elastic animations, and optimized pointer tracking.
  * **Lenis Scroll** — Custom smooth inertia scrolling.
  * **Shadcn UI** — Premium accessible components (Dialog, Sheet, Tabs, Accordions) styled with custom variables.
- **Backend (`/backend`)**:
  * **Strapi v5 (Headless CMS)** — Decoupled content management.
  * **SQLite Database** — Quick local storage and data retrieval.
  * **TypeScript Support** — Fully typed content structures.

---

## ⭐️ Interactive Features

1. **Custom Follower Cursor** ([CustomCursor.tsx](frontend/components/CustomCursor.tsx)):
   - Optimized pointer tracking using GSAP `quickTo`.
   - Adapts dynamically to hover targets: scales up and inverts text colors over headers, morphs into a gold `"PREVIEW"` tag over project cards, and scales boundaries on clickable links.
2. **Lenis & GSAP Sync** ([SmoothScroll.tsx](frontend/components/SmoothScroll.tsx)):
   - Hooks Lenis scroll frames into the GSAP global ticker, preventing animation frame lag and ensuring ScrollTriggers evaluate in absolute lockstep.
3. **Elastic Magnetic Buttons** ([Magnetic.tsx](frontend/components/Magnetic.tsx)):
   - Calculates cursor offsets to pull buttons and navigation links toward the pointer on hover with customizable spring physics.
4. **Horizontal Pin-Scroll Showcase** ([HorizontalGallery.tsx](frontend/components/HorizontalGallery.tsx)):
   - Pins the vertical viewport scroll and translates a project card row horizontally.
   - Leverages a **Shadcn UI Dialog** component to overlay custom project quick-views.
5. **Layout Shift-Free Accordion** ([Services.tsx](frontend/components/Services.tsx)):
   - Animates accordion content panel heights smoothly from `0` to `auto` with GSAP, avoiding the jank and layout reflow delays of CSS max-height transitions.
6. **Robust CMS Connectivity & Fallback** ([Project Page](frontend/app/project/[slug]/page.tsx)):
   - Requests projects from Strapi endpoints dynamically.
   - If the Strapi database is offline, it gracefully falls back to local high-fidelity mock data containing CGI abstract images.
7. **Database Seeding** ([index.ts](backend/src/index.ts)):
   - Automatically populates the Strapi database with sample project collections on bootstrap if the database is detected as empty.

---

## 🛠️ Getting Started

### 1. Initialize and Run the Backend
Go to the backend folder, install dependencies, and start the Strapi development server:
```bash
cd creative-portfolio/backend
npm install
npm run develop
```
- Open `http://localhost:1337/admin` to set up your administrator account.
- The project automatically seeds initial entries. You can manage, update, and publish additional projects in the **Content Manager** tab.
- *Note*: Ensure you set public permissions for the `project` collection (under Settings → Roles → Public → Project) to allow `find` and `findOne` API fetches.

### 2. Initialize and Run the Frontend
Go to the frontend folder, install dependencies, and run the Next.js development server:
```bash
cd creative-portfolio/frontend
npm install
npm run dev
```
- Open `http://localhost:3000` in your browser.
- Scroll down to trigger horizontal scrolls, test the custom cursor, expand the services accordion, and click project cards to see the quick-view dialogs.
- Once you publish projects with media covers in your Strapi Admin Panel, the Next.js app will replace the local fallback templates with your CMS assets!
