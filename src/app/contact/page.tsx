import ContactContent from "@/components/layouts/contact/ContactContent";

export const metadata = {
    title: "Contact Me",
    description: "Get in touch with me for collaboration, questions, or just to say hello!",
    openGraph: {
        title: "Contact Me | CodeMeAPixel",
        description: "Get in touch with me for collaboration, questions, or just to say hello!",
        type: "website",
    },
};

export default function ContactPage() {
    return <ContactContent />;
}
