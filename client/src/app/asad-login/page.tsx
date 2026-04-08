"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import NavBar from "@/PageComponents/Global Components/Header";
import Footer from "@/PageComponents/Global Components/Footer";

export default function AsadLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Hard refresh ensures Middleware catches the new cookie
        window.location.href = "/admin-dashboard";
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-blue-100 to-blue-200 px-4 -mt-16">
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full bg-white p-8 rounded-lg shadow-2xl border-2 border-blue-200"
        >
          <h2 className="text-2xl mb-2 text-center text-blue-700 font-bold">
            Admin Login
          </h2>
          <p className="text-center text-sm mb-10 text-gray-500">
            Enter your credentials to log in
          </p>
          
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vaphers.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button 
            disabled={isLoading} 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              "Log In"
            )}
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}