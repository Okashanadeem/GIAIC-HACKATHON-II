'use client';

/**
 * Aurora Background - Vibrant multi-layer gradient background
 * Premium visual effect for the Aurora Gradient theme
 *
 * Features:
 * - Multiple layered gradients for depth
 * - Vibrant colors with perfect text contrast
 * - Dynamic pulsing animations
 * - Natural asymmetric composition
 * - Performance optimized (GPU accelerated)
 */
export function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient layer - Full screen subtle wash */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(139, 92, 246, 0.05) 25%, transparent 50%, rgba(6, 182, 212, 0.05) 75%, rgba(59, 130, 246, 0.08) 100%)',
        }}
      />

      {/* Main Aurora Glow - Top Left (Purple/Pink blend) - LARGE & VISIBLE */}
      <div
        className="absolute -top-48 -left-48 w-[900px] h-[900px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(236, 72, 153, 0.25) 40%, rgba(217, 70, 239, 0.15) 60%, transparent 75%)',
          filter: 'blur(80px)',
          animation: 'glow-pulse 8s ease-in-out infinite',
        }}
      />

      {/* Secondary Aurora Glow - Bottom Right (Cyan/Blue blend) - VISIBLE */}
      <div
        className="absolute -bottom-48 -right-48 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(59, 130, 246, 0.2) 40%, rgba(16, 185, 129, 0.1) 60%, transparent 75%)',
          filter: 'blur(80px)',
          animation: 'glow-pulse 10s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />

      {/* Accent Glow - Top Right (Violet/Fuchsia) - MEDIUM */}
      <div
        className="absolute top-0 -right-20 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(217, 70, 239, 0.18) 45%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'glow-pulse 12s ease-in-out infinite',
          animationDelay: '4s',
        }}
      />

      {/* Center Floating Orb - Pink/Purple - ADDS DEPTH */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(236, 72, 153, 0.15) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 15s ease-in-out infinite',
        }}
      />

      {/* Bottom Left Accent - Blue */}
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.12) 50%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'glow-pulse 14s ease-in-out infinite',
          animationDelay: '7s',
        }}
      />

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'linear-gradient(-45deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1), rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))',
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 15s ease infinite',
        }}
      />

      {/* Soft vignette for depth and focus */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(10, 1, 24, 0.4) 100%)',
        }}
      />
    </div>
  );
}
