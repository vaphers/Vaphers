import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import AdminDashboardClientWrapper from '@/PageComponents/Admin Components/AdminDashboardClientWrapper'; 

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-auth")?.value;

  if (!token) {
    return <div>Please <a href="/asad-login">login</a></div>;
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch {
    return <div>Invalid token. Please <a href="/asad-login">login</a> again.</div>;
  }

  return (
    <div>
      <h1>Welcome to Blogs</h1>
    </div>
  );
}
