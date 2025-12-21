'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileDropdown } from './ProfileDropdown';
import { getSession, signOut, onAuthStateChange, initAuth } from '@/lib/auth/client';

/**
 * Unified Header component for all pages
 * Feature: 006-ui-theme-motion
 *
 * - Shows on all pages (home, login, register, tasks)
 * - Shows profile avatar + dropdown when authenticated
 * - Shows Login/Get Started when not authenticated
 * - Responsive design with mobile hamburger menu
 */
export function Header() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string | null; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    initAuth();

    const unsubscribe = onAuthStateChange((state) => {
      setIsLoading(state.isLoading);
      if (!state.isLoading) {
        const hasSession = state.session !== null;
        setIsAuthenticated(hasSession);
        if (hasSession && state.session?.user) {
          setUser({
            name: state.session.user.name,
            email: state.session.user.email,
          });
        } else {
          setUser(null);
        }
      }
    });

    // Also check immediate session
    const session = getSession();
    if (session?.user) {
      setIsAuthenticated(true);
      setUser({
        name: session.user.name,
        email: session.user.email,
      });
    }

    return unsubscribe;
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when clicking outside (but not on hamburger button)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideMenu = mobileMenuRef.current && !mobileMenuRef.current.contains(target);
      const isOutsideHamburger = hamburgerRef.current && !hamburgerRef.current.contains(target);

      if (isOutsideMenu && isOutsideHamburger) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = useCallback(async () => {
    try {
      localStorage.removeItem('auth_session');
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      await signOut();
    } catch (err) {
      console.error('Sign out error:', err);
    }
    window.location.href = '/login';
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Check if current page is active
  const isActive = (path: string) => pathname === path;

  // Nav link styles with aurora gradient effects
  const navLinkClass = (path: string) => `
    px-4 py-2 rounded-lg text-body-sm font-medium
    transition-all duration-fast
    relative overflow-hidden
    ${isActive(path)
      ? 'text-white bg-gradient-to-r from-aurora-purple to-aurora-pink shadow-lg shadow-aurora-purple/30'
      : 'text-text-secondary hover:text-white hover:bg-white/5 hover:shadow-md'
    }
  `.replace(/\s+/g, ' ').trim();

  // Mobile nav link styles with aurora effects
  const mobileNavLinkClass = (path: string) => `
    block px-4 py-3 rounded-lg text-base font-medium
    transition-all duration-fast
    ${isActive(path)
      ? 'text-white bg-gradient-to-r from-aurora-purple to-aurora-pink shadow-lg'
      : 'text-text-secondary hover:text-white hover:bg-white/5'
    }
  `.replace(/\s+/g, ' ').trim();

  return (
    <header className="relative z-20 border-b border-border-glow backdrop-blur-2xl bg-glass-dark">
      {/* Subtle aurora glow line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.5), rgba(6, 182, 212, 0.5), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo/Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xl font-bold text-text-primary group relative"
          >
            {/* Icon wrapper with gradient background and glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-aurora-purple to-aurora-pink rounded-lg blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative w-9 h-9 bg-gradient-to-br from-aurora-purple via-aurora-pink to-aurora-cyan rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 11L12 14L22 4"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Text logo with gradient AI */}
            <div className="flex items-baseline gap-1">
              <span className="text-white">TaskFlow</span>
              <span className="text-lg bg-gradient-to-r from-aurora-purple via-aurora-pink to-aurora-cyan bg-clip-text text-transparent font-extrabold animate-gradient-shift bg-gradient-animate">
                AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 sm:gap-4">
            {/* Home link */}
            <Link href="/" className={navLinkClass('/')}>
              Home
            </Link>

            {/* Tasks link */}
            <Link href="/tasks" className={navLinkClass('/tasks')}>
              Tasks
            </Link>

            {/* Chatbot link */}
            <Link href="/chatbot" className={navLinkClass('/chatbot')}>
              Chatbot
            </Link>

            {/* Auth section */}
            {!isLoading && (
              <>
                {isAuthenticated && user ? (
                  /* Authenticated: Show avatar with dropdown */
                  <div className="relative ml-2">
                    <ProfileAvatar
                      user={user}
                      onClick={toggleDropdown}
                      isExpanded={isDropdownOpen}
                    />
                    <ProfileDropdown
                      isOpen={isDropdownOpen}
                      onClose={closeDropdown}
                      onSignOut={handleSignOut}
                    />
                  </div>
                ) : (
                  /* Not authenticated: Show Login & Get Started */
                  <>
                    <Link href="/login" className={navLinkClass('/login')}>
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="
                        px-5 py-2 rounded-lg text-body-sm font-semibold
                        bg-gradient-to-r from-aurora-purple via-aurora-pink to-aurora-cyan
                        text-white
                        hover:shadow-xl hover:shadow-aurora-purple/40 hover:scale-105
                        transition-all duration-fast
                        relative overflow-hidden
                        group
                      "
                    >
                      {/* Shimmer effect on hover */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <span className="relative">Get Started</span>
                    </Link>
                  </>
                )}
              </>
            )}

            {/* Loading state placeholder */}
            {isLoading && (
              <div className="w-10 h-10 rounded-full bg-background-surface animate-pulse" />
            )}
          </nav>

          {/* Mobile: Hamburger Button */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={toggleMobileMenu}
            className="
              md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg
              text-text-secondary hover:text-white
              hover:bg-white/5 hover:shadow-lg hover:shadow-aurora-purple/20
              transition-all duration-fast
              focus:outline-none focus:ring-2 focus:ring-aurora-purple focus:ring-offset-2 focus:ring-offset-background-base
            "
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {/* Hamburger Icon with Animation */}
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`
                  block h-0.5 w-6 bg-current rounded-full
                  transition-all duration-300 ease-out origin-center
                  ${isMobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}
                `}
              />
              <span
                className={`
                  block h-0.5 w-6 bg-current rounded-full
                  transition-all duration-300 ease-out
                  ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}
                `}
              />
              <span
                className={`
                  block h-0.5 w-6 bg-current rounded-full
                  transition-all duration-300 ease-out origin-center
                  ${isMobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}
                `}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Solid Background */}
      <div
        ref={mobileMenuRef}
        className={`
          md:hidden absolute top-full left-0 right-0
          bg-background-elevated border-b border-border-glow
          shadow-2xl shadow-aurora-purple/20
          transition-all duration-300 ease-out
          ${isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
          {/* Navigation Links */}
          <Link href="/" className={mobileNavLinkClass('/')}>
            Home
          </Link>
          <Link href="/tasks" className={mobileNavLinkClass('/tasks')}>
            Tasks
          </Link>
          <Link href="/chatbot" className={mobileNavLinkClass('/chatbot')}>
            Chatbot
          </Link>

          {/* Divider */}
          <div className="border-t border-border-subtle my-3" />

          {/* Auth section */}
          {!isLoading && (
            <>
              {isAuthenticated && user ? (
                /* Authenticated: Show user info and sign out */
                <div className="space-y-2">
                  <div className="px-4 py-2 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-semibold">
                      {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      {user.name && (
                        <p className="text-sm font-medium text-text-primary truncate">
                          {user.name}
                        </p>
                      )}
                      <p className="text-xs text-text-secondary truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-3 text-left rounded-md text-base font-medium text-status-error hover:bg-status-error/10 transition-colors duration-fast"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                /* Not authenticated: Show Login & Get Started */
                <div className="space-y-2">
                  <Link href="/login" className={mobileNavLinkClass('/login')}>
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="
                      block px-4 py-3 rounded-lg text-base font-semibold text-center
                      bg-gradient-to-r from-aurora-purple via-aurora-pink to-aurora-cyan
                      text-white
                      hover:shadow-xl hover:shadow-aurora-purple/50 hover:scale-[1.02]
                      transition-all duration-fast
                      relative overflow-hidden
                      group
                    "
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative">Get Started</span>
                  </Link>
                </div>
              )}
            </>
          )}

          {/* Loading state placeholder */}
          {isLoading && (
            <div className="px-4 py-3">
              <div className="w-full h-10 rounded-md bg-background-surface animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-[-1] transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
