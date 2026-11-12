"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export type StatusPhase = "loading" | "success" | "live-tracking" | "error";

interface DynamicStatusIslandToastProps {
  phase: StatusPhase;
  title: string;
  detail?: string;
  etaBadge?: string;
}

export function DynamicStatusIslandToast({
  phase,
  title,
  detail,
  etaBadge,
}: DynamicStatusIslandToastProps) {
  const islandRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!islandRef.current) return;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.fromTo(
        islandRef.current,
        { scale: prefersReduced ? 1 : 0.9, opacity: 0.6 },
        {
          scale: 1,
          opacity: 1,
          duration: prefersReduced ? 0.1 : 0.42,
          ease: "back.out(1.6)",
        }
      );
    },
    { dependencies: [phase, title] }
  );

  return (
    <div
      ref={islandRef}
      role="status"
      aria-live="polite"
      className="inline-flex items-center justify-between gap-4 bg-surface-elevated border border-border-hairline px-4 py-2.5 text-ink-primary will-change-transform"
    >
      <div className="flex items-center gap-3">
        <span
          className="inline-block h-2.5 w-2.5 shrink-0 bg-accent-primary"
          aria-hidden="true"
        />
        <div>
          <p className="font-sans text-xs sm:text-sm font-medium text-ink-primary">
            {title}
          </p>
          {detail && (
            <p className="font-mono text-[11px] text-ink-muted">{detail}</p>
          )}
        </div>
      </div>

      {etaBadge && (
        <span className="px-2.5 py-1 bg-surface-canvas border border-border-hairline font-mono text-xs font-semibold text-ink-primary tabular-nums">
          {etaBadge}
        </span>
      )}
    </div>
  );
}
