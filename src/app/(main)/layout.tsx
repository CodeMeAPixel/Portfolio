import Navbar from "@/components/static/Navbar";

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
        </>
    );
}
