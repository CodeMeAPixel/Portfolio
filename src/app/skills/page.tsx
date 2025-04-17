import SkillsContent from "@/components/layouts/skills/SkillsContent";
import { skillsData } from "@/data/skills";

export const metadata = {
    title: "Skills & Technologies",
    description: "Explore my technical skills and expertise in various technologies, frameworks, and tools.",
    openGraph: {
        title: "Skills & Technologies | CodeMeAPixel",
        description: "Explore my technical skills and expertise in various technologies, frameworks, and tools.",
    },
};

export default function SkillsPage() {
    return <SkillsContent skills={skillsData} />;
}
