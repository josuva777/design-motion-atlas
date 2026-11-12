"use client";
import React from "react";
export type A2UINodeType = "Card" | "Row" | "Column" | "Metric" | "ActionButton";
export interface A2UINode { id: string; type: A2UINodeType; label?: string; value?: string; delta?: string; actionId?: string; childrenIds?: string[]; }
export interface A2UISurfaceRendererProps { surfaceId: string; rootId: string; nodes: A2UINode[]; onAction: (actionId: string, surfaceId: string) => void; }
export function A2UISurfaceRenderer({ surfaceId, rootId, nodes, onAction }: A2UISurfaceRendererProps) {
  const map = new Map(nodes.map((n) => [n.id, n]));
  function render(id: string): React.ReactNode {
    const n = map.get(id);
    if (!n) return null;
    const ch = (n.childrenIds ?? []).map(render);
    if (n.type === "Card") return <section key={n.id} data-a2ui-surface={surfaceId} className="border border-border-hairline bg-surface-elevated p-5 text-ink-primary">{n.label ? <header className="mb-3 border-b border-border-hairline pb-2 font-mono text-xs uppercase text-ink-secondary">{n.label}</header> : null}<div className="space-y-3">{ch}</div></section>;
    if (n.type === "Row") return <div key={n.id} className="flex flex-wrap items-center gap-4">{ch}</div>;
    if (n.type === "Column") return <div key={n.id} className="flex flex-col gap-3">{ch}</div>;
    if (n.type === "Metric") return <div key={n.id} className="flex-1 border border-border-hairline bg-surface-canvas p-3.5"><div className="font-mono text-xs text-ink-muted">{n.label}</div><div className="mt-1 font-mono text-xl font-semibold tabular-nums">{n.value}</div>{n.delta ? <div className="mt-0.5 font-mono text-xs text-status-success tabular-nums">{n.delta}</div> : null}</div>;
    if (n.type === "ActionButton") return <button key={n.id} type="button" onClick={() => n.actionId && onAction(n.actionId, surfaceId)} className="min-h-[44px] border border-border-hairline bg-accent-primary px-4 py-2 font-mono text-xs font-semibold uppercase text-surface-canvas active:scale-95">{n.label ?? "Execute"}</button>;
    return null;
  }
  return <div className="w-full">{render(rootId)}</div>;
}
