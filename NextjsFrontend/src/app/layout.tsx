import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ToasterProvider } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  title: "Modern CMS",
  description: "Accessible, performant, and customizable CMS frontend",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-primary)]" suppressHydrationWarning>
        <ThemeProvider>
          <ToasterProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white"
            >
              Skip to content
            </a>
            <Header />
            <main id="main" className="mx-auto max-w-7xl px-4 py-6">
              {children}
            </main>
            <Footer />
          </ToasterProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
