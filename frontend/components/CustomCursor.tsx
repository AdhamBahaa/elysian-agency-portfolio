"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useGSAP(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial sharp scale (0.333 of 96px = 32px circle)
    gsap.set(cursor, { scale: 0.333 });

    // quickTo is highly optimized for updating properties frequently like mouse positions
    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.4,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.4,
      ease: "power3.out",
    });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      // Position center of the cursor relative to mouse position
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // Global Hover Listeners for Morphing states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // 1. Text Inversion (Blend Mode difference) for headers and custom elements
      if (
        target.closest("h1") ||
        target.closest("h2") ||
        target.closest("h3") ||
        target.closest("[data-cursor='blend']")
      ) {
        gsap.to(cursor, {
          scale: 1, // 96px vector size (3x relative to default 32px)
          backgroundColor: "#f2f0e6", // Invert using light color with blend-mode difference
          mixBlendMode: "difference",
          duration: 0.3,
        });
      }

      // 2. Project Card Hover ("VIEW" state)
      const viewElement = target.closest("[data-cursor='view']") as HTMLElement;
      if (viewElement) {
        const text = viewElement.getAttribute("data-cursor-text") || "VIEW";
        setCursorText(text);
        gsap.to(cursor, {
          scale: 1.333, // 128px vector size (4x relative to default 32px)
          backgroundColor: "#d4af37", // Elegant gold accent
          mixBlendMode: "normal",
          color: "#0a0a0a",
          borderWidth: "0px",
          duration: 0.3,
        });
      }

      // 3. Small magnetic buttons/links hover
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='pointer']")
      ) {
        if (
          !viewElement &&
          !target.closest("h1") &&
          !target.closest("h2") &&
          !target.closest("h3")
        ) {
          const isButton = Boolean(target.closest("button"));
          gsap.to(cursor, {
            scale: 0.5, // 48px vector size (1.5x relative to default 32px)
            borderColor: isButton ? "#ffffff" : "#d4af37",
            backgroundColor: isButton ? "rgba(255, 255, 255, 0.2)" : "rgba(212, 175, 55, 0.1)",
            duration: 0.3,
          });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      // Reset back to normal circle (0.333 scale = 32px)
      setCursorText("");
      gsap.to(cursor, {
        scale: 0.333,
        backgroundColor: "transparent",
        borderColor: "rgba(242, 240, 230, 0.4)",
        mixBlendMode: "normal",
        borderWidth: "1px",
        duration: 0.3,
      });
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isVisible]);

  // Hide default cursor globally on pages
  useEffect(() => {
    document.documentElement.classList.add("cursor-none-active");
    return () => {
      document.documentElement.classList.remove("cursor-none-active");
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-24 h-24 rounded-full border border-[rgba(242,240,230,0.4)] pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform [backface-visibility:hidden] [transform-style:preserve-3d] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {cursorText && (
        <span className="text-[11px] font-bold tracking-widest text-[#0a0a0a] uppercase animate-fade-in">
          {cursorText}
        </span>
      )}
    </div>
  );
}
