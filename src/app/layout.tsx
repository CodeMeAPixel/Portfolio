import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import Loader from "@/components/static/Loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CodeMeAPixel | Portfolio",
    template: "%s | CodeMeAPixel"
  },
  description: "I create beautiful and functional web experiences with modern technologies and a passion for design.",
  applicationName: "CodeMeAPixel | Portfolio",
  metadataBase: new URL("https://codemeapixel.dev"),
  openGraph: {
    siteName: "CodeMeAPixel | Portfolio",
    description: "I create beautiful and functional web experiences with modern technologies and a passion for design.",
    images: "/character.png",
    creators: ["CodeMeAPixel"],
    locale: "en_US",
    url: "https://codemeapixel.dev",
  },
  twitter: {
    title: "CodeMeAPixel | Portfolio",
    description: "I create beautiful and functional web experiences with modern technologies and a passion for design.",
    images: "/character.png",
    creator: "@CodeMeAPixel",
    card: "summary_large_image",
    images: "/character.png",
    site: "https://codemeapixel.dev",
  },
  appleWebApp: {
    statusBarStyle: "black-translucent",
    title: "CodeMeAPixel | Portfolio",
  },
  other: {
    "mobile-we-app-capable": "yes"
  },
  formatDetection: {
    telephone: false
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-video-preview": -1,
      "maxc-image-preview": "large",
    }
  }
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
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
