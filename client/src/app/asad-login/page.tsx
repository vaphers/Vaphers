"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import NavBar from "@/PageComponents/Global Components/Header";
import Footer from "@/PageComponents/Global Components/Footer";

export default function AsadLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch("/api/admin-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data = await res.json();

  console.log("Login response:", data);  // check token here in console

  if (data.success) {
    window.location.href = "/admin-dashboard";
  } else {
    alert(data.error || "Login failed");
  }
}


  return (
    <>
    <NavBar/>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-blue-100 to-blue-200 px-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full bg-white p-8 rounded-lg shadow-2xl border-2 border-blue-200"
        >
          <h2 className="text-2xl font-bold mb-2 text-center text-blue-600 bungee-shade">
            Admin Login
          </h2>
          <p className="text-center text-sm mb-10">
            Enter your credentials to log in
          </p>
          <div className="mb-4">
            <Label htmlFor="email" className="block mb-1 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@domain.com"
              required
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="password" className="block mb-1 font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="pr-10"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={0}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-500" />
                ) : (
                  <Eye size={20} className="text-gray-500" />
                )}
              </span>
            </div>
          </div>
          <Button type="submit" className="w-full bg-blue-600">
            Log In
          </Button>
        </form>
      </div>
    <Footer/>
    </>
  );
}
