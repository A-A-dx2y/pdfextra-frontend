import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";




export const metadata: Metadata = {
  title: "PDF Extra | Extract PDF Pages Online",
  description: "Extract pages from any PDF file online with ease. Select pages, split PDFs, and download organized PDF pages instantly.",
  keywords: ["PDF", "Extract", "PDF Pages", "Split PDF", "Download PDF", "PDF Extractor", "PDF Splitter", "Online PDF Tool"],
  verification: {
    google: "tI5BK4hwKuMmhx0NqXCBpW7Atpc8_1WtCFwmYSPGXLQ"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="bottom-center" />
        {children}
      </body>
    </html>
  );
}

