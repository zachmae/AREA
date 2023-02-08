const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function findManyUsers() {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

async function addUsers() {
    await prisma.user.create({
      data: {
        name: 'Erwan',
        email: 'erwan@prisma.io',
        posts: {
          create: { title: 'Hello World' },
        },
        profile: {
          create: { bio: 'I like turtles' },
        },
      },
    })
}


async function main() {
    await addUsers()
    await findManyUsers()
//  const allUsers = await prisma.user.findMany()
//  console.log(allUsers)
}


main().then(async () => {
        await prisma.$disconnect()
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
