const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = ['Twink', 'Bear', 'Daddy', 'Muscle', 'Leather'];
  const categoryRecords = await Promise.all(
    categories.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  // Create users and creator profiles
  for (let i = 1; i <= 3; i++) {
    const user = await prisma.user.create({
      data: {
        email: `creator${i}@test.com`,
        username: `creator${i}`,
        passwordHash: 'hashedpw',
        displayName: `Creator ${i}`,
        bio: `This is the bio of Creator ${i}`,
        isCreator: true,
        role: 'creator',
      },
    });

    const profile = await prisma.creatorProfile.create({
      data: {
        userId: user.id,
        onlyfansUrl: `https://onlyfans.com/creator${i}`,
        twitterUrl: `https://twitter.com/creator${i}`,
        availableForCollabs: true,
        categories: {
          create: {
            categoryId: categoryRecords[i % categories.length].id,
          },
        },
      },
    });

    await prisma.mediaLink.create({
      data: {
        creatorProfileId: profile.id,
        url: `https://videos.example.com/creator${i}`,
        title: `Promo for Creator ${i}`,
        mediaType: 'video',
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());