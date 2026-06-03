"use client";

interface HeaderProps {
  onReset?: () => void;
}

export default function Header({ onReset }: HeaderProps) {
  return (
    <header className="z-40 bg-black/60 backdrop-blur-md border-b border-zinc-900/80 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div 
          className={`group flex items-center space-x-2 ${onReset ? "cursor-pointer" : ""}`} 
          onClick={onReset}
        >
          <svg className="w-5 h-5 group-hover:scale-105 transition duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            {/* Left Half (Deep Gray) */}
            <path d="M10.5 3.2L3.5 12l7 8.8V3.2z" className="text-zinc-700" />
            {/* Right Half (Glowing Gold) */}
            <path d="M13.5 3.2l7 8.8-7 8.8V3.2z" className="text-amber-400" />
          </svg>
          <span className="font-extrabold text-base tracking-tight text-white">
            pdf<span className="text-amber-400">extra</span>
          </span>
        </div>

        {onReset && (
          <div className="flex items-center space-x-4">
            <button 
              onClick={onReset}
              className="text-xs font-semibold text-zinc-400 hover:text-white transition duration-200 cursor-pointer"
            >
              Upload Different File
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
