const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


async function main() {
    const username = "area.bot@outlook.com";
    const password = "password";

    await prisma.user.create({
        data: {
          email: username,
          password: password,
        },
    })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})
