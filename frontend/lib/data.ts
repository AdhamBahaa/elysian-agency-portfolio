export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  client: string;
  year: number;
  image: string;
  description: string;
  content?: string;
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Zenith Chrono",
    slug: "zenith-chrono",
    category: "Brand Design & CGI",
    client: "Zenith Laboratories",
    year: 2026,
    image: "/project_1.jpg",
    description: "A complete visual identity redesign and premium CGI macro product rendering campaign for a Swiss luxury watchmaker. Emphasizing precision, heritage, and dark moody tones.",
    content: "Our team worked closely with Zenith to redesign their brand core assets, focusing on high precision aesthetics and modern typography. We built a library of 3D watch models and rendered them under moody macro studio setups, showcasing the fine mechanical intricacies of each movement. The frontend leverages custom WebGL layers to let users rotate and inspect parts of the watch in real time."
  },
  {
    id: "2",
    title: "Neo-Tokyo Capsule",
    slug: "neo-tokyo-capsule",
    category: "CGI & Fashion Design",
    client: "Kurota Apparel",
    year: 2025,
    image: "/project_2.jpg",
    description: "A virtual apparel concept exploring cyberpunk street styles, neon wireframe elements, and dynamic materials. Rendered entirely in high-fidelity 3D workspace.",
    content: "Neo-Tokyo Capsule represents a creative experiment in digital wear. By bridging traditional apparel design software with game engines and CGI renderers, we modeled drape, folds, and fabric physics with photorealistic fidelity. The website showcase pins on scroll, guiding users through a virtual runway of mannequin rotating states and close-up texture inspections."
  },
  {
    id: "3",
    title: "Spectral Audio",
    slug: "spectral-audio",
    category: "UI/UX & Web Development",
    client: "Spectrum Audio Systems",
    year: 2026,
    image: "/project_3.jpg",
    description: "An immersive browser-based music synthesizer. Featuring interactive glassmorphic dials, neon-glow frequency visualizers, and web audio API synth integration.",
    content: "Spectral Audio is a playground for sound designers and frontend developers. Combining the Web Audio API with a Next.js framework, we created a fully playable monophonic synthesizer in the browser. The UI utilizes CSS glassmorphism, glowing amber indicators, and smooth SVG lines that warp dynamically as the sound frequency is tweaked. Users can record and download their loops directly."
  },
];
