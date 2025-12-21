'use client';

import type { TaskStats } from '@/hooks';

export interface ReflectionPanelProps {
  stats: TaskStats;
  className?: string;
}

/**
 * Reflection Panel – Context-aware motivational text
 * Feature: 006-ui-theme-motion (FR-047, FR-048, SC-014)
 *
 * - Displays title "Reflection"
 * - Motivational text based on simple rules (no AI):
 *   - 0 tasks: "A calm moment — you're all clear."
 *   - 0 completed: "Start with just one small task to build momentum."
 *   - <50%: "Nice start. Keep a steady pace."
 *   - >=50%: "Great progress. Protect your focus and finish strong."
 */

function getReflectionText(stats: TaskStats): string {
  const { total, completed, percentage } = stats;

  if (total === 0) {
    return "A calm moment — you're all clear.";
  }

  if (completed === 0) {
    return "Start with just one small task to build momentum.";
  }

  if (percentage < 50) {
    return "Nice start. Keep a steady pace.";
  }

  return "Great progress. Protect your focus and finish strong.";
}

export function ReflectionPanel({ stats, className = '' }: ReflectionPanelProps) {
  const reflectionText = getReflectionText(stats);

  return (
    <div
      className={`
        glass-card border border-border-glow rounded-xl
        p-5 shadow-lg shadow-aurora-cyan/10
        relative overflow-hidden
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {/* Subtle gradient accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-aurora-cyan/10 rounded-full blur-2xl" />

      {/* Title with gradient */}
      <h3 className="text-lg font-bold mb-3 bg-gradient-to-r from-aurora-cyan to-aurora-blue bg-clip-text text-transparent relative z-10">
        Reflection
      </h3>

      {/* Motivational text */}
      <p className="text-sm text-text-secondary leading-relaxed relative z-10">
        {reflectionText}
      </p>
    </div>
  );
}
