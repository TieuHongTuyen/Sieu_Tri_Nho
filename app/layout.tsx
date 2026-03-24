import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Siêu Trí Nhớ - Memory Trainer',
  description: 'Ứng dụng rèn luyện trí nhớ hình ảnh và chữ số',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};


export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 min-h-screen flex flex-col antialiased overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {/* pb-20 để không bị bottom nav che khuất trên mobile */}
          <main className="flex-1 flex flex-col pb-20 md:pb-0">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
