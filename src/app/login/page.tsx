"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      alert("Signed in successfully! Welcome back to pdfextra.");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans antialiased selection:bg-amber-500/20 selection:text-amber-250 relative overflow-hidden">
      
      {/* Subtle Ambient Glowing Background */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-amber-950/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-zinc-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header / Navbar */}
      <header className="z-40 bg-black/60 backdrop-blur-md px-6 py-4 border-b border-zinc-900/80">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="group flex items-center space-x-2">
            <svg className="w-5 h-5 group-hover:scale-105 transition duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              {/* Left Half (Deep Gray) */}
              <path d="M10.5 3.2L3.5 12l7 8.8V3.2z" className="text-zinc-700" />
              {/* Right Half (Glowing Gold) */}
              <path d="M13.5 3.2l7 8.8-7 8.8V3.2z" className="text-amber-400" />
            </svg>
            <span className="font-extrabold text-base tracking-tight text-white">
              pdf<span className="text-amber-400">extra</span>
            </span>
          </Link>

          <Link href="/signup" className="text-xs font-semibold text-zinc-400 hover:text-white transition duration-200">
            Create Account
          </Link>
        </div>
      </header>

      {/* Centered Auth Card Container */}
      <main className="flex-grow flex items-center justify-center px-6 py-16 relative z-10">
        <div className="w-full md:w-[420px] bg-zinc-950/90 border border-zinc-855/80 rounded-2xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center space-y-2 pb-6 mb-6 border-b border-zinc-900">
            <h1 className="text-xl font-bold text-white tracking-tight">Sign in to your account</h1>
            <p className="text-xs text-zinc-500">Access your local PDF reassembly workspace.</p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                className="w-full bg-zinc-900/60 border border-zinc-800/85 focus:border-amber-500/50 rounded-lg py-2.5 px-3.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">Password</label>
                <a href="#" className="text-[10.5px] text-amber-400 hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-zinc-900/60 border border-zinc-800/85 focus:border-amber-500/50 rounded-lg py-2.5 px-3.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-450 hover:from-amber-400 hover:to-yellow-400 text-black font-bold text-xs py-3 rounded-lg shadow-lg shadow-amber-500/10 transition duration-200 active:scale-[0.98] mt-4 flex items-center justify-center cursor-pointer"
            >
              {submitted ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Prompt to Sign Up */}
          <div className="mt-6 text-center text-[10.5px] text-zinc-500">
            <span>
              New to pdfextra?{" "}
              <Link href="/signup" className="text-amber-400 hover:underline font-medium">
                Create Free Account
              </Link>
            </span>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-900/60 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-[10.5px] text-zinc-500">
          <span>pdfextra © 2026. All rights reserved.</span>
          <div className="flex space-x-4">
            <span className="hover:text-zinc-350 cursor-pointer">Security Sandbox</span>
            <span>•</span>
            <span className="hover:text-zinc-350 cursor-pointer">Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
