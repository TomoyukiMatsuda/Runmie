import React from 'react';

export default function Profile() {
  return (
    <div>
      <div className="bg-white p-4">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full" />
          <div>
            <div className="font-medium">山田太郎</div>
            <div className="text-sm text-gray-500">
              2021年5月1日からランニングを始めました
              <div>累計: 124.5km</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
