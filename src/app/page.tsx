"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans antialiased selection:bg-amber-500/20 selection:text-amber-250 relative overflow-hidden">
      
      {/* Premium Ambient Glowing Background */}
      <div className="absolute top-[-20%] left-[25%] w-[50%] h-[50%] bg-amber-950/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[25%] w-[45%] h-[45%] bg-zinc-900/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header / Navbar */}
      <header className="z-40 bg-black/60 backdrop-blur-md border-b border-zinc-900/80 px-6 py-4">
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

          <div className="flex items-center space-x-6">
            <Link href="/login" className="text-xs font-semibold text-zinc-400 hover:text-white transition duration-200">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Majestic Center-Aligned Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center max-w-4xl w-full mx-auto px-6 py-20 text-center relative z-10 space-y-8">
        
        {/* Breathtaking Typography */}
        <h1 className="text-5xl sm:text-8xl font-black tracking-tight text-white leading-[1.05] max-w-3xl">
          Extract PDF pages.<br />
          <span className="bg-gradient-to-r from-amber-400 via-yellow-250 to-amber-300 bg-clip-text text-transparent">
            Instantly.
          </span>
        </h1>

        {/* Short, elegant subtitle */}
        <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          The ultimate secure cloud utility to visually split, extract, and organize your PDF documents. Save your history and access your files securely from any device.
        </p>

        {/* Prominent CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link 
            href="/signup" 
            className="bg-gradient-to-r from-amber-500 to-yellow-450 hover:from-amber-400 hover:to-yellow-400 text-black font-bold text-sm px-8 py-3.5 rounded-lg shadow-lg shadow-amber-500/20 transition duration-200 active:scale-95"
          >
            Start Extracting Free
          </Link>
        </div>

        {/* Security badges */}
        <div className="pt-8 flex items-center justify-center space-x-6 text-xs text-zinc-500 font-medium">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1.5 text-amber-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Encrypted Storage
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1.5 text-amber-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Secure History Tracking
          </span>
        </div>
      </main>

      {/* Sleek Features Section */}
      <section className="relative z-10 max-w-5xl w-full mx-auto px-6 py-20 border-t border-zinc-900/60">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Secure document management. Built for scale.
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm max-w-lg mx-auto">
            Experience absolute control over your PDF workflow with a secure personal database workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-8">
          {/* Feature 1 */}
          <div className="space-y-4 border-t border-zinc-900/80 pt-8 group">
            <span className="font-mono text-xs font-bold text-amber-500/40 tracking-wider block group-hover:text-amber-400 transition duration-300">
              [ 01 / SECURITY ]
            </span>
            <h3 className="font-extrabold text-white text-lg tracking-tight">Encrypted Cloud Workspace</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Your privacy is our priority. Your documents are stored securely using industry-standard encryption, ensuring only authenticated account owners can access their files.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="space-y-4 border-t border-zinc-900/80 pt-8 group">
            <span className="font-mono text-xs font-bold text-amber-500/40 tracking-wider block group-hover:text-amber-400 transition duration-300">
              [ 02 / PERFORMANCE ]
            </span>
            <h3 className="font-extrabold text-white text-lg tracking-tight">High-Powered Engine</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              No browser lag or device slowdowns. Our high-performance backend handles the heavy lifting, allowing you to split, reassemble, and compile large PDFs in milliseconds.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="space-y-4 border-t border-zinc-900/80 pt-8 group">
            <span className="font-mono text-xs font-bold text-amber-500/40 tracking-wider block group-hover:text-amber-400 transition duration-300">
              [ 03 / HISTORY ]
            </span>
            <h3 className="font-extrabold text-white text-lg tracking-tight">Unified Dashboard</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Never lose track of your work. Save your uploaded PDFs, review your extraction history, and download your customized documents on any device, at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Majestic Simple Footer */}
      <footer className="bg-black border-t border-zinc-900/60 py-10 px-6 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-[10.5px] text-zinc-500">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-zinc-400">pdfextra</span>
            <span>© 2026. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-zinc-300 cursor-pointer">Security Protocol</span>
            <span>•</span>
            <span className="hover:text-zinc-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-zinc-300 cursor-pointer">Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
