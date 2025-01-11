import React from 'react';

export function Header() {
  return (
    <div className="bg-orange-500 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm">現在のチャレンジ</span>
          <button className="bg-orange-400 px-3 py-1 rounded-full text-sm flex items-center">
            東京マラソン2025 ▼
          </button>
        </div>
      </div>
      <div className="mt-2 flex justify-between text-sm">
        <span>残り: 82日</span>
        <span>累計: 124.5km</span>
      </div>
    </div>
  );
}
