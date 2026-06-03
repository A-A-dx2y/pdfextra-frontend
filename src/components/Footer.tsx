"use client";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900/60 py-10 px-6 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-[10.5px] text-zinc-500 font-sans">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-zinc-400">pdfextra</span>
          <span>© 2026. All rights reserved.</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="hover:text-zinc-350 cursor-pointer">Security Protocol</span>
          <span>•</span>
          <span className="hover:text-zinc-350 cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="hover:text-zinc-350 cursor-pointer">Privacy</span>
        </div>
      </div>
    </footer>
  );
}
