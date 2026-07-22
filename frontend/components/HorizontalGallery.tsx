"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  client: string;
  year: number;
  image: string;
  description: string;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Zenith Chrono",
    slug: "zenith-chrono",
    category: "Brand Design & CGI",
    client: "Zenith Laboratories",
    year: 2026,
    image: "/project_1.jpg",
    description:
      "A complete visual identity redesign and premium CGI macro product rendering campaign for a Swiss luxury watchmaker. Emphasizing precision, heritage, and dark moody tones.",
  },
  {
    id: "2",
    title: "Neo-Tokyo Capsule",
    slug: "neo-tokyo-capsule",
    category: "CGI & Fashion Design",
    client: "Kurota Apparel",
    year: 2025,
    image: "/project_2.jpg",
    description:
      "A virtual apparel concept exploring cyberpunk street styles, neon wireframe elements, and dynamic materials. Rendered entirely in high-fidelity 3D workspace.",
  },
  {
    id: "3",
    title: "Spectral Audio",
    slug: "spectral-audio",
    category: "UI/UX & Web Development",
    client: "Spectrum Audio Systems",
    year: 2026,
    image: "/project_3.jpg",
    description:
      "An immersive browser-based music synthesizer. Featuring interactive glassmorphic dials, neon-glow frequency visualizers, and web audio API synth integration.",
  },
];

