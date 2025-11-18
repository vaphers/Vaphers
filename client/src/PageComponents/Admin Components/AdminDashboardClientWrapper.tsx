'use client';

import dynamic from 'next/dynamic';

const TiptapWrapper = dynamic(() => import('@/PageComponents/Admin Components/TiptapWrapper'), {
  ssr: false,
});

export default function AdminDashboardClientWrapper() {
  return <TiptapWrapper />;
}
