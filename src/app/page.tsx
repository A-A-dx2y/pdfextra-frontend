"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { uploadPdf } from "../services/pdf.service";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Inline SVG Icons with gold / amber accents
const UploadIcon = () => (
  <svg className="w-12 h-12 text-amber-500 mb-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

export default function Home() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = async (file: File) => {
    try {
      setUploading(true);
      
      
      const result = await uploadPdf(file);
      
      if (result.success && result.data.fileName) {
        
        sessionStorage.setItem("pdfextra_file_name", result.data.fileName);
        
        
        const fileUrl = URL.createObjectURL(file);
        sessionStorage.setItem("pdfextra_local_url", fileUrl);
        
        
        router.push("/workspace");
      } else {
        throw new Error(result.message || "Failed to parse upload response.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Could not connect to backend server.";
      alert(`Upload Error: ${errorMessage}`);
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".pdf")) {
        processFile(droppedFile);
      } else {
        alert("Please upload a valid PDF file.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      processFile(uploadedFile);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans antialiased selection:bg-amber-500/20 selection:text-amber-250 relative overflow-hidden">
      
      {/* Luxury Gold Glowing Accents */}
      <div className="absolute top-[-20%] left-[25%] w-[50%] h-[50%] bg-amber-950/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[25%] w-[45%] h-[45%] bg-zinc-900/10 rounded-full blur-[160px] pointer-events-none" />

      <Header />

      {/* Main Container */}
      <main className="flex-grow flex flex-col items-center justify-center max-w-4xl w-full mx-auto px-6 py-12 md:py-20 relative z-10">
        
        {/* Upload Container */}
        <div className="space-y-16 py-8 w-full">
          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl sm:text-8xl font-black tracking-tight text-white leading-[1.05] max-w-3xl mx-auto">
              Extract PDF pages Online.<br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-250 to-amber-300 bg-clip-text text-transparent">
                Instantly.
              </span>
            </h1>
            
            <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Upload your PDF, select the pages you want to keep, and download a new PDF instantly.
            </p>
          </div>

          {/* Dropzone Container */}
          <div className="max-w-xl mx-auto relative">
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => !uploading && fileInputRef.current?.click()}
              className={`group relative border border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                uploading
                  ? "border-zinc-800 bg-zinc-950/20 cursor-not-allowed"
                  : dragActive
                  ? "border-amber-400 bg-amber-950/5 shadow-[0_0_40px_rgba(245,158,11,0.1)]"
                  : "border-zinc-800/80 bg-zinc-900/20 hover:border-zinc-700 hover:bg-zinc-900/30 hover:shadow-lg"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                disabled={uploading}
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {uploading ? (
                <div className="flex flex-col items-center justify-center py-4 space-y-4">
                  <div className="w-10 h-10 border-4 border-amber-500/10 border-t-amber-500 rounded-full animate-spin" />
                  <p className="text-sm font-semibold text-zinc-300">
                    Uploading PDF to backend...
                  </p>
                  <p className="text-xs text-zinc-500">
                    Analyzing file and establishing secure workspace.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <UploadIcon />
                  <p className="text-sm font-semibold text-zinc-300 group-hover:text-white transition">
                    Drag and drop your PDF here
                  </p>
                  <p className="text-xs text-zinc-500 mt-2">
                    or <span className="text-amber-400 font-medium group-hover:underline">browse your local files</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
