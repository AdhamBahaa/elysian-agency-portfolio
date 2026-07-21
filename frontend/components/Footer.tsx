"use client";

import Magnetic from "./Magnetic";
import ContactForm from "./ContactForm";

export default function Footer() {
  const socials = [
    { name: "Instagram", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "Dribbble", href: "#" },
  ];

  return (
    <footer id="contact" className="bg-background text-foreground py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-border/20 flex flex-col gap-20">
      {/* Grid Layout: CTA Info on Left, Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Call to Action Left Side */}
        <div className="lg:col-span-5 flex flex-col gap-8 items-start lg:sticky lg:top-32">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">
            Get in Touch
          </span>
          
          <h2 className="font-syne text-4xl sm:text-5xl lg:text-5xl font-extrabold uppercase leading-none tracking-tight">
            Let's Build Something<br/>
            <span className="italic font-serif lowercase text-primary">remarkable</span> together.
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
            Whether you have a specific RFP or just want to explore creative possibilities, our team is ready to collaborate.
          </p>

          {/* Large Magnetic Email */}
          <div className="mt-4">
            <Magnetic>
              <a
                href="mailto:hello@elysian.agency"
                className="font-syne text-xl sm:text-2xl font-bold border-b-2 border-primary hover:text-primary transition-colors duration-200 pb-1"
              >
                hello@elysian.agency
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Interactive Contact Form Right Side */}
        <div className="lg:col-span-7">
          <ContactForm />
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
