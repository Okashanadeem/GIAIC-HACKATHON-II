"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">Todo App</div>
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link href="/login">
                  <div className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Sign In</div>
                </Link>
                <Link href="/signup">
                  <div className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    Sign Up
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
