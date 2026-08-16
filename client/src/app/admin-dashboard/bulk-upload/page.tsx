import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import BulkUploadPage from '@/PageComponents/Admin Components/BulkUploadPage'; 
import { redirect } from "next/navigation";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bulk Upload | Admin Dashboard',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-jwt-key';

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-auth")?.value;

  if (!token) {
    redirect("/asad-login");
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch {
    redirect("/asad-login");
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-full">
      <BulkUploadPage />
    </div>
  );
}
