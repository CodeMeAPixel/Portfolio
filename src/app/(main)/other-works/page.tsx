import OtherWorksContent from '@/components/other-works/OtherWorksContent';

export const metadata = {
    title: 'Other Works | Open Source Projects',
    description: 'Explore my open source projects and contributions on GitHub. Browse through my public repositories, tools, and experiments.',
    openGraph: {
        title: 'Other Works | Open Source Projects',
        description: 'Explore my open source projects and contributions on GitHub. Browse through my public repositories, tools, and experiments.',
        type: 'website',
    },
};

export default function OtherWorksPage() {
    return <OtherWorksContent />;
}
