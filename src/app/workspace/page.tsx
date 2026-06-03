"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as pdfjsLib from "pdfjs-dist";
import { extractPdf } from "../../services/pdf.service";
import { PDFPageData } from "../../types/pdf";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Resolve worker Src dynamically using standard jsdelivr CDN matching the installed pdfjs-dist version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@6.0.227/build/pdf.worker.min.mjs`;


// Inline SVG Icons with gold / amber accents
const DocumentIcon = () => (
  <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
  </svg>
);



export default function Workspace() {
  const router = useRouter();
  const [fileName, setFileName] = useState("");
  const [fileSizeStr, setFileSizeStr] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [extracting, setExtracting] = useState(false);
  
  const [pdfPages, setPdfPages] = useState<PDFPageData[]>([]);
  const pageRefs = useRef<React.RefObject<HTMLCanvasElement | null>[]>([]);

  const [extractedPdfUrl, setExtractedPdfUrl] = useState<string | null>(null);
  const [extractedPagesCount, setExtractedPagesCount] = useState(0);
  const [resultPdfPages, setResultPdfPages] = useState<PDFPageData[]>([]);
  const [renderingResult, setRenderingResult] = useState(false);
  const resultPageRefs = useRef<React.RefObject<HTMLCanvasElement | null>[]>([]);

  useEffect(() => {
    const savedName = sessionStorage.getItem("pdfextra_file_name");
    const localUrl = sessionStorage.getItem("pdfextra_local_url");

    if (!savedName || !localUrl) {
      router.replace("/");
      return;
    }

    setFileName(savedName);

   
    const loadPdfDocument = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ url: localUrl });
        const pdf = await loadingTask.promise;
        
        
        try {
          URL.revokeObjectURL(localUrl);
        } catch (revokeErr) {
          console.warn("Failed to revoke blob URL:", revokeErr);
        }

        const pageCount = pdf.numPages;
        setTotalPages(pageCount);

        
        const pagesList: PDFPageData[] = [];
        pageRefs.current = Array.from({ length: pageCount }, () => ({ current: null }));

        for (let i = 1; i <= pageCount; i++) {
          pagesList.push({
            id: i,
            canvasRef: pageRefs.current[i - 1]
          });
        }
        setPdfPages(pagesList);
        setLoading(false);

        setTimeout(() => {
          pagesList.forEach(async (pageData) => {
            try {
              const page = await pdf.getPage(pageData.id);
              const canvas = pageData.canvasRef.current;
              if (!canvas) return;

              const context = canvas.getContext("2d");
              if (!context) return;

           
              const viewport = page.getViewport({ scale: 0.45 });
              canvas.height = viewport.height;
              canvas.width = viewport.width;

              const renderContext = {
                canvas: canvas,
                canvasContext: context,
                viewport: viewport
              };
              await page.render(renderContext).promise;
            } catch (renderError) {
              console.error(`Error rendering page ${pageData.id}:`, renderError);
            }
          });
        }, 100);

      } catch (error) {
        console.error("Failed to load PDF in browser:", error);
        router.replace("/");
      }
    };

    loadPdfDocument();


    return () => {};
  }, [router]);

  const togglePageSelection = (pageId: number) => {
    if (selectedPages.includes(pageId)) {
      setSelectedPages(selectedPages.filter((id) => id !== pageId));
    } else {
      setSelectedPages([...selectedPages, pageId].sort((a, b) => a - b));
    }
  };

  const handleSelectAll = () => {
    const allPageIds = Array.from({ length: totalPages }, (_, i) => i + 1);
    setSelectedPages(allPageIds);
  };

  const handleDeselectAll = () => {
    setSelectedPages([]);
  };

  const handleReset = () => {
    if (extractedPdfUrl) {
      try {
        URL.revokeObjectURL(extractedPdfUrl);
      } catch (e) {
        console.warn("Failed to revoke object URL:", e);
      }
    }
    sessionStorage.removeItem("pdfextra_file_name");
    sessionStorage.removeItem("pdfextra_local_url");
    router.push("/");
  };

  const handleExtract = async () => {
    if (selectedPages.length === 0 || extracting) return;
    try {
      setExtracting(true);
      const blob = await extractPdf(fileName, selectedPages);
      
      
      if (extractedPdfUrl) {
        try {
          URL.revokeObjectURL(extractedPdfUrl);
        } catch (revokeErr) {
          console.warn("Failed to revoke old object URL:", revokeErr);
        }
      }

      const localUrl = URL.createObjectURL(blob);
      setExtractedPdfUrl(localUrl);
      await loadResultPdf(localUrl);
    } catch (err) {
      console.error("Extraction error:", err);
      const errorMessage = err instanceof Error ? err.message : "Could not connect to backend server.";
      alert(`Extraction failed: ${errorMessage}`);
    } finally {
      setExtracting(false);
    }
  };

  const loadResultPdf = async (url: string) => {
    try {
      setRenderingResult(true);
      const loadingTask = pdfjsLib.getDocument({ url });
      const pdf = await loadingTask.promise;
      const pageCount = pdf.numPages;
      setExtractedPagesCount(pageCount);

      const pagesList: PDFPageData[] = [];
      resultPageRefs.current = Array.from({ length: pageCount }, () => ({ current: null }));

      for (let i = 1; i <= pageCount; i++) {
        pagesList.push({
          id: i,
          canvasRef: resultPageRefs.current[i - 1]
        });
      }
      setResultPdfPages(pagesList);
      setRenderingResult(false);


      setTimeout(() => {
        pagesList.forEach(async (pageData) => {
          try {
            const page = await pdf.getPage(pageData.id);
            const canvas = pageData.canvasRef.current;
            if (!canvas) return;

            const context = canvas.getContext("2d");
            if (!context) return;

           
            const viewport = page.getViewport({ scale: 0.45 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
              canvas: canvas,
              canvasContext: context,
              viewport: viewport
            };
            await page.render(renderContext).promise;
          } catch (renderError) {
            console.error(`Error rendering result page ${pageData.id}:`, renderError);
          }
        });
      }, 100);

    } catch (error) {
      console.error("Failed to load result PDF in browser:", error);
      setRenderingResult(false);
      setExtractedPdfUrl(null);
    }
  };

  const handleDownloadResult = () => {
    if (!extractedPdfUrl) return;
    const link = document.createElement("a");
    link.href = extractedPdfUrl;
    
    let cleanName = fileName;
    const parts = fileName.split("-");
    if (parts.length > 1) {
      cleanName = parts.slice(1).join("-");
    }
    
    link.setAttribute("download", `extracted-${cleanName}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBackToSelection = () => {
    if (extractedPdfUrl) {
      try {
        URL.revokeObjectURL(extractedPdfUrl);
      } catch (e) {
        console.warn("Failed to revoke object URL:", e);
      }
    }
    setExtractedPdfUrl(null);
    setResultPdfPages([]);
    setExtractedPagesCount(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center font-sans antialiased">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-amber-500/10 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-xs text-zinc-500 font-mono">Parsing PDF Pages Locally...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans antialiased selection:bg-amber-500/20 selection:text-amber-250 relative overflow-hidden">
      
    
      <div className="absolute top-[-20%] left-[25%] w-[50%] h-[50%] bg-amber-950/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[25%] w-[45%] h-[45%] bg-zinc-900/10 rounded-full blur-[160px] pointer-events-none" />

    
      <Header onReset={handleReset} />

      {/* Main Workspace Container */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-6 py-12 relative z-10 space-y-8">
        
        {extractedPdfUrl ? (
         
          <>
            {/* Extraction Info Bar */}
            <div className="bg-zinc-950/80 border border-zinc-900 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h2 className="font-bold text-base text-white">Extraction Successful!</h2>
                  <p className="text-[10.5px] text-zinc-500 flex items-center space-x-2 font-medium">
                    <span>Your custom slice is ready to download</span>
                    <span>•</span>
                    <span>{extractedPagesCount} page{extractedPagesCount > 1 ? "s" : ""} compiled</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToSelection}
                  className="text-[11px] font-semibold px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-800 transition cursor-pointer"
                >
                  ← Back to Selection
                </button>
              </div>
            </div>

            
            {renderingResult ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-10 h-10 border-4 border-amber-500/10 border-t-amber-500 rounded-full animate-spin" />
                <p className="text-xs text-zinc-500 font-mono">Parsing Sliced Document...</p>
              </div>
            ) : (
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {resultPdfPages.map((page) => (
                  <div
                    key={page.id}
                    className="relative group rounded-xl border border-amber-500/20 bg-zinc-950/20 overflow-hidden shadow-[0_0_15px_rgba(245,158,11,0.02)]"
                  >
                    {/* Page Thumbnail Canvas */}
                    <div className="aspect-[3/4] bg-zinc-950/65 flex items-center justify-center overflow-hidden relative">
                      <canvas 
                        ref={page.canvasRef}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-transparent" />
                    </div>

                    {/* Page footer designation */}
                    <div className="bg-zinc-900/90 py-2 px-3 text-center border-t border-zinc-900 text-[11px] font-medium text-zinc-400">
                      <span>Compiled Page {page.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            
            <div className="sticky bottom-6 left-0 right-0 z-30 max-w-3xl mx-auto px-4">
              <div className="bg-zinc-955/90 backdrop-blur-md border border-zinc-900 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Target Document</p>
                  <p className="text-sm font-bold text-white mt-1">
                    Ready for Download ({extractedPagesCount} page{extractedPagesCount > 1 ? "s" : ""})
                  </p>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleBackToSelection}
                    className="w-full sm:w-auto text-xs font-semibold px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-350 rounded-lg border border-zinc-800 transition active:scale-95 cursor-pointer"
                  >
                    Extract More Pages
                  </button>
                  <button
                    onClick={handleDownloadResult}
                    disabled={renderingResult}
                    className="w-full sm:w-auto flex items-center justify-center font-bold text-xs px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-450 text-black border-amber-500/50 hover:from-amber-400 hover:to-yellow-450 active:scale-95 cursor-pointer shadow-md shadow-amber-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          
          <>
            
            <div className="bg-zinc-955/80 border border-zinc-900 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
                  <DocumentIcon />
                </div>
                <div className="space-y-1">
                  <h2 className="font-bold text-base text-white truncate max-w-md md:max-w-xl">{fileName}</h2>
                  <p className="text-[10.5px] text-zinc-500 flex items-center space-x-2 font-medium">
                    <span>Active File in Memory</span>
                    <span>•</span>
                    <span>{totalPages} pages rendered</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSelectAll}
                  className="text-[11px] font-semibold px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-350 rounded-lg border border-zinc-800 transition cursor-pointer"
                >
                  Select All
                </button>
                <button
                  onClick={handleDeselectAll}
                  className="text-[11px] font-semibold px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-350 rounded-lg border border-zinc-800 transition cursor-pointer"
                >
                  Deselect All
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 bg-zinc-900/60 hover:bg-rose-500/10 text-zinc-500 hover:text-rose-400 rounded-lg border border-zinc-850 hover:border-rose-500/20 transition cursor-pointer"
                  title="Remove file"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>

           
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {pdfPages.map((page) => {
                const isSelected = selectedPages.includes(page.id);
                return (
                  <div
                    key={page.id}
                    onClick={() => togglePageSelection(page.id)}
                    className={`relative cursor-pointer group rounded-xl border transition-all duration-300 overflow-hidden ${
                      isSelected
                        ? "border-amber-500/60 bg-amber-955/10 shadow-[0_0_15px_rgba(245,158,11,0.06)]"
                        : "border-zinc-855/80 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/50"
                    }`}
                  >
                    
                    <div
                      className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-200 z-20 ${
                        isSelected
                          ? "bg-amber-450 border-amber-350 scale-105"
                          : "bg-zinc-955/60 border-zinc-700 group-hover:border-zinc-500"
                      }`}
                    >
                      {isSelected && <CheckIcon />}
                    </div>

                    
                    <div className="aspect-[3/4] bg-zinc-950/65 flex items-center justify-center overflow-hidden relative">
                      <canvas 
                        ref={page.canvasRef}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-transparent" />
                    </div>

                    {/* Page footer designation */}
                    <div className="bg-zinc-900/90 py-2 px-3 text-center border-t border-zinc-900 flex items-center justify-between text-[11px] font-medium text-zinc-400">
                      <span>Page {page.id}</span>
                      {isSelected && <span className="text-amber-400 text-[10px] font-bold">SELECTED</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            
            <div className="sticky bottom-6 left-0 right-0 z-30 max-w-3xl mx-auto px-4">
              <div className="bg-zinc-955/90 backdrop-blur-md border border-zinc-900 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Selection Status</p>
                  <p className="text-sm font-bold text-white mt-1">
                    {selectedPages.length === 0
                      ? "No pages selected"
                      : `${selectedPages.length} of ${totalPages} page${selectedPages.length > 1 ? "s" : ""} selected`}
                  </p>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleExtract}
                    disabled={selectedPages.length === 0 || extracting}
                    className={`w-full sm:w-auto flex items-center justify-center font-bold text-xs px-8 py-3 rounded-lg transition active:scale-95 ${
                      selectedPages.length > 0 && !extracting
                        ? "bg-gradient-to-r from-amber-500 to-yellow-450 text-black border-amber-500/50 hover:from-amber-400 hover:to-yellow-450 cursor-pointer shadow-md shadow-amber-500/10"
                        : "bg-zinc-900 text-zinc-650 border-zinc-850 cursor-not-allowed"
                    }`}
                  >
                    {extracting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-black/10 border-t-black rounded-full animate-spin" />
                        <span>Extracting...</span>
                      </div>
                    ) : (
                      "Extract PDF"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      
      <Footer />
    </div>
  );
}
