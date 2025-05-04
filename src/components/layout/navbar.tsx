"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 font-bold text-xl">
              WEBTECH
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  href="/" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/" 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/users" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname.startsWith("/users") 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Users
                </Link>
                <Link 
                  href="/posts" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname.startsWith("/posts") 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Posts
                </Link>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button 
              type="button" 
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="/" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/" 
                ? "bg-gray-900 text-white" 
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            Dashboard
          </Link>
          <Link 
            href="/users" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname.startsWith("/users") 
                ? "bg-gray-900 text-white" 
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            Users
          </Link>
          <Link 
            href="/posts" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname.startsWith("/posts") 
                ? "bg-gray-900 text-white" 
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            Posts
          </Link>
        </div>
      </div>
    </nav>
  );
}