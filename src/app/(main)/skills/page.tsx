import SkillsContent from "@/components/layouts/skills/SkillsContent";
import { getAllSkillCategories } from "@/data/skillsData";

export const metadata = {
    title: "Skills & Technologies",
    description: "Explore my technical skills and expertise in various technologies, frameworks, and tools.",
    openGraph: {
        title: "Skills & Technologies | CodeMeAPixel",
        description: "Explore my technical skills and expertise in various technologies, frameworks, and tools.",
    },
};

export default function SkillsPage() {
    const skillCategories = getAllSkillCategories();
    return <SkillsContent skills={skillCategories} />;
}
