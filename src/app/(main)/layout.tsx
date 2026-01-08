import Navbar from "@/components/static/Navbar";
import Footer from "@/components/static/Footer";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            {/**<Footer />*/}
        </>
    );
}
