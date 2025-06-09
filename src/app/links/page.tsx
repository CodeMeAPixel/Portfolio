import { Metadata } from 'next';
import LinkHubContent from '@/components/layouts/links/LinkHubContent';
import { getProfile, getPlaylist } from '@/data/linksData';

export const metadata: Metadata = {
    title: 'Links',
    description: 'Connect with me on various platforms and explore my projects and services.',
    openGraph: {
        title: 'Links | CodeMeAPixel',
        description: 'Connect with me on various platforms and explore my projects and services.',
        type: 'website',
    },
};

export default function LinksPage() {
    const profile = getProfile();
    const playlist = getPlaylist();

    return <LinkHubContent profile={profile} playlist={playlist} />;
}
