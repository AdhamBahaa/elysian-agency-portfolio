"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Magnetic from "./Magnetic";

export default function HomeHeroClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Fade in subheader and tags
      tl.from(".hero-tag", {
        opacity: 0,
        y: -10,
        duration: 0.6,
        ease: "power2.out",
      })
        // Stagger reveal the main hero title words
        .from(
          ".hero-title-word",
          {
            y: "100%",
            opacity: 0,
            stagger: 0.08,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.3",
        )
        // Fade in the CTA and paragraph text
        .from(
          ".hero-fade-in",
          {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90svh] flex flex-col justify-center px-6 md:px-12 max-w-6xl mx-auto pt-32"
    >
      {/* Small top tagline */}
      <div className="hero-tag flex items-center gap-2 mb-8">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono">
          Elysian Creative Agency &copy; 2026
        </span>
      </div>

      {/* Large Typography display heading */}
      <h1 className="font-syne text-[8vw] md:text-[6.5vw] font-extrabold uppercase leading-[0.9] tracking-tighter mb-10 overflow-hidden">
        <div className="overflow-hidden block py-1">
          <span className="hero-title-word inline-block select-none">
            Aesthetic
          </span>
        </div>
        <div className="overflow-hidden block py-1">
          <span className="hero-title-word inline-block select-none text-primary italic font-serif lowercase">
            met with
          </span>
        </div>
        <div className="overflow-hidden block py-1">
          <span className="hero-title-word inline-block select-none">
            Fluid Motion
          </span>
        </div>
      </h1>

      {/* Subtext and CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-4 max-w-4xl">
        <p className="hero-fade-in text-muted-foreground text-sm md:text-base leading-relaxed">
          We design and build digital experiences that feel alive. By marrying
          clean Next.js structure, tailored Tailwind CSS tokens, and premium
          GSAP timelines, we create portfolios and commerce solutions that stand
          out.
        </p>

        <div className="hero-fade-in flex flex-col sm:flex-row gap-6 md:justify-end items-start sm:items-center">
          <Magnetic>
            <Link
              href="#works"
              className="bg-primary text-background px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform duration-200"
            >
              Explore Works
            </Link>
          </Magnetic>

          <Magnetic>
            <Link
              href="#contact"
              className="text-xs uppercase tracking-widest font-bold border-b border-foreground/60 hover:border-primary hover:text-primary pb-1 transition-colors duration-200"
            >
              Get In Touch &rarr;
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
