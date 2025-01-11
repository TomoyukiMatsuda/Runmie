import { MessageCircle } from 'lucide-react';
import React from 'react';

export function CreateFeedAction() {
  return (
    <button className="fixed right-4 bottom-20 bg-orange-500 text-white p-4 rounded-full shadow-lg">
      <MessageCircle size={24} />
    </button>
  );
}
