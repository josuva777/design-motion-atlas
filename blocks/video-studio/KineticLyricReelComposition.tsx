"use client";
import React from "react";
export interface LyricWordToken { text: string; startSec: number; endSec: number; emphasis?: boolean; }
export interface LyricLineEntry { id: string; startSec: number; endSec: number; words: LyricWordToken[]; }
export interface KineticLyricReelCompositionProps {
  title: string;
  artist: string;
  bpm?: number;
  aspectRatio?: "9:16" | "16:9" | "1:1";
  currentTimeSec: number;
  lines: LyricLineEntry[];
}
export function KineticLyricReelComposition({
  title,
  artist,
  bpm = 124,
  aspectRatio = "9:16",
  currentTimeSec,
  lines,
}: KineticLyricReelCompositionProps) {
  const beatSec = 60 / Math.max(1, bpm);
  const beatPhase = (currentTimeSec % beatSec) / beatSec;
  const beatPulse = Math.exp(-beatPhase * 6) * 0.022;
  const beatNumber = Math.floor(currentTimeSec / beatSec) + 1;
  const activeIdx = lines.findIndex((l) => currentTimeSec >= l.startSec && currentTimeSec <= l.endSec);
  const centerIdx = activeIdx !== -1 ? activeIdx : Math.max(0, lines.findIndex((l) => l.startSec > currentTimeSec) - 1);
  const windowLines = lines.slice(Math.max(0, centerIdx - 1), Math.min(lines.length, centerIdx + 3));
  const ratioClass = aspectRatio === "9:16" ? "aspect-[9/16] max-w-[420px]" : aspectRatio === "1:1" ? "aspect-square max-w-[560px]" : "aspect-video max-w-[820px]";
  return (
    <section aria-label={`Lyric video stage for ${title}`} className={`relative mx-auto w-full overflow-hidden border border-border-hairline bg-surface-canvas text-ink-primary ${ratioClass}`}>
      <header className="flex items-center justify-between border-b border-border-hairline bg-surface-elevated px-5 py-3.5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">{artist} // {aspectRatio}</p>
          <h2 className="font-display text-base font-semibold text-ink-primary">{title}</h2>
        </div>
        <div className="text-right font-mono text-xs text-ink-secondary tabular-nums">
          <div>{bpm} BPM · BEAT {String(beatNumber).padStart(3, "0")}</div>
          <div className="text-ink-muted">{currentTimeSec.toFixed(2)}s</div>
        </div>
      </header>
      <div className="flex h-[calc(100%-116px)] flex-col justify-center px-7 py-8" style={{ transform: `scale(${(1 + beatPulse).toFixed(4)})` }}>
        <div className="space-y-6">
          {windowLines.map((line) => {
            const isCurrent = currentTimeSec >= line.startSec && currentTimeSec <= line.endSec;
            const isPast = currentTimeSec > line.endSec;
            return (
              <div key={line.id} className="flex flex-wrap items-baseline gap-x-2.5 gap-y-2" style={{ opacity: isCurrent ? 1 : isPast ? 0.35 : 0.22 }}>
                {line.words.map((w, wi) => {
                  const dur = Math.max(0.08, w.endSec - w.startSec);
                  const prog = Math.max(0, Math.min(1, (currentTimeSec - w.startSec) / dur));
                  const singing = currentTimeSec >= w.startSec && currentTimeSec <= w.endSec;
                  const env = singing ? Math.sin(prog * Math.PI) : 0;
                  const scale = singing ? 1 + (w.emphasis ? 0.16 : 0.08) * env : 1;
                  const liftY = singing ? -5 * env : 0;
                  return (
                    <span
                      key={`${line.id}-${wi}`}
                      className={`inline-block px-1.5 py-0.5 font-display text-2xl font-bold tracking-tight sm:text-3xl ${singing ? (w.emphasis ? "bg-accent-primary text-surface-canvas" : "border border-border-hairline bg-surface-elevated text-accent-primary") : "text-ink-primary"}`}
                      style={{ transform: `translate3d(0, ${liftY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})` }}
                    >
                      {w.text}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <footer className="absolute bottom-0 left-0 right-0 border-t border-border-hairline bg-surface-elevated px-5 py-3">
        <div className="flex h-6 items-end justify-between gap-1">
          {Array.from({ length: 28 }).map((_, i) => {
            const h = 25 + Math.abs(Math.sin(currentTimeSec * 7.5 + i * 0.45) * Math.cos(i * 0.3)) * 75;
            return <span key={i} className="flex-1 bg-accent-primary" style={{ height: `${h.toFixed(1)}%`, opacity: i % 4 === 0 ? 0.95 : 0.45 }} />;
          })}
        </div>
      </footer>
    </section>
  );
}
