"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import Magnetic from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  slug: string;
  category: string;
  client: string;
  year: number;
  image: string;
  description: string;
  content?: string;
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Text Stagger Animations on Load
      const tl = gsap.timeline();
      tl.from(".back-btn", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power2.out",
      })
      .from(".project-meta > *", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.3")
      .from(".project-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power4.out",
      }, "-=0.4");

      // 2. Parallax Scale & Translate effect for Hero Cover Image
      if (imgRef.current && heroRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.15, y: 0 },
          {
            scale: 1,
            y: "15%",
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // 3. ScrollTrigger: Reveal Content Blocks sequentially
      gsap.from(".reveal-block > *", {
        scrollTrigger: {
          trigger: ".reveal-block",
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground pb-24">
      {/* Pinned Back Button */}
      <div className="absolute top-8 left-6 md:left-12 z-50 back-btn">
        <Magnetic>
          <Link
            href="/"
            className="flex items-center gap-2 bg-background/80 backdrop-blur-md border border-border/20 px-4 py-2 rounded-full text-xs uppercase tracking-widest hover:border-primary/40 hover:text-primary transition-all duration-200"
          >
            <ArrowLeft size={14} /> Back to Works
          </Link>
        </Magnetic>
      </div>

      {/* Hero Header Section */}
      <div ref={heroRef} className="relative w-full h-[80svh] overflow-hidden bg-black flex flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">
        {/* Cover Background Image */}
        <div ref={imgRef} className="absolute inset-0 w-full h-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        {/* Project Meta Info */}
        <div className="relative z-10 max-w-4xl">
          <div className="project-meta flex flex-wrap gap-4 items-center mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="flex items-center gap-1">
              <Tag size={12} /> {project.category}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-border/40" />
            <span className="flex items-center gap-1">
              <User size={12} /> {project.client}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-border/40" />
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {project.year}
            </span>
          </div>
          <h1 className="project-title font-syne text-[8vw] md:text-[5.5vw] font-extrabold uppercase leading-none tracking-tighter">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-4xl mx-auto px-6 mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 reveal-block">
        {/* Left side details */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <h2 className="font-syne text-2xl font-bold uppercase tracking-tight text-foreground border-b border-border/20 pb-4">
            The Narrative
          </h2>
          <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
            <p className="text-base text-foreground/90 font-medium">
              {project.description}
            </p>
            {project.content ? (
              <div className="prose prose-invert max-w-none text-muted-foreground">
                {project.content}
              </div>
            ) : (
              <>
                <p>
                  To design a truly immersive practice environment, we focused on aligning visual layouts with performance benchmarks. The creative direction centered on evoking premium digital aesthetics through high contrast dark tones, curated typography, and fluid transitions.
                </p>
                <p>
                  We worked in close tandem with content strategists and digital art directors to establish the baseline parameters of the design framework. Every element, from the elastic pull of magnetic buttons to the inertia scroll physics, was iterated repeatedly to achieve a highly tactical, premium responsive feel.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right side stats */}
        <div className="flex flex-col gap-8 bg-card/40 border border-border/10 p-6 rounded-lg self-start">
          <h3 className="font-syne text-lg font-bold uppercase tracking-tight text-foreground border-b border-border/20 pb-2">
            Project Details
          </h3>
          <ul className="flex flex-col gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <li className="flex flex-col gap-1 border-b border-border/10 pb-2">
              <span className="text-[10px] text-muted-foreground/50">Client</span>
              <span className="text-foreground">{project.client}</span>
            </li>
            <li className="flex flex-col gap-1 border-b border-border/10 pb-2">
              <span className="text-[10px] text-muted-foreground/50">Timeline</span>
              <span className="text-foreground">{project.year}</span>
            </li>
            <li className="flex flex-col gap-1 border-b border-border/10 pb-2">
              <span className="text-[10px] text-muted-foreground/50">Core Stack</span>
              <span className="text-foreground text-primary">GSAP, Tailwind, NextJS</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
