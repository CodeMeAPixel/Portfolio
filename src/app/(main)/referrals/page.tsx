import { Metadata } from 'next';
import ReferralsContent from '@/components/layouts/referrals/ReferralsContent';
import { getAllReferrals, getAllCategories } from '@/data/referralsData';

export const metadata: Metadata = {
    title: 'Referrals & Offers | CodeMeAPixel',
    description: 'Exclusive discount codes and referral links for services and products I recommend.',
    openGraph: {
        title: 'Referrals & Offers | CodeMeAPixel',
        description: 'Exclusive discount codes and referral links for services and products I recommend.',
        type: 'website',
    },
};

export default function ReferralsPage() {
    const referrals = getAllReferrals();
    const categories = getAllCategories();

    return <ReferralsContent referrals={referrals} categories={categories} />;
}
