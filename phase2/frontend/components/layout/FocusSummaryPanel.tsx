'use client';

import { ProgressBar } from '@/components/ui';
import type { TaskStats } from '@/hooks';

export interface FocusSummaryPanelProps {
  stats: TaskStats;
  className?: string;
}

/**
 * Focus Summary Panel – Task statistics with progress bar
 * Feature: 006-ui-theme-motion (FR-044, FR-045, FR-046, SC-013)
 *
 * - Displays: pending count, completed count, total count, completion percentage
 * - Includes progress bar reflecting completion percentage
 * - Calm motivational text with actual percentage
 * - Card-like styling with design system tokens
 */
export function FocusSummaryPanel({ stats, className = '' }: FocusSummaryPanelProps) {
  const { pending, completed, total, percentage } = stats;

  return (
    <div
      className={`
        glass-card-strong border border-border-glow rounded-xl
        p-5 shadow-lg shadow-aurora-purple/10
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {/* Title with gradient */}
      <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-aurora-purple to-aurora-pink bg-clip-text text-transparent">
        Today&apos;s Focus
      </h3>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-3 rounded-lg bg-white/5 border border-border-subtle hover:border-aurora-purple/50 transition-colors">
          <div className="text-2xl font-bold text-aurora-purple">
            {pending}
          </div>
          <div className="text-xs text-text-muted mt-1">Pending</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-white/5 border border-border-subtle hover:border-aurora-green/50 transition-colors">
          <div className="text-2xl font-bold text-aurora-green">
            {completed}
          </div>
          <div className="text-xs text-text-muted mt-1">Completed</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-white/5 border border-border-subtle hover:border-aurora-cyan/50 transition-colors">
          <div className="text-2xl font-bold text-aurora-cyan">
            {total}
          </div>
          <div className="text-xs text-text-muted mt-1">Total</div>
        </div>
      </div>

      {/* Progress bar */}
      <ProgressBar percentage={percentage} className="mb-3" />

      {/* Motivational text with percentage */}
      <p className="text-body-sm text-text-secondary text-center">
        {total === 0
          ? "Add your first task to get started."
          : `You're ${percentage}% through today's plan.`}
      </p>
    </div>
  );
}
