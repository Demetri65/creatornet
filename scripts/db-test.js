const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        username: 'testuser',
        passwordHash: 'hashedpassword',
      },
    });

    return user;
  }

  main()
  .then((user) => {
    console.log(user); // ✅ now this is defined
    console.log(user.username); // ✅ safe
  })
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());