'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import GuestEditor from '@/PageComponents/GuestComponents/GuestEditor';

export default function EditGuestPostPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  return <GuestEditor submissionId={id} />;
}
