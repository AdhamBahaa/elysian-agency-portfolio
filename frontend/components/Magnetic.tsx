"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Magnetic({
  children,
}: {
  children: React.ReactElement;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const xTo = gsap.quickTo(element, "x", {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
      const yTo = gsap.quickTo(element, "y", {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = element.getBoundingClientRect();

        // Calculate center of element
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Distance from center
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Apply magnetic pull (limit movement to max 15px)
        xTo(distanceX * 0.35);
        yTo(distanceY * 0.35);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: ref },
  );

  // Return children cloned with our magnetic ref container
  return (
    <div ref={ref} className="inline-block">
      {children}
    </div>
  );
}
