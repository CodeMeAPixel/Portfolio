import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { ApplyCustomizations } from "@/components/ApplyCustomizations";
import Loader from "@/components/static/Loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CodeMeAPixel | Portfolio",
    template: "%s | CodeMeAPixel"
  },
  description: "Building beautiful, functional web experiences with modern technologies. Full-Stack Developer & Designer specializing in Next.js, React, TypeScript, and Node.js.",
  applicationName: "CodeMeAPixel | Portfolio",
  metadataBase: new URL("https://codemeapixel.dev"),
  keywords: ["CodeMeAPixel", "Full-Stack Developer", "Web Developer", "React", "Next.js", "TypeScript", "Node.js", "Portfolio", "Designer"],
  authors: [{ name: "CodeMeAPixel", url: "https://codemeapixel.dev" }],
  creator: "CodeMeAPixel",
  publisher: "CodeMeAPixel",
  openGraph: {
    type: "website",
    siteName: "CodeMeAPixel | Portfolio",
    title: "CodeMeAPixel | Full-Stack Developer & Designer",
    description: "Building beautiful, functional web experiences with modern technologies. Specializing in Next.js, React, TypeScript, and Node.js.",
    locale: "en_US",
    url: "https://codemeapixel.dev",
    // Dynamic OG image generated at /opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeMeAPixel | Full-Stack Developer & Designer",
    description: "Building beautiful, functional web experiences with modern technologies. Specializing in Next.js, React, TypeScript, and Node.js.",
    creator: "@CodeMeAPixel",
    site: "@CodeMeAPixel",
    // Dynamic Twitter image generated at /twitter-image.tsx
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
      "max-image-preview": "large",
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
      {/* Apply customizations immediately to prevent flash - must match ThemeContext themes */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
              (function() {
                try {
                  var validThemes = ['blue','purple','teal','rose','amber','sunset','emerald','crimson','nord','cyberpunk','mint','indigo','violet','coral','sage','slate','peach','lavender','rust','lime','ocean','aurora','neon','blood','everforest','kanagawa','stranger','matrix','synthwave','dracula','monokai','winter-coming','tron','vaporwave','evangelion','warzone','valorant','minecraft','fortnite','gta','hacker','elden-ring','dark-souls','apex-legends','csgo','tokyo-night','gruvbox','solarized','one-dark','palenight','atom','vscode','rose-pine','catppuccin','nightfox','github-dark','flexoki'];
                  var validFonts = ['system','monospace','serif','rounded'];
                  var validDensities = ['compact','normal','spacious'];
                  var defaultTheme = 'fortnite';
                  var defaultFont = 'system';
                  var defaultDensity = 'normal';
                  
                  var html = document.documentElement;
                  
                  // Apply theme
                  var savedTheme = localStorage.getItem('themeColor');
                  var theme = (savedTheme && validThemes.indexOf(savedTheme) !== -1) ? savedTheme : defaultTheme;
                  html.setAttribute('data-theme', theme);
                  
                  // Apply font
                  var savedFont = localStorage.getItem('fontChoice');
                  var font = (savedFont && validFonts.indexOf(savedFont) !== -1) ? savedFont : defaultFont;
                  html.setAttribute('data-font', font);
                  
                  // Apply density
                  var savedDensity = localStorage.getItem('layoutDensity');
                  var density = (savedDensity && validDensities.indexOf(savedDensity) !== -1) ? savedDensity : defaultDensity;
                  html.setAttribute('data-density', density);
                  
                  // Apply animations
                  var savedAnimations = localStorage.getItem('animationsEnabled');
                  var animationsEnabled = savedAnimations === null ? true : savedAnimations === 'true';
                  if (!animationsEnabled) {
                    html.classList.add('animations-disabled');
                  }
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'fortnite');
                }
              })();
            `,
        }}
      />
      <body className={`${inter.className} bg-bg text-color-text`} suppressHydrationWarning>
        <ThemeProvider>
          <ApplyCustomizations />
          <Loader />
          <div className="loader-content">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
