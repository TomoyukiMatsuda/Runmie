import React from 'react';

export default function Home() {
  return (
    <div>
      {/* タイムライン */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* アクティビティカード */}
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="flex-1">
              <div className="font-medium">山田太郎</div>
              <div className="text-sm text-gray-500">10km走りました</div>
              <div className="mt-2 text-sm">今日は調子が良かったです！</div>
            </div>
          </div>
        </div>
        {/* メッセージカード */}
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="flex-1">
              <div className="font-medium">鈴木花子</div>
              <div className="mt-1 text-sm">
                みんな頑張ってますね！私も明日から再開します💪
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
