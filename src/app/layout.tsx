import type { Metadata } from "next";
import "./globals.css";




export const metadata: Metadata = {
  title: "pdfextra",
  description: "Extract PDF pages online",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

