import type { Core } from '@strapi/strapi';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      // Check if projects already exist in the database
      const existingProjects = await strapi.documents('api::project.project').findMany({
        limit: 1,
      });

      if (existingProjects.length === 0) {
        strapi.log.info('Seeding database with sample projects...');
        
        const sampleProjects = [
          {
            title: "Zenith Chrono",
            slug: "zenith-chrono",
            category: "Brand Design & CGI",
            client: "Zenith Laboratories",
            year: 2026,
            description: "A complete visual identity redesign and premium CGI macro product rendering campaign for a Swiss luxury watchmaker. Emphasizing precision, heritage, and dark moody tones.",
            content: "Our team worked closely with Zenith to redesign their brand core assets, focusing on high precision aesthetics and modern typography. We built a library of 3D watch models and rendered them under moody macro studio setups, showcasing the fine mechanical intricacies of each movement. The frontend leverages custom WebGL layers to let users rotate and inspect parts of the watch in real time.",
            status: "published"
          },
          {
            title: "Neo-Tokyo Capsule",
            slug: "neo-tokyo-capsule",
            category: "CGI & Fashion Design",
            client: "Kurota Apparel",
            year: 2025,
            description: "A virtual apparel concept exploring cyberpunk street styles, neon wireframe elements, and dynamic materials. Rendered entirely in high-fidelity 3D workspace.",
            content: "Neo-Tokyo Capsule represents a creative experiment in digital wear. By bridging traditional apparel design software with game engines and CGI renderers, we modeled drape, folds, and fabric physics with photorealistic fidelity. The website showcase pins on scroll, guiding users through a virtual runway of mannequin rotating states and close-up texture inspections.",
            status: "published"
          },
          {
            title: "Spectral Audio",
            slug: "spectral-audio",
            category: "UI/UX & Web Development",
            client: "Spectrum Audio Systems",
            year: 2026,
            description: "An immersive browser-based music synthesizer. Featuring interactive glassmorphic dials, neon-glow frequency visualizers, and web audio API synth integration.",
            content: "Spectral Audio is a playground for sound designers and frontend developers. Combining the Web Audio API with a Next.js framework, we created a fully playable monophonic synthesizer in the browser. The UI utilizes CSS glassmorphism, glowing amber indicators, and smooth SVG lines that warp dynamically as the sound frequency is tweaked. Users can record and download their loops directly.",
            status: "published"
          }
        ];

        for (const project of sampleProjects) {
          await strapi.documents('api::project.project').create({
            data: project as any,
          });
        }
        
        strapi.log.info('Database successfully seeded with projects.');
      }

      // Check if services already exist in the database
      const existingServices = await strapi.documents('api::service.service').findMany({
        limit: 1,
      });

      if (existingServices.length === 0) {
        strapi.log.info('Seeding database with sample services...');
        
        const sampleServices = [
          {
            order: 1,
            title: "Brand Strategy & Art Direction",
            shortDesc: "Establishing elegant visual guidelines, packaging design, and high-fidelity motion systems.",
            longDesc: "We craft cohesive identities that span digital and physical workspaces. From custom typography systems to full motion direction guidelines, we ensure your brand speaks premium across every touchpoint.",
            price: "From $5k",
            deliverables: ["Visual Brand Identity", "Design System / Tokens", "Art Direction Guidelines", "Interactive UI Assets"],
            status: "published"
          },
          {
            order: 2,
            title: "CGI & 3D Product Mockups",
            shortDesc: "Photorealistic macro product renderings and abstract CGI animation loops.",
            longDesc: "Using state-of-the-art rendering tools, we simulate natural environments, macro studio light fixtures, and material physical properties to represent products with a breathtaking visual depth.",
            price: "From $8k",
            deliverables: ["3D Product Renders", "Interactive 3D Web Assets", "Abstract CGI Loop Animations", "High-Resolution Prints"],
            status: "published"
          },
          {
            order: 3,
            title: "Immersive WebGL & Next.js Dev",
            shortDesc: "High-performance frontends with smooth GSAP animations and Lenis scrolling.",
            longDesc: "We build bespoke Next.js frontends. We link hardware-accelerated animations with smooth Lenis physics, creating an interactive narrative that keeps users hooked and loading times minimal.",
            price: "From $12k",
            deliverables: ["Custom Next.js Frontend", "GSAP & ScrollTrigger Animations", "Responsive Mobile Layouts", "SEO & Performance Tuning"],
            status: "published"
          },
          {
            order: 4,
            title: "Headless Strapi CMS Architecture",
            shortDesc: "Configuring robust Strapi v5 databases for easy client-side editorial management.",
            longDesc: "We link your Next.js application with a headless Strapi setup using REST/GraphQL APIs. Clients get a simple markdown-rich workspace dashboard to edit posts and galleries, while the site stays statically optimized.",
            price: "From $4k",
            deliverables: ["Strapi v5 CMS Database", "Custom API Collection Types", "Image CDN & Optimization Hooks", "Full Server Configuration"],
            status: "published"
          }
        ];

        for (const service of sampleServices) {
          await strapi.documents('api::service.service').create({
            data: service as any,
          });
        }
        
        strapi.log.info('Database successfully seeded with services.');
      }

      // Auto-grant public read permissions for projects and services
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        const actionsToEnsure = [
          'api::service.service.find',
          'api::service.service.findOne',
          'api::project.project.find',
          'api::project.project.findOne',
        ];

        const existingPerms = await strapi.db.query('plugin::users-permissions.permission').findMany({
          where: {
            role: publicRole.id,
            action: { $in: actionsToEnsure },
          },
        });

        const existingActions = existingPerms.map((p: any) => p.action);
        const actionsToCreate = actionsToEnsure.filter((a) => !existingActions.includes(a));

        for (const action of actionsToCreate) {
          await strapi.db.query('plugin::users-permissions.permission').create({
            data: {
              action,
              role: publicRole.id,
            },
          });
        }
      }
    } catch (error) {
      strapi.log.error('Failed to seed database or set permissions:', error);
    }
  },
};
