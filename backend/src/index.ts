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
    } catch (error) {
      strapi.log.error('Failed to seed database:', error);
    }
  },
};
