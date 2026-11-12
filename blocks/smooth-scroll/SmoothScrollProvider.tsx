"use client";
import React, { useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, useGSAP);
export interface SmoothScrollProviderProps {
  children: React.ReactNode;
  lerp?: number;
}
export function SmoothScrollProvider({ children, lerp = 0.085 }: SmoothScrollProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: false, lerp, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const updateTicker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();
    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, { scope: containerRef, dependencies: [lerp] });
  return <div ref={containerRef}>{children}</div>;
}
