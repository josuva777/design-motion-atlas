"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface ChoreographedSkeletonLoaderProps {
  isLoading: boolean;
  skeletonCount?: number;
  children: React.ReactNode;
}

export function ChoreographedSkeletonLoader({
  isLoading,
  skeletonCount = 3,
  children,
}: ChoreographedSkeletonLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (isLoading && !prefersReduced) {
        gsap.fromTo(
          ".skeleton-pulse-bar",
          { opacity: 0.35 },
          {
            opacity: 0.85,
            duration: 0.75,
            stagger: 0.1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );
      } else if (!isLoading) {
        gsap.fromTo(
          ".loaded-content-stage",
          {
            opacity: 0,
            y: prefersReduced ? 0 : 14,
          },
          {
            opacity: 1,
            y: 0,
            duration: prefersReduced ? 0.12 : 0.48,
            ease: "expo.out",
          }
        );
      }
    },
    { scope: containerRef, dependencies: [isLoading] }
  );

  return (
    <div ref={containerRef} className="w-full" aria-busy={isLoading}>
      {isLoading ? (
        <div className="space-y-3" role="status" aria-label="Loading content">
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <div
              key={idx}
              className="skeleton-pulse-bar bg-surface-elevated border border-border-hairline p-4 space-y-3 will-change-opacity"
            >
              <div className="h-4 w-2/5 bg-border-hairline" />
              <div className="h-3 w-4/5 bg-border-hairline" />
              <div className="h-3 w-3/5 bg-border-hairline" />
            </div>
          ))}
        </div>
      ) : (
        <div className="loaded-content-stage will-change-transform">
          {children}
        </div>
      )}
    </div>
  );
}
