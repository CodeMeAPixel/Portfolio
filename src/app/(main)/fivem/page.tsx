import { Metadata } from 'next';
import FivemScriptsContent from '@/components/layouts/fivem/FivemScriptsContent';
import { getAllScripts, getAllScriptTags } from '@/data/fivemScriptsData';

export const metadata: Metadata = {
    title: 'FiveM Scripts | Premium RP Server Resources',
    description: 'Browse my collection of premium FiveM scripts for roleplay servers. Compatible with ESX and QBCore frameworks.',
    openGraph: {
        title: 'FiveM Scripts | Premium RP Server Resources',
        description: 'Browse my collection of premium FiveM scripts for roleplay servers. Compatible with ESX and QBCore frameworks.',
        type: 'website',
    },
};

export default function FivemPage() {
    const scripts = getAllScripts();
    const allTags = getAllScriptTags();

    return <FivemScriptsContent scripts={scripts} allTags={allTags} />;
}
