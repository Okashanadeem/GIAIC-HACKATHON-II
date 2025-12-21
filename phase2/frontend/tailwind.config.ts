import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS Configuration with Design System Tokens
 * Feature: 006-ui-theme-motion
 *
 * Design tokens for the calm, premium dark theme:
 * - Colors: Semantic naming for backgrounds, text, accents, borders
 * - Spacing: Consistent scale (xs through 2xl)
 * - Border Radius: sm (4px), md (8px), lg (12px), xl (16px)
 * - Typography: Heading and body scales
 * - Animation: Fast (150ms), normal (200ms), slow (300ms)
 */

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /**
       * Semantic Color Tokens
       * Organized by purpose for easy maintenance and consistency
       */
      colors: {
        // Legacy primary colors (kept for backwards compatibility)
        primary: {
          DEFAULT: '#a855f7',
          hover: '#9333ea',
        },

        // Aurora Gradient Theme - Background colors
        background: {
          base: '#0a0118',      // Deep purple-black - cosmic backdrop
          elevated: '#120524', // Dark purple - cards, modals, elevated surfaces
          surface: '#1a0b2e',   // Medium purple - inputs, hover states
        },

        // Text colors - Enhanced contrast for readability
        text: {
          primary: '#ffffff',   // Pure white - headings, important text
          secondary: '#e0d5ff', // Light lavender - body text
          muted: '#9575cd',     // Muted purple - placeholders, hints
        },

        // Aurora Gradient Accents - Vibrant multi-color palette
        accent: {
          primary: '#a855f7',   // Purple - primary actions
          secondary: '#ec4899', // Pink - secondary actions
          tertiary: '#06b6d4',  // Cyan - tertiary actions
          hover: '#c084fc',     // Light purple - hover states
          success: '#10b981',   // Emerald - success states
          warning: '#f59e0b',   // Amber - warning states
          error: '#ef4444',     // Red - error states
        },

        // Aurora specific colors
        aurora: {
          purple: '#a855f7',
          pink: '#ec4899',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          green: '#10b981',
          violet: '#8b5cf6',
          fuchsia: '#d946ef',
        },

        // Border colors - Subtle with glow potential
        border: {
          subtle: '#2d1b4e',    // Dark purple border
          visible: '#4c2f7a',   // Medium purple border
          glow: 'rgba(168, 85, 247, 0.3)', // Purple glow
        },

        // Glassmorphism support
        glass: {
          light: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.05)',
          dark: 'rgba(10, 1, 24, 0.7)',
        },
      },

      /**
       * Border Radius Tokens
       * Consistent roundness across the UI
       */
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },

      /**
       * Spacing Tokens
       * Tailwind default scale is sufficient, but we document our semantic usage:
       * - xs: 4px (p-1, gap-1)
       * - sm: 8px (p-2, gap-2)
       * - md: 16px (p-4, gap-4)
       * - lg: 24px (p-6, gap-6)
       * - xl: 32px (p-8, gap-8)
       * - 2xl: 48px (p-12, gap-12)
       */

      /**
       * Animation Duration Tokens
       * For consistent micro-interactions
       */
      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
      },

      /**
       * Animation Keyframes
       * Aurora Gradient Theme - Enhanced animations with glow effects
       */
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'scale-out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-out-left': {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-20px)' },
        },
        'slide-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        // Aurora Gradient Animations
        'gradient-shift': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        'aurora-flow': {
          '0%': {
            'background-position': '0% 0%',
          },
          '50%': {
            'background-position': '100% 100%',
          },
          '100%': {
            'background-position': '0% 0%',
          },
        },
        'glow-pulse': {
          '0%, 100%': {
            opacity: '0.5',
            filter: 'blur(20px)',
          },
          '50%': {
            opacity: '0.8',
            filter: 'blur(30px)',
          },
        },
        'shimmer': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },

      /**
       * Animation Classes
       * Aurora Gradient Theme - Enhanced with new effects
       */
      animation: {
        'spin-slow': 'spin 1s linear infinite',
        'fade-in': 'fade-in 200ms ease-out',
        'fade-out': 'fade-out 200ms ease-out',
        'scale-in': 'scale-in 200ms ease-out',
        'scale-out': 'scale-out 200ms ease-out',
        'slide-in-right': 'slide-in-right 200ms ease-out',
        'slide-out-left': 'slide-out-left 200ms ease-out',
        'slide-in-down': 'slide-in-down 200ms ease-out',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        // Aurora animations
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'aurora-flow': 'aurora-flow 15s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },

      /**
       * Background Size for Gradient Animations
       */
      backgroundSize: {
        'gradient-animate': '200% 200%',
        'gradient-large': '400% 400%',
      },

      /**
       * Typography - Font Size Scale
       * Using Tailwind defaults with semantic aliases:
       * - heading-lg: text-2xl (24px/32px)
       * - heading-md: text-xl (20px/28px)
       * - body: text-base (16px/24px)
       * - body-sm: text-sm (14px/20px)
       * - caption: text-xs (12px/16px)
       */
      fontSize: {
        'heading-lg': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'heading-md': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};

export default config;
