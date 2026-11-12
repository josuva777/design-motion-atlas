# Archetype 11 — Kinetic Lyric, Reel & Programmatic Video Studio
## 1. Domain Vernacular & Materiality
Engineered for 9:16 social reels (TikTok, Instagram Reels, YouTube Shorts), 16:9 beat-synced music lyric videos, OpusClip/Lemo-style active-word caption stages, and deterministic product launch trailers rendered via HeyGen HyperFrames or Remotion. The surface emulates an OLED broadcast mastering monitor with SMPTE timecode precision, safe-zone guides, and frame-accurate word attack physics.
## 2. Color Palette (OKLCH Semantic Roles)
- **Surface Canvas**: `oklch(0.11 0.010 270)` (Broadcast Monitor Obsidian)
- **Surface Elevated**: `oklch(0.16 0.015 270)` (Timeline Track Slate)
- **Ink Primary**: `oklch(0.98 0.005 90)` (Studio Timecode White)
- **Ink Secondary**: `oklch(0.76 0.010 270)` (Track Metadata Silver)
- **Ink Muted**: `oklch(0.56 0.012 270)` (Inactive Lyric Cue)
- **Accent Primary**: `oklch(0.82 0.170 85)` (Active Word Cue Amber)
- **Border Hairline**: `oklch(0.25 0.015 270)` (1px Safe-Zone & Track Rule)
## 3. Typography & Scannable Hierarchy
- **Display Font**: `Syne` (700/800 weight, tight tracking `-0.03em` for kinetic word pills and emphasis hooks)
- **Sans Font**: `Plus Jakarta Sans` (UI controls, track headers, and caption editors)
- **Mono Font**: `JetBrains Mono` (`tabular-nums` mandatory on BPM counters, frame numbers, and SMPTE timecodes)
## 4. Layout & Spatial Architecture
- **Viewport Budget**: 9:16 vertical stage (`1080x1920` safe zone: top 18%, bottom 24%, sides 8%) or 16:9 widescreen canvas paired with a multi-track bottom timeline.
- **Border Radius**: `0px` to `2px` crisp broadcast cuts.
- **Whitespace Budget**: Minimum 30% open canvas around active lyric stanzas so word-level spring scaling never collides with adjacent lines.
## 5. Signature Visual Detail & Motion Physics
- **Frame-Deterministic Word Envelope**: Every word token computes its scale (`1.0 -> 1.16`), vertical lift (`-5px`), and pill contrast purely from `currentTimeSec` and `bpm` beat phase—zero non-deterministic CSS timers.
