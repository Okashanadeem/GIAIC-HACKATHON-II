'use client';

import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AuroraBackground } from './AuroraBackground';
import { FloatingChatButton } from './FloatingChatButton';

export interface PageLayoutProps {
  children: ReactNode;
  /**
   * Show ambient background animations (orbital aurora, calm orb)
   * Default: true
   */
  showAmbient?: boolean;
  /**
   * Additional class for main content area
   */
  className?: string;
}

/**
 * Unified Page Layout with Header, Footer, and Animations
 * Feature: 006-ui-theme-motion
 *
 * - Consistent header across all pages
 * - Ambient background animations (orbital aurora, calm orb)
 * - Sticky footer pattern
 * - Smooth page transitions via CSS
 */
export function PageLayout({
  children,
  showAmbient = true,
  className = '',
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background-base flex flex-col">
      {/* Aurora Background */}
      {showAmbient && <AuroraBackground />}

      {/* Header */}
      <Header />

      {/* Main content - flex-grow for sticky footer */}
      <main
        className={`
          relative z-10 flex-grow
          animate-fade-in motion-reduce:animate-none
          ${className}
        `.replace(/\s+/g, ' ').trim()}
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Chat Button - Only for authenticated users */}
      <FloatingChatButton />
    </div>
  );
}
