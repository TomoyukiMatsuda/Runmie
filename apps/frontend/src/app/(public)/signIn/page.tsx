import React from 'react';
import { GoogleAuth } from '@/components/googleAuth';

export default function SignIn() {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <GoogleAuth />
      </div>
    </div>
  );
}
