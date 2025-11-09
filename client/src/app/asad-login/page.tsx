// src/app/asad-login/page.tsx
'use client';

import { useState } from 'react';
import { signIn, getProviders } from 'next-auth/react';
import { useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');

//   async function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setErr('');
//     await signIn('credentials', {
//       email,
//       password,
//       redirect: true,
//       callbackUrl: '/dashboard',
//     });
//   }

useEffect(() => {
  getProviders()
    .then((p) => console.log('providers endpoint:', p))
    .catch((e) => console.error('providers error:', e));
}, []);


async function onSubmit(e: React.FormEvent) {
  e.preventDefault();
  setErr('');

  const res = await signIn('credentials', {
    email,
    password,
    redirect: false,           // stop auto redirect
    callbackUrl: '/dashboard', // still pass where you want to go
  });

  console.log('signin:', res); // { error?: string; ok?: boolean; status?: number; url?: string }

  if (res?.error) {
    setErr(res.error);         // shows “CredentialsSignin”, “Configuration”, etc.
    return;
  }
  if (res?.ok && res?.url) {
    window.location.href = res.url; // manually navigate on success
  }
}


  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-blue-100 to-blue-200 flex items-center justify-center p-4 ">
      <Card className="w-full max-w-md shadow-lg border-1 border-blue-600">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl text-center text-blue-900 bungee-shade">Admin Login</CardTitle>
          <CardDescription className='text-center'>Enter your credentials to access the dashboard.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500" />
                <Input
                  id="password"
                  type={show ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10"
                />
                <button
                  type="button"
                  aria-label={show ? 'Hide password' : 'Show password'}
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:text-blue-800"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {err && <p className="text-sm text-red-600">{err}</p>}

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Sign in
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-xs text-muted-foreground">
          Protected area — authorized users only.
        </CardFooter>
      </Card>
    </div>
  );
}
