import type { Metadata } from 'next';
import React from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { CreateFeedAction } from '@/components/createFeedAction';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Runmie',
  description: 'ランニングを楽しく続けるためのアプリ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="w-full max-w-md mx-auto">
          {/* フィード画面 */}
          <div className="bg-white h-screen flex flex-col">
            {/* ヘッダー */}
            <Header />

            <div className="flex-1 overflow-auto p-4 space-y-4">{children}</div>

            {/* フローティングアクションボタン */}
            <CreateFeedAction />

            {/* ボトムナビゲーション */}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
