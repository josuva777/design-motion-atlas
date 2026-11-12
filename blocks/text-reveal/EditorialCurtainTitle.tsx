"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface EditorialCurtainTitleProps {
  lines: string[];
  className?: string;
  staggerMs?: number;
}

export function EditorialCurtainTitle({
  lines,
  className = "",
  staggerMs = 55,
}: EditorialCurtainTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".curtain-line-inner",
          {
            yPercent: 110,
            rotate: 1.25,
          },
          {
            yPercent: 0,
            rotate: 0,
            duration: 0.68,
            stagger: staggerMs / 1000,
            ease: "expo.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          ".curtain-line-inner",
          { opacity: 0 },
          { opacity: 1, duration: 0.15 }
        );
      });
    },
    { scope: containerRef, dependencies: [lines, staggerMs] }
  );

  return (
    <h1
      ref={containerRef}
      className={`font-display text-ink-primary tracking-tight leading-[0.95] ${className}`}
    >
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden py-[0.04em]">
          <span className="curtain-line-inner block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}
