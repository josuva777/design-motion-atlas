"use client";
import React, { useState } from "react";
import { TactileCartCounterPill } from "../../blocks/in-app-commerce/TactileCartCounterPill";
import { SpringBottomSheetModal } from "../../blocks/in-app-sheets/SpringBottomSheetModal";
import { DynamicStatusIslandToast } from "../../blocks/in-app-feedback/DynamicStatusIslandToast";
export function ZomatoFoodFlowSample() {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <main className="mx-auto min-h-screen max-w-md border-x border-border-hairline bg-surface-canvas p-5 text-ink-primary">
      <DynamicStatusIslandToast state="live" label="Rider arriving in 12 mins · 1.4 km away" />
      <section className="mt-6 border border-border-hairline bg-surface-elevated p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase text-status-success">BESTSELLER · 18 MINS</span>
            <h2 className="mt-1 font-display text-lg font-bold">Artisanal Truffle Wood-Fired Pizza</h2>
            <p className="mt-1 font-mono text-sm font-semibold tabular-nums">₹540</p>
          </div>
          <button type="button" onClick={() => setSheetOpen(true)} className="border border-border-hairline bg-surface-canvas px-3 py-1.5 font-mono text-xs uppercase active:scale-95">Customize</button>
        </div>
        <div className="mt-4">
          <TactileCartCounterPill itemName="Truffle Wood-Fired Pizza" unitPrice={540} currencySymbol="₹" />
        </div>
      </section>
      <SpringBottomSheetModal isOpen={sheetOpen} onClose={() => setSheetOpen(false)} title="Customize Crust & Toppings">
        <p className="font-sans text-sm text-ink-secondary">Select hand-stretched sourdough crust or aged parmesan glaze with 1:1 pointer-capture drag dismissal.</p>
      </SpringBottomSheetModal>
    </main>
  );
}
