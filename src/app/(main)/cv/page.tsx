import CVContent from "@/components/layouts/cv/CVContent";

export const metadata = {
    title: "CV / Resume",
    description: "View and download my professional CV/Resume. Fullstack developer with 10+ years of experience.",
    openGraph: {
        title: "CV / Resume | CodeMeAPixel",
        description: "View and download my professional CV/Resume. Fullstack developer with 10+ years of experience.",
        type: "website",
    },
};

export default function CVPage() {
    return <CVContent />;
}
