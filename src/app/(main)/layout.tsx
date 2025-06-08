import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/static/Navbar";
import Loader from "@/components/static/Loader";

const inter = Inter({ subsets: ["latin"] });

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <Navbar />
            {children}
        </main>
    );
}
