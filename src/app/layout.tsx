import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { Toaster } from "sonner";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "أكاديمية غراس العلم للعلوم",
  description: "منصة التعلم الإلكتروني المتكاملة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[var(--font-cairo)]">
        <ReactQueryClientProvider>
          {children}
          <Toaster richColors position="top-center" />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
