"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Plus, Minus } from "lucide-react";

interface ServiceItem {
  id: number;
  title: string;
  shortDesc: string;
  longDesc: string;
  price: string;
  deliverables: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    title: "Brand Strategy & Art Direction",
    shortDesc: "Establishing elegant visual guidelines, packaging design, and high-fidelity motion systems.",
    longDesc: "We craft cohesive identities that span digital and physical workspaces. From custom typography systems to full motion direction guidelines, we ensure your brand speaks premium across every touchpoint.",
    price: "From $5k",
    deliverables: ["Visual Brand Identity", "Design System / Tokens", "Art Direction Guidelines", "Interactive UI Assets"],
  },
  {
    id: 2,
    title: "CGI & 3D Product Mockups",
    shortDesc: "Photorealistic macro product renderings and abstract CGI animation loops.",
    longDesc: "Using state-of-the-art rendering tools, we simulate natural environments, macro studio light fixtures, and material physical properties to represent products with a breathtaking visual depth.",
    price: "From $8k",
    deliverables: ["3D Product Renders", "Interactive 3D Web Assets", "Abstract CGI Loop Animations", "High-Resolution Prints"],
  },
  {
    id: 3,
    title: "Immersive WebGL & Next.js Dev",
    shortDesc: "High-performance frontends with smooth GSAP animations and Lenis scrolling.",
    longDesc: "We build bespoke Next.js frontends. We link hardware-accelerated animations with smooth Lenis physics, creating an interactive narrative that keeps users hooked and loading times minimal.",
    price: "From $12k",
    deliverables: ["Custom Next.js Frontend", "GSAP & ScrollTrigger Animations", "Responsive Mobile Layouts", "SEO & Performance Tuning"],
  },
  {
    id: 4,
    title: "Headless Strapi CMS Architecture",
    shortDesc: "Configuring robust Strapi v5 databases for easy client-side editorial management.",
    longDesc: "We link your Next.js application with a headless Strapi setup using REST/GraphQL APIs. Clients get a simple markdown-rich workspace dashboard to edit posts and galleries, while the site stays statically optimized.",
    price: "From $4k",
    deliverables: ["Strapi v5 CMS Database", "Custom API Collection Types", "Image CDN & Optimization Hooks", "Full Server Configuration"],
  },
];

export default function Services() {
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_DATA);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("http://localhost:1337/api/services?sort=order:asc");
        if (!res.ok) return;
        const json = await res.json();
        if (json?.data && json.data.length > 0) {
          const fetchedServices: ServiceItem[] = json.data.map((item: any, idx: number) => ({
            id: item.id || idx + 1,
            title: item.title,
            shortDesc: item.shortDesc,
            longDesc: item.longDesc,
            price: item.price,
            deliverables: Array.isArray(item.deliverables) ? item.deliverables : [],
          }));
          setServices(fetchedServices);
        }
      } catch {
        // Fallback to SERVICES_DATA if Strapi API is offline
      }
    }

    fetchServices();
  }, []);

  const toggleAccordion = (index: number) => {
    const isOpening = activeIndex !== index;
    const currentRef = contentRefs.current[index];
    const activeRef = activeIndex !== null ? contentRefs.current[activeIndex] : null;

    // 1. Close current active item if any
    if (activeRef) {
      gsap.to(activeRef, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    // 2. Open clicked item
    if (isOpening && currentRef) {
      // Temporarily set height to auto to measure scrollHeight
      gsap.fromTo(
        currentRef,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        }
      );
      setActiveIndex(index);
    } else {
      setActiveIndex(null);
    }
  };

  return (
    <section id="services" className="py-32 px-6 md:px-12 max-w-6xl mx-auto border-t border-border/20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sticky Left Sidebar Title */}
        <div className="lg:sticky lg:top-32 self-start flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">
            What We Do
          </span>
          <h2 className="font-syne text-4xl md:text-5xl font-extrabold uppercase leading-tight">
            OUR BRAND CAPABILITIES
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mt-2">
            Each service is modular and tailored to creative studios demanding visual excellence and fluid user experiences.
          </p>
        </div>

        {/* Custom GSAP Accordion List */}
        <div className="lg:col-span-2 flex flex-col">
          {services.map((service, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={service.id}
                className="border-b border-border/20 py-8 flex flex-col cursor-pointer group"
                onClick={() => toggleAccordion(index)}
              >
                {/* Accordion Row Header */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-muted-foreground/60">
                      0{service.id}.
                    </span>
                    <h3 className="font-syne text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-sm mt-1 max-w-lg">
                      {service.shortDesc}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 mt-1">
                    <span className="hidden sm:inline font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                      {service.price}
                    </span>
                    <div className="p-2 border border-border/20 rounded-full group-hover:border-primary/40 transition-colors duration-200 text-muted-foreground group-hover:text-primary">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </div>
                </div>

                {/* Accordion Expanding Body (Animate height via GSAP) */}
                <div
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="h-0 overflow-hidden opacity-0"
                >
                  <div className="pt-6 pb-2 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    {/* Detailed description */}
                    <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
                      <p>{service.longDesc}</p>
                      <div className="flex sm:hidden font-mono text-xs uppercase tracking-widest text-primary font-semibold mt-2">
                        Investment: {service.price}
                      </div>
                    </div>

                    {/* Deliverables List */}
                    <div className="flex flex-col gap-3">
                      <span className="text-[10px] font-bold tracking-widest text-foreground uppercase border-b border-border/20 pb-2">
                        Key Deliverables
                      </span>
                      <ul className="grid grid-cols-1 gap-2 text-xs">
                        {service.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-foreground/90">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
