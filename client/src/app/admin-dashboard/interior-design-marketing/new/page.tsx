import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import InteriorAdminClientWrapper from '@/PageComponents/Admin Components/InteriorAdminClientWrapper';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-jwt-key';

export default async function AdminNewInteriorBlogPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-auth')?.value;

  if (!token) {
    return (
      <div className="p-8 text-center">
        Please <a href="/asad-login" className="text-blue-600 underline">login</a>
      </div>
    );
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch {
    return (
      <div className="p-8 text-center">
        Invalid token. Please{' '}
        <a href="/asad-login" className="text-blue-600 underline">login</a> again.
      </div>
    );
  }

  return (
    <div>
      <InteriorAdminClientWrapper />
    </div>
  );
}
