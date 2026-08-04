'use client';

import dynamic from 'next/dynamic';
import AdminLoader from '@/app/admin-dashboard/Components/AdminLoader';

const InteriorTiptapWrapper = dynamic(
  () => import('@/PageComponents/Admin Components/InteriorTiptapWrapper'),
  {
    ssr: false,
    loading: () => <AdminLoader message="Loading Interior Blog Editor..." />,
  }
);

export default function InteriorAdminClientWrapper() {
  return <InteriorTiptapWrapper />;
}
