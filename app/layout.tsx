import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Siêu Trí Nhớ - Memory Trainer',
  description: 'Ứng dụng rèn luyện trí nhớ hình ảnh và chữ số',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};


export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="font-sans bg-zinc-50 text-zinc-900 min-h-screen flex flex-col antialiased overflow-x-hidden" suppressHydrationWarning>
        <Navbar />
        {/* pb-20 để không bị bottom nav che khuất trên mobile */}
        <main className="flex-1 flex flex-col pb-20 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}
