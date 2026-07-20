"use client";

import Magnetic from "./Magnetic";

export default function Footer() {
  const socials = [
    { name: "Instagram", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "Dribbble", href: "#" },
  ];

  return (
    <footer id="contact" className="bg-background text-foreground py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-border/20 flex flex-col gap-16">
      {/* Call to Action Header */}
      <div className="flex flex-col gap-8 items-start">
        <span className="text-xs uppercase tracking-widest text-primary font-bold">
          Get in Touch
        </span>
        
        <h2 className="font-syne text-[6vw] md:text-[4vw] font-extrabold uppercase leading-none tracking-tighter">
          Let's Build Something<br/>
          <span className="italic font-serif lowercase text-primary">remarkable</span> together.
        </h2>

        {/* Large Magnetic Email */}
        <div className="mt-6">
          <Magnetic>
            <a
              href="mailto:hello@elysian.agency"
              className="font-syne text-2xl md:text-4xl font-bold border-b-2 border-primary hover:text-primary transition-colors duration-200 pb-2"
            >
              hello@elysian.agency
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Social links & Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 border-t border-border/10 pt-12">
        <nav className="flex flex-wrap gap-8 items-center">
          {socials.map((social) => (
            <Magnetic key={social.name}>
              <a
                href={social.href}
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
              >
                {social.name}
              </a>
            </Magnetic>
          ))}
        </nav>
        
        <div className="flex flex-col gap-1 text-[10px] uppercase tracking-widest text-muted-foreground/60 font-mono">
          <div>&copy; 2026 Elysian Agency. All Rights Reserved.</div>
          <div className="md:text-right">Zurich &mdash; Tokyo &mdash; San Francisco</div>
        </div>
      </div>
    </footer>
  );
}
