'use client';

import { useId } from 'react';

export interface Tab {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

/**
 * Tab navigation component with smooth indicator transitions
 * Feature: 006-ui-theme-motion (FR-017)
 *
 * - Uses semantic color tokens
 * - Smooth tab indicator transition (150ms)
 * - Clear active/inactive state distinction
 * - Respects reduced motion
 */
export function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  const tablistId = useId();

  return (
    <div className={`border-b border-border-glow ${className}`}>
      <nav
        className="flex -mb-px space-x-2"
        role="tablist"
        aria-label="Task filters"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const tabId = `${tablistId}-tab-${tab.id}`;
          const panelId = `${tablistId}-panel-${tab.id}`;

          return (
            <button
              key={tab.id}
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              onClick={() => onChange(tab.id)}
              className={`
                px-5 py-2.5 text-sm font-semibold
                border-b-2 rounded-t-lg
                transition-all duration-fast
                motion-reduce:transition-none
                focus:outline-none focus:ring-2 focus:ring-aurora-purple focus:ring-inset
                relative
                ${
                  isActive
                    ? 'border-aurora-purple text-white bg-gradient-to-b from-white/10 to-transparent shadow-lg shadow-aurora-purple/20'
                    : 'border-transparent text-text-muted hover:text-white hover:border-border-glow hover:bg-white/5'
                }
              `.replace(/\s+/g, ' ').trim()}
            >
              {/* Glow effect on active tab */}
              {isActive && (
                <div className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-transparent via-aurora-purple to-transparent" />
              )}

              <span className="relative z-10">{tab.label}</span>

              {typeof tab.count === 'number' && (
                <span
                  className={`
                    ml-2 px-2 py-0.5 text-xs rounded-full font-medium
                    transition-colors duration-fast
                    motion-reduce:transition-none
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-aurora-purple to-aurora-pink text-white'
                        : 'bg-background-surface text-text-muted'
                    }
                  `.replace(/\s+/g, ' ').trim()}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