function ProjectImage({
  src,
  alt,
  className,
  fallbackSrc,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className={className}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}

export default function HorizontalGallery({
  projects = DEFAULT_PROJECTS,
}: {
  projects?: Project[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useGSAP(
    () => {
      const scrollEl = scrollRef.current;
      const containerEl = containerRef.current;
      if (!scrollEl || !containerEl) return;

      const getScrollAmount = () => {
        const scrollWidth = scrollEl.scrollWidth;
        const viewportWidth = window.innerWidth;
        const distance = scrollWidth - viewportWidth;
        return distance > 0 ? -distance : 0;
      };

      const getEndDistance = () => {
        const scrollWidth = scrollEl.scrollWidth;
        const viewportWidth = window.innerWidth;
        const distance = scrollWidth - viewportWidth;
        return distance > 0 ? distance : window.innerWidth;
      };

      const scrollTween = gsap.fromTo(
        scrollEl,
        { x: 0 },
        {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: containerEl,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 1,
            start: "top top",
            end: () => `+=${getEndDistance()}`,
            invalidateOnRefresh: true,
          },
        },
      );

      // Add a subtle parallax effect to the project images inside the horizontal scroll
      gsap.utils.toArray<HTMLElement>(".gallery-img").forEach((img) => {
        gsap.fromTo(
          img,
          { x: "-10%" },
          {
            x: "10%",
            ease: "none",
            scrollTrigger: {
              trigger: img,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });

      // Refresh ScrollTrigger after a slight delay to ensure images & layout have measured correctly
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

      return () => clearTimeout(timer);
    },
    { scope: containerRef, dependencies: [projects] },
  );

  return (
    <section
      ref={containerRef}
      id="works"
      className="relative min-h-screen bg-background overflow-hidden flex items-center"
    >
      {/* Pinned Title Layer */}
      <div className="absolute top-24 left-6 md:left-12 z-10 pointer-events-none">
        <h2 className="font-syne text-[8vw] md:text-[5vw] font-extrabold uppercase leading-none text-foreground/10 tracking-tighter">
          SELECTED WORKS
        </h2>
      </div>

      {/* Horizontal Scroll Element */}
      <div
        ref={scrollRef}
        className="flex gap-16 px-6 md:px-24 py-12 shrink-0 items-center"
      >
        {/* Intro Slide */}
        <div className="w-[30vw] min-w-[300px] flex flex-col justify-center shrink-0">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
            Creative Portfolio
          </span>
          <h3 className="font-syne text-4xl md:text-5xl font-bold uppercase mb-6 leading-tight">
            Crafting Digital Excellence.
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Scroll down to explore our selected projects. We fuse premium
            aesthetics with interactive motion to build digital products that
            leave a lasting mark.
          </p>
        </div>

        {/* Project Slides */}
        {projects.map((project, idx) => {
          const fallback = `/project_${(idx % 3) + 1}.jpg`;
          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              data-cursor="view"
              data-cursor-text="PREVIEW"
              className="w-[45vw] min-w-[400px] md:w-[35vw] aspect-[3/2] relative group rounded-lg overflow-hidden shrink-0 bg-muted cursor-pointer border border-border/20 transition-all duration-300 hover:border-primary/40"
            >
              {/* Project Image with parallax class */}
              <div className="relative w-full h-full scale-110 overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.14]">
                <ProjectImage
                  src={project.image}
                  alt={project.title}
                  fallbackSrc={fallback}
                  className="gallery-img object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
              </div>

              {/* Project Floating Meta */}
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10 text-foreground pointer-events-none">
                <span className="text-xs font-semibold tracking-wider text-primary uppercase mb-2 block">
                  {project.category}
                </span>
                <h4 className="font-syne text-2xl md:text-3xl font-bold uppercase tracking-tight">
                  {project.title}
                </h4>
              </div>

              <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-background/80 backdrop-blur-md border border-border/30 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-primary">
                {project.year}
              </div>
            </div>
          );
        })}

        {/* Outro Slide */}
        <div className="w-auto max-w-sm md:max-w-md flex flex-col justify-center shrink-0">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
            Next Level
          </span>
          <h3 className="font-syne text-4xl md:text-5xl font-bold uppercase mb-6 leading-tight">
            Have a Vision?
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
            We are always open to building new things together. Let's make
            something remarkable.
          </p>
          <Link
            href="#contact"
            className="text-xs uppercase tracking-widest text-foreground hover:text-primary font-bold border-b border-foreground hover:border-primary pb-1 self-start transition-colors duration-200"
          >
            Let's Talk &rarr;
          </Link>
        </div>

        {/* End Buffer Spacer */}
        <div className="w-12 md:w-24 shrink-0" />
      </div>

      {/* Shadcn Dialog for Quick-View */}
      <Dialog
        open={selectedProject !== null}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <DialogContent
          className="max-w-2xl bg-card border border-border/20 text-foreground"
          initialFocus={false}
        >
          {selectedProject && (
            <>
              <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-6 bg-muted border border-border/10">
                {(() => {
                  const projectIdx = projects.findIndex(
                    (p) => p.id === selectedProject.id
                  );
                  const fallback = `/project_${
                    (projectIdx >= 0 ? projectIdx % 3 : 0) + 1
                  }.jpg`;
                  return (
                    <ProjectImage
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fallbackSrc={fallback}
                      className="object-cover"
                    />
                  );
                })()}
              </div>
              <DialogHeader>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                      {selectedProject.category}
                    </span>
                    <DialogTitle className="font-syne text-3xl font-extrabold uppercase mt-1">
                      {selectedProject.title}
                    </DialogTitle>
                  </div>
                  <div className="bg-muted px-3 py-1 rounded text-xs font-mono border border-border/10">
                    {selectedProject.year}
                  </div>
                </div>
                <DialogDescription className="text-muted-foreground text-sm mt-4 leading-relaxed">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 border-t border-border/20 pt-6 mt-6 text-xs uppercase tracking-wider text-muted-foreground">
                <div>
                  <span className="block text-[10px] text-muted-foreground/60 mb-1">
                    CLIENT
                  </span>
                  <span className="font-bold text-foreground">
                    {selectedProject.client}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground/60 mb-1">
                    PROJECT DETAILS
                  </span>
                  <Link
                    href={`/project/${selectedProject.slug}`}
                    className="font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    VIEW DETAIL PAGE &rarr;
                  </Link>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
