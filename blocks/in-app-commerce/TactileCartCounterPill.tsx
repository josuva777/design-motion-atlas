"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface TactileCartCounterPillProps {
  itemName: string;
  unitPrice: number;
  currencySymbol?: string;
  onQuantityChange?: (newQty: number) => void;
  onViewCart?: () => void;
}

export function TactileCartCounterPill({
  itemName,
  unitPrice,
  currencySymbol = "₹",
  onQuantityChange,
  onViewCart,
}: TactileCartCounterPillProps) {
  const [qty, setQty] = useState(0);
  const pillRef = useRef<HTMLDivElement>(null);
  const qtyTextRef = useRef<HTMLSpanElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const updateQuantity = (delta: number) => {
    const next = Math.max(0, qty + delta);
    setQty(next);
    onQuantityChange?.(next);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReduced && qtyTextRef.current) {
      gsap.fromTo(
        qtyTextRef.current,
        { yPercent: delta > 0 ? 90 : -90, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.24, ease: "back.out(2)" }
      );
    }

    if (!prefersReduced && pillRef.current) {
      gsap.fromTo(
        pillRef.current,
        { scale: 0.93 },
        { scale: 1, duration: 0.32, ease: "elastic.out(1.1, 0.5)" }
      );
    }
  };

  useGSAP(
    () => {
      if (!bottomBarRef.current || qty === 0) return;
      gsap.fromTo(
        bottomBarRef.current,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.42, ease: "expo.out" }
      );
    },
    { dependencies: [qty > 0] }
  );

  return (
    <>
      <div ref={pillRef} className="inline-flex items-center will-change-transform">
        {qty === 0 ? (
          <button
            type="button"
            onClick={() => updateQuantity(1)}
            className="min-h-[44px] min-w-[104px] px-4 py-2 bg-surface-elevated border border-accent-primary text-accent-primary font-mono text-xs font-semibold uppercase tracking-wider hover:bg-accent-primary hover:text-surface-canvas focus-visible:outline-2 focus-visible:outline-accent-primary transition-colors"
          >
            ADD +
          </button>
        ) : (
          <div className="min-h-[44px] min-w-[104px] inline-flex items-center justify-between bg-accent-primary text-surface-canvas px-2 border border-accent-primary">
            <button
              type="button"
              onClick={() => updateQuantity(-1)}
              aria-label={`Decrease quantity of ${itemName}`}
              className="min-h-[36px] min-w-[32px] font-mono text-base font-bold flex items-center justify-center"
            >
              −
            </button>
            <span className="overflow-hidden px-2">
              <span
                ref={qtyTextRef}
                className="block font-mono text-sm font-bold tabular-nums will-change-transform"
              >
                {qty}
              </span>
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(1)}
              aria-label={`Increase quantity of ${itemName}`}
              className="min-h-[36px] min-w-[32px] font-mono text-base font-bold flex items-center justify-center"
            >
              +
            </button>
          </div>
        )}
      </div>

      {qty > 0 && (
        <div
          ref={bottomBarRef}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4 will-change-transform"
        >
          <button
            type="button"
            onClick={onViewCart}
            className="w-full min-h-[54px] bg-accent-primary text-surface-canvas px-5 py-3 flex items-center justify-between border border-border-hairline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
          >
            <div className="text-left">
              <span className="block font-mono text-[11px] uppercase tracking-wider opacity-85 tabular-nums">
                {qty} {qty === 1 ? "ITEM" : "ITEMS"} ADDED
              </span>
              <span className="block font-sans text-sm font-semibold tabular-nums">
                {currencySymbol}
                {(qty * unitPrice).toLocaleString()} plus taxes
              </span>
            </div>
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">
              View Cart →
            </span>
          </button>
        </div>
      )}
    </>
  );
}
