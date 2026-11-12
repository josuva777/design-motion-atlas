"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollPinnedHeroStageProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
  mediaUrl: string;
  mediaAlt: string;
  metrics?: { label: string; value: string }[];
}

export function ScrollPinnedHeroStage({
  eyebrow,
  headline,
  subheadline,
  mediaUrl,
  mediaAlt,
  metrics = [],
}: ScrollPinnedHeroStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: "+=140%",
            pin: true,
            scrub: 0.6,
          },
        });

        tl.fromTo(
          ".hero-media-frame",
          {
            clipPath: "inset(18% 14% 18% 14%)",
            scale: 0.92,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "power2.inOut",
          },
          0
        )
          .fromTo(
            ".hero-copy-layer",
            { yPercent: 0, opacity: 1 },
            { yPercent: -25, opacity: 0.15, ease: "power2.out" },
            0
          )
          .fromTo(
            ".hero-telemetry-card",
            { yPercent: 120, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              stagger: 0.08,
              ease: "expo.out",
            },
            0.25
          );
      });
    },
    { scope: stageRef }
  );

  return (
    <section
      ref={stageRef}
      className="relative min-h-screen w-full overflow-hidden bg-surface-canvas text-ink-primary flex flex-col justify-between p-6 md:p-12 border-b border-border-hairline"
    >
      <div className="hero-copy-layer relative z-20 max-w-4xl pt-8 will-change-transform">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-3">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.94] text-ink-primary">
          {headline}
        </h1>
        <p className="font-sans text-base sm:text-lg text-ink-secondary mt-4 max-w-[58ch]">
          {subheadline}
        </p>
      </div>

      <div className="hero-media-frame absolute inset-0 z-10 overflow-hidden will-change-transform">
        <img
          src={mediaUrl}
          alt={mediaAlt}
          className="h-full w-full object-cover"
        />
      </div>

      {metrics.length > 0 && (
        <div className="relative z-20 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="hero-telemetry-card bg-surface-elevated border border-border-hairline p-4 will-change-transform"
            >
              <span className="block font-mono text-[11px] uppercase text-ink-muted">
                {m.label}
              </span>
              <span className="mt-1 block font-mono text-xl sm:text-2xl font-semibold text-ink-primary tabular-nums">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
