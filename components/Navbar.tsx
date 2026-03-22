'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, loginWithGoogle, logout } = useAuth();

  const navLinks = [
    { href: '/library', label: 'Thư viện' },
    { href: '/practice', label: 'Flashcard' },
    { href: '/game-reflex', label: 'Phản xạ' },
    { href: '/game-sequence', label: 'Dãy số dài' },
  ];

  return (
    <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center gap-2">
              <Brain className="h-7 w-7 text-indigo-600" />
              <span className="font-bold text-xl tracking-tight text-zinc-900 hidden sm:block">Siêu Trí Nhớ</span>
            </Link>
            <div className="ml-4 sm:ml-10 flex space-x-4 sm:space-x-8 overflow-x-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? 'border-indigo-500 text-zinc-900'
                        : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center ml-4 shrink-0">
            {!loading && (
              user ? (
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end hidden sm:flex">
                    <span className="text-sm font-bold text-zinc-900 leading-tight">{user.displayName || 'Người chơi'}</span>
                    <button onClick={logout} className="text-xs font-medium text-zinc-500 hover:text-red-500 transition-colors">Đăng xuất</button>
                  </div>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-9 h-9 rounded-full border border-zinc-200 shadow-sm" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={loginWithGoogle} 
                  className="bg-zinc-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Đăng nhập
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
