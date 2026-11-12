"use client";

import React, { useState } from "react";

export interface DiffFieldChange {
  field: string;
  previousValue: string;
  proposedValue: string;
}

interface InlineDiffApprovalCardProps {
  actionTitle: string;
  agentName?: string;
  confidenceScore?: string;
  changes: DiffFieldChange[];
  onApprove: () => void;
  onReject: () => void;
}

export function InlineDiffApprovalCard({
  actionTitle,
  agentName = "ATLAS-AGENT",
  confidenceScore = "99.2%",
  changes,
  onApprove,
  onReject,
}: InlineDiffApprovalCardProps) {
  const [decision, setDecision] = useState<"pending" | "approved" | "rejected">(
    "pending"
  );

  const handleApprove = () => {
    setDecision("approved");
    onApprove();
  };

  const handleReject = () => {
    setDecision("rejected");
    onReject();
  };

  return (
    <div
      role="region"
      aria-label={`Approval gate for ${actionTitle}`}
      className="w-full max-w-xl bg-surface-elevated border border-border-hairline text-ink-primary p-5 space-y-4"
    >
      <div className="flex items-center justify-between border-b border-border-hairline pb-3">
        <div className="flex items-center gap-2.5">
          <span
            className="inline-block h-2 w-2 bg-accent-primary"
            aria-hidden="true"
          />
          <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            {agentName} • HUMAN-IN-THE-LOOP GATE
          </span>
        </div>
        <span className="font-mono text-xs text-ink-secondary tabular-nums">
          CONFIDENCE {confidenceScore}
        </span>
      </div>

      <div>
        <h3 className="font-display text-lg text-ink-primary">{actionTitle}</h3>
      </div>

      <div className="divide-y divide-border-hairline border border-border-hairline bg-surface-canvas">
        {changes.map((c, idx) => (
          <div key={idx} className="p-3 grid grid-cols-12 gap-2 items-center text-xs">
            <span className="col-span-4 font-mono text-ink-muted uppercase">
              {c.field}
            </span>
            <span className="col-span-4 font-mono text-ink-muted line-through tabular-nums">
              {c.previousValue}
            </span>
            <span className="col-span-4 font-mono font-semibold text-ink-primary tabular-nums">
              → {c.proposedValue}
            </span>
          </div>
        ))}
      </div>

      {decision === "pending" ? (
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleReject}
            className="min-h-[44px] px-4 py-2 border border-border-hairline font-mono text-xs uppercase tracking-wider text-ink-secondary hover:text-ink-primary focus-visible:outline-2 focus-visible:outline-accent-primary transition-opacity"
          >
            Reject [ESC]
          </button>
          <button
            type="button"
            onClick={handleApprove}
            className="min-h-[44px] px-5 py-2 bg-accent-primary text-surface-canvas font-mono text-xs uppercase tracking-wider font-semibold hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary transition-opacity"
          >
            Approve & Execute [↵]
          </button>
        </div>
      ) : (
        <div className="pt-2 font-mono text-xs uppercase tracking-wider text-ink-secondary">
          STATUS: {decision === "approved" ? "APPROVED & EXECUTED" : "CANCELLED BY USER"}
        </div>
      )}
    </div>
  );
}
