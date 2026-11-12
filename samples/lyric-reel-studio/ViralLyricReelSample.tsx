"use client";
import React, { useState } from "react";
import { KineticLyricReelComposition } from "../../blocks/video-studio/KineticLyricReelComposition";
import { OpusClipCaptionStage } from "../../blocks/video-studio/OpusClipCaptionStage";
const SAMPLE_LYRICS = [
  {
    id: "line-1",
    startSec: 0,
    endSec: 2.4,
    words: [
      { text: "Zero", startSec: 0.0, endSec: 0.5, emphasis: true },
      { text: "generic", startSec: 0.5, endSec: 1.1 },
      { text: "templates", startSec: 1.1, endSec: 1.8 },
      { text: "tonight", startSec: 1.8, endSec: 2.4, emphasis: true },
    ],
  },
  {
    id: "line-2",
    startSec: 2.4,
    endSec: 5.0,
    words: [
      { text: "Every", startSec: 2.4, endSec: 2.9 },
      { text: "frame", startSec: 2.9, endSec: 3.5, emphasis: true },
      { text: "locked", startSec: 3.5, endSec: 4.1 },
      { text: "to", startSec: 4.1, endSec: 4.4 },
      { text: "the", startSec: 4.4, endSec: 4.6 },
      { text: "beat", startSec: 4.6, endSec: 5.0, emphasis: true },
    ],
  },
];
export function ViralLyricReelSample() {
  const [playheadSec, setPlayheadSec] = useState(1.95);
  return (
    <main className="min-h-screen bg-surface-canvas p-6 text-ink-primary">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border-hairline pb-4">
          <div>
            <p className="font-mono text-xs uppercase text-ink-muted">ARCHETYPE 11 // PROGRAMMATIC VIDEO & LYRIC STUDIO</p>
            <h1 className="font-display text-2xl font-bold">9:16 Kinetic Lyric Video & Viral Reel Timeline</h1>
          </div>
          <label className="flex items-center gap-3 font-mono text-xs tabular-nums">
            <span>SCRUB PLAYHEAD ({playheadSec.toFixed(2)}s)</span>
            <input type="range" min={0} max={5} step={0.05} value={playheadSec} onChange={(e) => setPlayheadSec(Number(e.target.value))} className="accent-accent-primary" />
          </label>
        </header>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <KineticLyricReelComposition title="CHROMATIC PULSE" artist="ATLAS STUDIO" bpm={128} aspectRatio="9:16" currentTimeSec={playheadSec} lines={SAMPLE_LYRICS} />
          <OpusClipCaptionStage clipTitle="HOW TO KILL AI SLOP IN 60S" viralityScore={98} currentTimeSec={playheadSec} tokens={SAMPLE_LYRICS.flatMap((l) => l.words.map((w) => ({ word: w.text, startSec: w.startSec, endSec: w.endSec, highlightColor: w.emphasis ? "accent" : "success" })))} />
        </div>
      </div>
    </main>
  );
}
