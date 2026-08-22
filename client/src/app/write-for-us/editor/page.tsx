'use client';

import React, { Suspense } from 'react';
import GuestEditor from '@/PageComponents/GuestComponents/GuestEditor';

export default function NewGuestPostPage() {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <GuestEditor />
    </Suspense>
  );
}
