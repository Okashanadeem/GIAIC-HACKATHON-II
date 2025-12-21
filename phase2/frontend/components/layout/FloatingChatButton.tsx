'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Floating Chat Button - Fixed position button for quick access to AI chatbot
 * Feature: UI/UX Enhancement
 *
 * - Purple/violet gradient design
 * - Fixed bottom-right position
 * - Animated entrance
 * - Pulse animation to draw attention
 * - Hidden on chatbot page (no need to show when already in chat)
 * - Only visible when authenticated
 */
export function FloatingChatButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  // Hide button on chatbot page
  const isOnChatbotPage = pathname === '/chatbot';

  useEffect(() => {
    // Delay visibility for smooth entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Don't render if on chatbot page
  if (isOnChatbotPage) {
    return null;
  }

  const handleClick = () => {
    router.push('/chatbot');
  };

  return (
    <button
      onClick={handleClick}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 sm:w-16 sm:h-16
        rounded-full
        bg-gradient-to-br from-aurora-purple via-aurora-pink to-aurora-cyan
        hover:from-aurora-violet hover:via-aurora-fuchsia hover:to-aurora-blue
        glow-purple-hover
        shadow-lg hover:shadow-2xl
        flex items-center justify-center
        transition-all duration-300 ease-out
        group
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
      `}
      aria-label="Open AI Chatbot"
      title="Chat with AI Assistant"
    >
      {/* Animated glow rings */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-aurora-purple via-aurora-pink to-aurora-cyan animate-ping opacity-20" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-aurora-purple via-aurora-pink to-aurora-cyan animate-pulse opacity-30" />

      {/* Sparkle icon with animation */}
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10 group-hover:scale-110 transition-transform duration-300"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* AI Sparkle/Magic Icon */}
        <path
          d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
          fill="currentColor"
          className="group-hover:animate-pulse"
        />
        <path
          d="M19 4L19.5 6.5L22 7L19.5 7.5L19 10L18.5 7.5L16 7L18.5 6.5L19 4Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M5 14L5.5 16.5L8 17L5.5 17.5L5 20L4.5 17.5L2 17L4.5 16.5L5 14Z"
          fill="currentColor"
          opacity="0.8"
        />
      </svg>

      {/* Hover tooltip - hidden on mobile */}
      <div className="
        hidden sm:block
        absolute right-full mr-3 top-1/2 -translate-y-1/2
        px-3 py-2
        bg-gray-900 text-white text-sm font-medium
        rounded-lg shadow-xl
        whitespace-nowrap
        opacity-0 group-hover:opacity-100
        pointer-events-none
        transition-opacity duration-200
      ">
        Chat with AI Assistant
        {/* Tooltip arrow */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-px">
          <div className="border-8 border-transparent border-l-gray-900" />
        </div>
      </div>
    </button>
  );
}
