"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Magnetic from "./Magnetic";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Works", href: "#works" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference">
      {/* Brand Logo */}
      <Link href="/" className="font-syne font-extrabold text-2xl tracking-widest text-foreground hover:scale-105 transition-transform duration-200">
        ELYSIAN.
      </Link>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <Magnetic key={link.label}>
            <Link
              href={link.href}
              className="font-sans text-sm uppercase tracking-widest text-foreground/80 hover:text-primary transition-colors duration-200 py-2 px-4"
            >
              {link.label}
            </Link>
          </Magnetic>
        ))}
      </nav>

      {/* Mobile Drawer Navigation (Shadcn Sheet) */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="p-2 text-foreground hover:text-primary focus:outline-none cursor-pointer" aria-label="Toggle menu">
            <Menu size={24} />
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background border-l border-border/20 flex flex-col justify-between py-12 px-8">
            <div className="flex flex-col gap-10 mt-12">
              <div className="text-xs uppercase tracking-widest text-muted-foreground border-b border-border/20 pb-4">
                Navigation
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-syne text-3xl font-semibold text-foreground/90 hover:text-primary transition-colors duration-200"
                    style={{
                      animation: `fadeIn 0.5s ease forwards ${idx * 0.1}s`,
                      opacity: 0,
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="flex flex-col gap-4 text-xs tracking-widest text-muted-foreground border-t border-border/20 pt-6">
              <div>Based in Zurich, Switzerland</div>
              <div>hello@elysian.agency</div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
