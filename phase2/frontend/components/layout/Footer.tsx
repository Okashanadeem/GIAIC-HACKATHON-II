'use client';

/**
 * Footer – Authenticated footer with sticky behavior
 * Feature: 006-ui-theme-motion (FR-050, FR-051, FR-052, FR-053, FR-054, SC-016)
 *
 * - "Built with Spec-Driven Development" on left
 * - "Docs · GitHub · Contact" links on right (placeholder hrefs)
 * - Subtle top border
 * - STICKY FOOTER pattern: at viewport bottom when content short, after content when tall
 * - Must not overlap main content
 */
export function Footer() {
  return (
    <footer
      className={`
        w-full
        py-4 px-6
        border-t border-border-subtle
        bg-background-base/80 backdrop-blur-sm
        text-caption text-text-muted
      `.replace(/\s+/g, ' ').trim()}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Branding */}
        <span>© 2025 TaskFlow AI · Built with Spec-Driven Development</span>

        {/* Right: Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/panaversity/spec-kit-plus"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-secondary transition-colors duration-fast"
          >
            Spec-Kit Plus
          </a>
          <span className="text-border-subtle">·</span>
          <a
            href="https://platform.openai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-secondary transition-colors duration-fast"
          >
            Powered by OpenAI
          </a>
        </div>
      </div>
    </footer>
  );
}
