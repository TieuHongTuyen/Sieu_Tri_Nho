'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

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
        </div>
      </div>
    </nav>
  );
}
