import type { PrismaClient } from '../../src/generated/prisma/client.js'

export async function seedReferrals(prisma: PrismaClient) {
  const hosting = await prisma.referralCategory.create({
    data: { slug: 'hosting', name: 'Web Hosting', description: 'Hosting services for your websites and applications', icon: 'IoServerOutline', color: 'text-blue-500' },
  })

  const cloud = await prisma.referralCategory.create({
    data: { slug: 'cloud', name: 'Cloud Platforms', description: 'Cloud computing platforms and infrastructure services', icon: 'IoCloudOutline', color: 'text-cyan-500' },
  })

  await prisma.referralCategory.create({
    data: { slug: 'tools', name: 'Development Tools', description: 'Software and tools for developers', icon: 'IoCodeSlashOutline', color: 'text-purple-500' },
  })

  await prisma.referralCategory.create({
    data: { slug: 'services', name: 'Online Services', description: 'Subscription services and SaaS products', icon: 'IoCloudOutline', color: 'text-green-500' },
  })

  await prisma.referralCategory.create({
    data: { slug: 'gaming', name: 'Gaming', description: 'Gaming platforms and services', icon: 'IoGameControllerOutline', color: 'text-red-500' },
  })

  await prisma.referralCategory.create({
    data: { slug: 'education', name: 'Education', description: 'Learning platforms and courses', icon: 'IoSchoolOutline', color: 'text-yellow-500' },
  })

  await prisma.referral.createMany({
    data: [
      {
        title: 'Linode',
        description: 'Get $100 in free cloud credits when you sign up for Linode. Perfect for testing and deploying your applications with high-performance cloud infrastructure.',
        company: 'Linode',
        url: 'https://www.linode.com/lp/free-credit-100/',
        code: 'sitelin100-02162023',
        discount: '$100/60 Day Credit',
        benefits: ['High-performance SSD storage', '11 global data centers', '24/7 customer support', 'Easy-to-use cloud manager'],
        featured: true,
        isNew: true,
        color: 'bg-green-500',
        bannerImage: '/referrals/linode/banner.png',
        categoryId: hosting.id,
      },
      {
        title: 'Digital Ocean',
        description: 'Cloud platform to deploy, manage & scale applications. Get free $200 credit over 60 days to build and scale your projects.',
        company: 'DigitalOcean',
        url: 'https://m.do.co/c/a7f497dd62e5',
        code: 'a7f497dd62e5',
        discount: '$200/60 Day Credit',
        benefits: ['Simple cloud computing', 'Predictable pricing', 'Developer-friendly tools', 'Global data centers'],
        featured: true,
        color: 'bg-blue-500',
        bannerImage: '/referrals/digital-ocean/banner.png',
        categoryId: hosting.id,
      },
      {
        title: 'NodeByte',
        description: 'Fast, reliable, scalable and secure hosting services for your business or gaming experience. Get 10% off at checkout.',
        company: 'NodeByte',
        url: 'https://nodebyte.host',
        code: 'INFINITY',
        discount: '10% off at checkout',
        benefits: ['10% discount on all plans', 'High-performance hardware', 'Custom modpack support', '24/7 server monitoring', 'Easy server management panel'],
        featured: true,
        isNew: true,
        color: 'bg-green-600',
        bannerImage: '/referrals/nodebyte/banner.png',
        categoryId: hosting.id,
      },
      {
        title: 'Cybrancee',
        description: 'Cybrancee provides users with a powerful platform to host their digital projects. Get one month free with our exclusive code.',
        company: 'Cybrancee',
        url: 'https://cybrancee.com',
        code: 'INFINITYBOTS',
        discount: 'One month free',
        benefits: ['One month free hosting', 'Powerful hosting platform', 'Digital project hosting', 'Reliable infrastructure', 'Easy project management'],
        color: 'bg-purple-600',
        bannerImage: '/referrals/cybrancee/banner.png',
        categoryId: hosting.id,
      },
      {
        title: 'ZAP-Hosting',
        description: 'Get a 20% discount for the entire duration of all rental servers (excluding dedicated servers).',
        company: 'ZAP-Hosting',
        url: 'https://zap-hosting.com',
        code: 'CodeMeAPixel-a-2410',
        discount: '20% off rental servers',
        benefits: ['20% discount for entire duration', 'All rental servers included', 'Game server hosting', 'Web hosting solutions', 'DDoS protection included'],
        featured: true,
        isNew: true,
        color: 'bg-red-500',
        bannerImage: '/referrals/zap/banner.png',
        categoryId: hosting.id,
      },
      {
        title: 'Railway',
        description: 'Railway is a deployment platform designed to streamline the software development life-cycle, starting with instant deployments and effortless scaling.',
        company: 'Railway',
        url: 'https://railway.com?referralCode=pixelateme',
        code: 'pixelateme',
        discount: '$5/30 Day Credit',
        benefits: ['Instant deployments from Git', 'Auto-scaling infrastructure', 'Built-in databases', 'Zero-config deployments', 'Pay-per-use pricing'],
        color: 'bg-purple-500',
        bannerImage: '/referrals/railway/banner.png',
        categoryId: cloud.id,
      },
    ],
  })

  console.log('  -> Referrals seeded')
}
