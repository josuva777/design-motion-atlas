"use client";
import React from "react";
export interface ReelCaptionToken { word: string; startSec: number; endSec: number; highlightColor?: "accent" | "success" | "warning"; }
export interface OpusClipCaptionStageProps { clipTitle: string; viralityScore?: number; currentTimeSec: number; tokens: ReelCaptionToken[]; wordsPerChunk?: number; }
export function OpusClipCaptionStage({ clipTitle, viralityScore = 96, currentTimeSec, tokens, wordsPerChunk = 4 }: OpusClipCaptionStageProps) {
  const chunks: ReelCaptionToken[][] = [];
  for (let i = 0; i < tokens.length; i += wordsPerChunk) chunks.push(tokens.slice(i, i + wordsPerChunk));
  const activeChunk = chunks.find((c) => currentTimeSec >= (c[0]?.startSec ?? 0) && currentTimeSec <= (c[c.length - 1]?.endSec ?? 0)) ?? chunks[0] ?? [];
  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[400px] overflow-hidden border border-border-hairline bg-surface-canvas text-ink-primary">
      <div className="flex items-center justify-between border-b border-border-hairline bg-surface-elevated px-4 py-3">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider">{clipTitle}</span>
        <span className="border border-border-hairline bg-status-success px-2 py-0.5 font-mono text-xs font-bold text-surface-canvas tabular-nums">HOOK {viralityScore}/100</span>
      </div>
      <div className="absolute bottom-24 left-4 right-4 flex flex-wrap items-center justify-center gap-2 border border-border-hairline bg-surface-elevated p-4">
        {activeChunk.map((t, idx) => {
          const active = currentTimeSec >= t.startSec && currentTimeSec <= t.endSec;
          return (
            <span key={`${t.word}-${idx}`} className={`px-2.5 py-1 font-display text-xl font-extrabold uppercase ${active ? "bg-accent-primary text-surface-canvas" : "text-ink-primary opacity-80"}`} style={{ transform: active ? "scale(1.09)" : "scale(1)" }}>
              {t.word}
            </span>
          );
        })}
      </div>
    </div>
  );
}
