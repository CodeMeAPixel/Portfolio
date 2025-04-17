import AboutContent from "@/components/layouts/about/AboutContent";

export const metadata = {
    title: "About Me",
    description: "Learn more about my background, skills, and expertise in web development.",
    openGraph: {
        title: "About Me | CodeMeAPixel",
        description: "Learn more about my background, skills, and expertise in web development.",
        type: "website",
    },
};

export default function AboutPage() {
    return <AboutContent />;
}
