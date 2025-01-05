'use client';

import { MessageCircle, User } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pageUrls = {
  home: '/',
  profile: '/profile',
} as const;

const tabItemStyle = (active: boolean) =>
  `p-2 flex flex-col items-center ${active ? 'text-orange-500 pointer-events-none' : 'text-gray-500'}`;

export function Footer() {
  const path = usePathname();

  return (
    <footer className="bg-white border-t flex justify-around py-2">
      <Link
        href={pageUrls.home}
        className={tabItemStyle(path === pageUrls.home)}
      >
        <MessageCircle size={24} />
        <span className="text-xs">フィード</span>
      </Link>
      {/*<button className="p-2 text-gray-500 flex flex-col items-center">*/}
      {/*  <Activity size={24} />*/}
      {/*  <span className="text-xs">記録</span>*/}
      {/*</button>*/}
      <Link
        href={pageUrls.profile}
        className={tabItemStyle(path === pageUrls.profile)}
      >
        <User size={24} />
        <span className="text-xs">プロフィール</span>
      </Link>
    </footer>
  );
}
