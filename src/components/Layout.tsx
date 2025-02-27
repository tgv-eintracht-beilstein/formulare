import React from 'react';
import { Link, Outlet } from '@tanstack/react-router';
import { ClipboardList, Settings, User, HelpCircle, LogIn, LogOut } from 'lucide-react';
import { useAuth0 } from "@auth0/auth0-react";

export const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } = useAuth0();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <Link
                to="/"
                className="flex flex-shrink-0 items-center"
              >
                <img className="h-12 w-12 text-blue-600" src="https://www.tgveintrachtbeilstein.de/wp-content/uploads/2016/04/cropped-cropped-cropped-tgv.logo_.512.png" />
                <span className="ml-2 text-xl font-semibold text-gray-900">TGV | Formulare</span>
              </Link>
            </div>
            <div className="sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              {
                isAuthenticated ? (
                  <>
                    <button className="text-gray-500 hover:text-gray-700">
                      <User className="h-5 w-5" /> {user?.name}
                    </button>

                    <button id="btn-logout" className="text-gray-500 hover:text-gray-700 whitespace-nowrap" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                      <LogOut className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button id="btn-login" className="text-gray-500 hover:text-gray-700 whitespace-nowrap" style={{}} onClick={() => loginWithRedirect()}>
                      <LogIn className="h-5 w-5" /> Login
                    </button>
                  </>
                )}
            </div>
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              >
                <span className="sr-only">Menü</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="space-y-1 px-4 pb-3 pt-2">
              {
                isAuthenticated ? (
                  <>
                    <button className="text-gray-500 hover:text-gray-700">
                      <User className="h-5 w-5" /> {user?.name}
                    </button>

                    <button id="btn-logout" className="text-gray-500 hover:text-gray-700 whitespace-nowrap" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                      <LogOut className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button id="btn-login" className="text-gray-500 hover:text-gray-700 whitespace-nowrap" style={{}} onClick={() => loginWithRedirect()}>
                      <LogIn className="h-5 w-5" /> Login
                    </button>
                  </>
                )}
            </div>
          </div>
        )}
      </nav>

      <main className="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};