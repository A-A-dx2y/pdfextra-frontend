"use client";

import dynamic from "next/dynamic";

const WorkspaceContent = dynamic(() => import("./WorkspaceContent"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center font-sans antialiased">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 border-4 border-amber-500/10 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-xs text-zinc-500 font-mono">Loading Workspace...</p>
      </div>
    </div>
  )
});

export default function WorkspacePage() {
  return <WorkspaceContent />;
}
