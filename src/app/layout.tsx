import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/static/Navbar";
import Loader from "@/components/static/Loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeMeAPixel - Portfolio",
  description: "Personal portfolio website showcasing my projects and skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Remove data-theme entirely from SSR HTML
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Apply theme entirely on client side */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('themeColor');
                  if (savedTheme && ['blue', 'purple', 'teal', 'rose', 'amber'].includes(savedTheme)) {
                    document.documentElement.setAttribute('data-theme', savedTheme);
                  } else {
                    document.documentElement.setAttribute('data-theme', 'purple');
                  }
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'purple');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-bg text-color-text`}>
        <ThemeProvider>
          <Loader />
          <div className="loader-content">
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
