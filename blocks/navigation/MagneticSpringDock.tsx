"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
export interface DockItem { id: string; label: string; href: string; badge?: string; }
export interface MagneticSpringDockProps { items: DockItem[]; maxScale?: number; }
export function MagneticSpringDock({ items, maxScale = 1.38 }: MagneticSpringDockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const { contextSafe } = useGSAP({ scope: dockRef });
  const onMove = contextSafe((e: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    itemRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < 140) {
        const inf = Math.cos((dist / 140) * (Math.PI / 2));
        gsap.to(el, { scale: 1 + (maxScale - 1) * inf, x: dx * 0.14 * inf, y: -6 * inf, duration: 0.22, ease: "power3.out", overwrite: "auto" });
      } else {
        gsap.to(el, { scale: 1, x: 0, y: 0, duration: 0.35, ease: "expo.out", overwrite: "auto" });
      }
    });
  });
  const onLeave = contextSafe(() => {
    itemRefs.current.forEach((el) => {
      if (el) gsap.to(el, { scale: 1, x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, 0.65)", overwrite: "auto" });
    });
  });
  return (
    <nav aria-label="Magnetic dock" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div ref={dockRef} onPointerMove={onMove} onPointerLeave={onLeave} className="flex items-center gap-2 border border-border-hairline bg-surface-elevated px-3 py-2">
        {items.map((item, i) => (
          <a
            key={item.id}
            ref={(el) => { itemRefs.current[i] = el; }}
            href={item.href}
            onClick={() => setActiveId(item.id)}
            style={{ touchAction: "manipulation" }}
            className={`flex min-h-[44px] min-w-[44px] items-center px-3.5 py-2 font-sans text-sm font-medium transition-transform duration-100 ease-out active:scale-95 ${activeId === item.id ? "bg-accent-primary text-surface-canvas" : "bg-surface-canvas text-ink-primary"}`}
          >
            <span>{item.label}</span>
            {item.badge ? <span className="ml-2 font-mono text-[11px] tabular-nums opacity-80">{item.badge}</span> : null}
          </a>
        ))}
      </div>
    </nav>
  );
}
