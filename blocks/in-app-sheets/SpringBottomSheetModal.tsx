"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface SpringBottomSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footerAction?: React.ReactNode;
}

export function SpringBottomSheetModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footerAction,
}: SpringBottomSheetModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useGSAP(
    () => {
      if (!isOpen || !sheetRef.current || !overlayRef.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: prefersReduced ? 0.1 : 0.28, ease: "power2.out" }
      );

      gsap.fromTo(
        sheetRef.current,
        { yPercent: prefersReduced ? 0 : 100, scale: prefersReduced ? 1 : 0.96, opacity: 0 },
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: prefersReduced ? 0.12 : 0.52,
          ease: "back.out(1.15)",
        }
      );
    },
    { dependencies: [isOpen] }
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startYRef.current === null || !sheetRef.current) return;
    const deltaY = Math.max(0, e.touches[0].clientY - startYRef.current);
    gsap.set(sheetRef.current, { y: deltaY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startYRef.current === null || !sheetRef.current) return;
    const deltaY = e.changedTouches[0].clientY - startYRef.current;
    startYRef.current = null;

    if (deltaY > 110) {
      gsap.to(sheetRef.current, {
        yPercent: 100,
        duration: 0.26,
        ease: "power3.in",
        onComplete: onClose,
      });
    } else {
      gsap.to(sheetRef.current, {
        y: 0,
        duration: 0.45,
        ease: "elastic.out(1, 0.55)",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-ink-primary/60 will-change-opacity"
        aria-hidden="true"
      />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative z-10 w-full sm:max-w-lg bg-surface-elevated border-t sm:border border-border-hairline text-ink-primary p-5 sm:p-6 will-change-transform max-h-[88vh] flex flex-col justify-between"
      >
        <div>
          <div className="mx-auto mb-4 h-1.5 w-12 bg-border-hairline sm:hidden" />
          <div className="flex items-start justify-between gap-4 border-b border-border-hairline pb-4">
            <div>
              <h2 className="font-display text-xl sm:text-2xl text-ink-primary">
                {title}
              </h2>
              {subtitle && (
                <p className="font-sans text-xs sm:text-sm text-ink-muted mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-border-hairline font-mono text-xs text-ink-muted hover:text-ink-primary focus-visible:outline-2 focus-visible:outline-accent-primary transition-opacity"
            >
              ESC
            </button>
          </div>

          <div className="py-4 overflow-y-auto max-h-[58vh]">{children}</div>
        </div>

        {footerAction && (
          <div className="pt-4 border-t border-border-hairline">{footerAction}</div>
        )}
      </div>
    </div>
  );
}
