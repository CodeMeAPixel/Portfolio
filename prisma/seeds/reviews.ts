import type { PrismaClient } from '../../src/generated/prisma/client.js'

export async function seedReviews(prisma: PrismaClient) {
  await prisma.clientReview.createMany({
    data: [
      {
        name: 'Ran',
        position: 'Community Member',
        rating: 5,
        review: "The best there is. I've been using Emberly since around 2022, never have I ever been disappointed. It has been my go-to solution for screenshot and video sharing.",
        projectName: 'Emberly',
        featured: true,
      },
      {
        name: 'Wolfie_Gamer',
        position: 'Trustpilot Reviewer',
        rating: 5,
        review: "Quick and easy support system. I opened a ticket and in under 10 minutes I got a response. I was very pleasantly surprised as today is Christmas Eve so I'm certain the team is working with limited members.",
        projectName: 'NodeByte Hosting',
        featured: true,
      },
      {
        name: 'Ollie',
        position: 'Trustpilot Reviewer',
        rating: 5,
        review: 'The excellent panel design. Fast response from staff members seeking support. Good prices for what they offer.',
        projectName: 'NodeByte Hosting',
        featured: true,
      },
    ],
  })

  console.log('  -> Reviews seeded')
}
