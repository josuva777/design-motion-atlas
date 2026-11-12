"use client";

import React, { useEffect, useRef } from "react";

interface InteractiveShaderHeroCanvasProps {
  title: string;
  subtitle: string;
  badgeText?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 outColor;
uniform float u_time;
uniform vec2 u_pointer;
uniform vec2 u_resolution;

void main() {
  vec2 uv = v_uv;
  vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
  vec2 p = (uv - 0.5) * aspect;
  vec2 m = (u_pointer - 0.5) * aspect;

  float dist = length(p - m);
  float ripple = sin(dist * 18.0 - u_time * 2.2) * exp(-dist * 3.5);
  float wave = sin(p.x * 4.5 + u_time * 0.7) * cos(p.y * 4.0 - u_time * 0.5);
  float field = smoothstep(-0.6, 0.8, wave + ripple * 0.65);

  vec3 baseDark = vec3(0.06, 0.07, 0.10);
  vec3 midTone  = vec3(0.12, 0.16, 0.24);
  vec3 signal   = vec3(0.82, 0.58, 0.24);

  vec3 col = mix(baseDark, midTone, field);
  col = mix(col, signal, smoothstep(0.28, 0.0, dist) * 0.35);

  outColor = vec4(col, 1.0);
}
`;

export function InteractiveShaderHeroCanvas({
  title,
  subtitle,
  badgeText = "WEBGL 2 REALTIME SURFACE",
  ctaLabel = "Explore Architecture",
  onCtaClick,
}: InteractiveShaderHeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const ptrLoc = gl.getUniformLocation(program, "u_pointer");
    const resLoc = gl.getUniformLocation(program, "u_resolution");

    let rafId = 0;
    let isVisible = true;
    const startTime = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const render = (now: number) => {
      if (isVisible) {
        const elapsed = (now - startTime) * 0.001;
        gl.uniform1f(timeLoc, elapsed);
        gl.uniform2f(ptrLoc, pointerRef.current.x, pointerRef.current.y);
        gl.uniform2f(resLoc, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: (e.clientX - rect.left) / Math.max(rect.width, 1),
      y: 1.0 - (e.clientY - rect.top) / Math.max(rect.height, 1),
    };
  };

  return (
    <section
      onPointerMove={handlePointerMove}
      className="relative min-h-[88vh] w-full overflow-hidden bg-surface-canvas text-ink-primary border-b border-border-hairline flex items-end p-6 md:p-14"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl space-y-5">
        <span className="inline-block px-3 py-1 bg-surface-elevated border border-border-hairline font-mono text-xs uppercase tracking-widest text-ink-secondary">
          {badgeText}
        </span>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.94] text-ink-primary">
          {title}
        </h1>
        <p className="font-sans text-base sm:text-lg text-ink-secondary max-w-[60ch]">
          {subtitle}
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={onCtaClick}
            className="min-h-[44px] px-6 py-3 bg-accent-primary text-surface-canvas font-mono text-xs uppercase tracking-wider font-semibold hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary transition-opacity"
          >
            {ctaLabel} →
          </button>
        </div>
      </div>
    </section>
  );
}
