"use client";

import React, { useState, useEffect } from "react";

export interface AgentIntentAction {
  id: string;
  label: string;
  shortcut: string;
  description: string;
}

interface LiquidCommandBarProps {
  placeholder?: string;
  actions?: AgentIntentAction[];
  onSubmitIntent: (intent: string) => void;
  agentStatus?: "idle" | "thinking" | "streaming-ui" | "awaiting-approval";
}

export function LiquidCommandBar({
  placeholder = "Describe an action, filter data, or generate a view...",
  actions = [],
  onSubmitIntent,
  agentStatus = "idle",
}: LiquidCommandBarProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSubmitIntent(query.trim());
    setQuery("");
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <div
        className="bg-surface-elevated border border-border-hairline text-ink-primary transition-transform duration-200"
        data-agent-status={agentStatus}
      >
        <form onSubmit={handleSubmit} className="flex items-center px-4 py-3 gap-3">
          <span
            className="inline-block h-2.5 w-2.5 shrink-0 bg-accent-primary"
            aria-hidden="true"
          />
          <input
            type="text"
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label="Agent Command Input"
            className="w-full bg-transparent font-sans text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-1 font-mono text-xs text-ink-muted border border-border-hairline">
            ⌘K
          </kbd>
          <button
            type="submit"
            disabled={!query.trim() || agentStatus === "thinking"}
            className="min-h-[36px] px-3 py-1.5 bg-accent-primary text-surface-canvas font-mono text-xs uppercase tracking-wider disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary transition-opacity"
          >
            {agentStatus === "thinking" ? "Running" : "Execute"}
          </button>
        </form>

        {open && actions.length > 0 && (
          <div className="border-t border-border-hairline px-2 py-2 space-y-1">
            {actions.map((act) => (
              <button
                key={act.id}
                type="button"
                onClick={() => {
                  onSubmitIntent(act.label);
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-left text-xs hover:bg-surface-canvas focus-visible:outline-2 focus-visible:outline-accent-primary transition-opacity"
              >
                <div>
                  <span className="font-sans font-medium text-ink-primary">
                    {act.label}
                  </span>
                  <span className="ml-2 text-ink-muted">{act.description}</span>
                </div>
                <kbd className="font-mono text-[11px] text-ink-muted">
                  {act.shortcut}
                </kbd>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
