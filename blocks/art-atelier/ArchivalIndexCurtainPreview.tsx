"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export interface ArchivalWorkItem {
  id: string;
  indexCode: string;
  title: string;
  discipline: string;
  year: string;
  imageUrl: string;
}

interface ArchivalIndexCurtainPreviewProps {
  heading?: string;
  items: ArchivalWorkItem[];
  onSelectWork?: (item: ArchivalWorkItem) => void;
}

export function ArchivalIndexCurtainPreview({
  heading = "SELECTED MONOGRAPH INDEX",
  items,
  onSelectWork,
}: ArchivalIndexCurtainPreviewProps) {
  const [activeItem, setActiveItem] = useState<ArchivalWorkItem | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!previewRef.current) return;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (activeItem && !prefersReduced) {
        gsap.fromTo(
          previewRef.current,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            scale: 0.94,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 0.48,
            ease: "expo.out",
          }
        );
      }
    },
    { dependencies: [activeItem?.id] }
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!previewRef.current || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    gsap.to(previewRef.current, {
      x: relX + 28,
      y: relY - 90,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={stageRef}
      onPointerMove={handlePointerMove}
      className="relative w-full bg-surface-canvas text-ink-primary py-12 px-6 md:px-12 border-b border-border-hairline"
    >
      <div className="mb-8 flex items-center justify-between border-b border-border-hairline pb-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-muted">
          {heading}
        </h2>
        <span className="font-mono text-xs text-ink-muted tabular-nums">
          [{items.length} WORKS]
        </span>
      </div>

      <div className="divide-y divide-border-hairline">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onPointerEnter={() => setActiveItem(item)}
            onPointerLeave={() => setActiveItem(null)}
            onFocus={() => setActiveItem(item)}
            onBlur={() => setActiveItem(null)}
            onClick={() => onSelectWork?.(item)}
            className="w-full min-h-[68px] py-5 px-2 grid grid-cols-12 items-center text-left hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-accent-primary transition-colors"
          >
            <span className="col-span-2 sm:col-span-1 font-mono text-xs text-ink-muted tabular-nums">
              {item.indexCode}
            </span>
            <span className="col-span-6 sm:col-span-7 font-display text-xl sm:text-3xl text-ink-primary tracking-tight">
              {item.title}
            </span>
            <span className="col-span-2 sm:col-span-3 font-sans text-xs sm:text-sm text-ink-secondary">
              {item.discipline}
            </span>
            <span className="col-span-2 sm:col-span-1 text-right font-mono text-xs text-ink-muted tabular-nums">
              {item.year}
            </span>
          </button>
        ))}
      </div>

      {activeItem && (
        <div
          ref={previewRef}
          className="pointer-events-none hidden md:block fixed top-0 left-0 z-30 w-72 h-96 bg-surface-elevated border border-border-hairline overflow-hidden will-change-transform"
          aria-hidden="true"
        >
          <img
            src={activeItem.imageUrl}
            alt={activeItem.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </section>
  );
}
