'use client';

interface WelcomeMessageProps {
  onExampleClick?: (example: string) => void;
}

const EXAMPLE_COMMANDS = [
  {
    text: 'Add task: Prepare presentation for Monday',
    description: 'Create a new task',
  },
  {
    text: 'Show all my pending tasks',
    description: 'View active tasks',
  },
  {
    text: 'What should I focus on today?',
    description: 'Get task insights',
  },
  {
    text: 'Mark "buy groceries" as complete',
    description: 'Complete a task',
  },
];

/**
 * WelcomeMessage component shown for new conversations
 * Feature: 007-ai-chatbot-phase3
 *
 * - Friendly greeting
 * - Clickable example commands
 */
export function WelcomeMessage({ onExampleClick }: WelcomeMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto px-4 py-8">
      {/* Icon with aurora gradient */}
      <div className="relative w-20 h-20 mb-6">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-aurora-purple via-aurora-pink to-aurora-cyan rounded-2xl blur-xl opacity-50 animate-glow-pulse" />
        {/* Icon container */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-aurora-purple via-aurora-pink to-aurora-cyan flex items-center justify-center shadow-lg shadow-aurora-purple/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 text-white"
          >
            <path
              fillRule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Greeting with gradient text */}
      <h2 className="text-heading-2 font-bold mb-2 text-center">
        <span className="bg-gradient-to-r from-aurora-purple via-aurora-pink to-aurora-cyan bg-clip-text text-transparent">
          Welcome to TaskFlow AI
        </span>
      </h2>
      <p className="text-body-base text-text-secondary mb-8 text-center max-w-lg">
        Your intelligent task assistant powered by AI. Manage tasks naturally through conversation. Try these examples:
      </p>

      {/* Example commands with glass cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
        {EXAMPLE_COMMANDS.map((example, index) => (
          <button
            key={example.text}
            type="button"
            onClick={() => onExampleClick?.(example.text)}
            className={`
              text-left p-4 rounded-xl
              glass-card border border-border-glow
              hover:border-aurora-purple hover:bg-white/10
              hover:shadow-lg hover:shadow-aurora-purple/20
              transition-all duration-fast
              group relative overflow-hidden
            `}
          >
            {/* Gradient icon */}
            <div className={`
              absolute top-3 right-3 w-8 h-8 rounded-lg
              bg-gradient-to-br opacity-20 group-hover:opacity-30 transition-opacity
              ${index === 0 ? 'from-aurora-purple to-aurora-pink' : ''}
              ${index === 1 ? 'from-aurora-blue to-aurora-cyan' : ''}
              ${index === 2 ? 'from-aurora-green to-aurora-cyan' : ''}
              ${index === 3 ? 'from-aurora-pink to-aurora-purple' : ''}
            `} />

            <p className="text-body-sm font-medium text-text-primary group-hover:text-white transition-colors relative z-10">
              "{example.text}"
            </p>
            <p className="text-caption text-text-secondary mt-1 relative z-10">
              {example.description}
            </p>
          </button>
        ))}
      </div>

      {/* Help text with gradient accent */}
      <p className="text-body-sm text-text-secondary mt-8 text-center">
        Ask me anything about your tasks – I can <span className="text-aurora-cyan font-medium">create</span>, <span className="text-aurora-green font-medium">update</span>, <span className="text-aurora-pink font-medium">delete</span>, or <span className="text-aurora-purple font-medium">complete</span> them!
      </p>
    </div>
  );
}
