#!/usr/bin/env node
// tests/run-scanner-tests.mjs — Automated Regression Test Suite for Design Motion Atlas v4.0
import assert from "node:assert/strict";
import { scanContent, SLOP_RULES } from "../scripts/detect-slop.mjs";

const SYNTHETIC_SLOP_FIXTURE = `
import { Inter } from "next/font/google";
import LocomotiveScroll from "locomotive-scroll";

export function SlopShowcase() {
  useEffect(() => {
    gsap.to(".box", { top: 100, width: 300 });
  }, []);

  return (
    <div className="font-['Inter'] bg-fuchsia-500 text-purple-200 transition-all backdrop-blur shadow-xl rounded-2xl">
      <span>FAST · SECURE · SCALABLE</span>
      <h1 className="text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text">
        Lorem ipsum dolor sit amet
      </h1>
      <div>
        <span className="bg-red-500" /><span className="bg-yellow-500" /><span className="bg-green-500" />
      </div>
      <div><span>01</span><p>One</p><span>02</span><p>Two</p><span>03</span><p>Three</p></div>
      <p style={{ color: "#D97757", backgroundColor: "#F5F2EB" }}>Hardcoded Hex & Cream+Terracotta</p>
      <div className="bg-[#ff0055]">Loading...</div>
    </div>
  );
}
`;

const hits = scanContent(SYNTHETIC_SLOP_FIXTURE, "SlopShowcase.tsx");
const triggeredRuleIds = new Set(hits.map((h) => h.id));

console.log(`\n[TEST SUITE] Running regression tests across ${SLOP_RULES.length} Anti-Slop rules...`);

for (const rule of SLOP_RULES) {
  assert.ok(
    triggeredRuleIds.has(rule.id),
    `[TEST FAILURE] Rule ${rule.id} failed to trigger on synthetic slop fixture!`
  );
  console.log(`  ✓ ${rule.id} caught violation(s) accurately`);
}

console.log(`\n[TEST SUITE PASSED] All ${SLOP_RULES.length}/15 Anti-Slop rules verified (${hits.length} total violations caught in single fixture).`);
