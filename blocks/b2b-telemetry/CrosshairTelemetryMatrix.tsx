"use client";

import React, { useState } from "react";

export interface TelemetryMetricNode {
  id: string;
  code: string;
  label: string;
  primaryValue: string;
  deltaPercent: string;
  isPositive?: boolean;
  series: number[];
}

interface CrosshairTelemetryMatrixProps {
  title?: string;
  nodes: TelemetryMetricNode[];
}

export function CrosshairTelemetryMatrix({
  title = "INSTITUTIONAL TELEMETRY MATRIX",
  nodes,
}: CrosshairTelemetryMatrixProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="w-full bg-surface-canvas text-ink-primary border-b border-border-hairline">
      <div className="px-6 py-4 border-b border-border-hairline flex items-center justify-between">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-muted">
          {title}
        </h2>
        <span className="font-mono text-xs text-ink-secondary tabular-nums">
          {hoveredIdx !== null ? `SYNC SLICE [T-${hoveredIdx}]` : "LIVE FEED"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-border-hairline">
        {nodes.map((node) => {
          const activeVal =
            hoveredIdx !== null && node.series[hoveredIdx] !== undefined
              ? node.series[hoveredIdx].toLocaleString()
              : node.primaryValue;

          return (
            <div
              key={node.id}
              className="md:col-span-4 p-6 bg-surface-canvas hover:bg-surface-elevated transition-colors flex flex-col justify-between space-y-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="block font-mono text-[11px] uppercase text-ink-muted">
                    {node.code}
                  </span>
                  <h3 className="font-sans text-sm font-medium text-ink-secondary mt-0.5">
                    {node.label}
                  </h3>
                </div>
                <span className="px-2 py-0.5 border border-border-hairline font-mono text-xs text-ink-primary tabular-nums">
                  {node.deltaPercent}
                </span>
              </div>

              <div className="font-mono text-3xl sm:text-4xl font-semibold text-ink-primary tracking-tight tabular-nums">
                {activeVal}
              </div>

              <div
                className="grid grid-cols-8 gap-1 items-end h-14 pt-2 border-t border-border-hairline"
                onPointerLeave={() => setHoveredIdx(null)}
              >
                {node.series.slice(0, 8).map((point, sIdx) => {
                  const maxVal = Math.max(...node.series, 1);
                  const heightPct = Math.max(15, Math.round((point / maxVal) * 100));
                  const isSynced = hoveredIdx === sIdx;

                  return (
                    <button
                      key={sIdx}
                      type="button"
                      onPointerEnter={() => setHoveredIdx(sIdx)}
                      onFocus={() => setHoveredIdx(sIdx)}
                      aria-label={`${node.label} slice ${sIdx}: ${point}`}
                      className="h-full flex items-end focus-visible:outline-1 focus-visible:outline-accent-primary"
                    >
                      <span
                        style={{ height: `${heightPct}%` }}
                        className={`w-full block transition-opacity ${
                          isSynced
                            ? "bg-accent-primary opacity-100"
                            : "bg-ink-muted opacity-40"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
