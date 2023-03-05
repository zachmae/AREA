# Setup from scratch

## Relational databases Javascript / Postgres

### Prerequisites

- Node.js installed
- Postgresql db running

### Create project setup

create a project directory

```sh
$>   mkdir hello-prisma
$>   cd hello-prisma
```

initialize a Node.js project

```sh
$>   npm init -y
```

add the Prisma CLI as a development dependency

```sh
$>  npm install prisma -save-dev
```

invoke prisma cli

```sh
npx prisma
```

set up your Prisma project

```sh
npx prisma init
```

This command does two things:

- creates a new directory called prisma that contains a file called schema.prisma
- creates the .env file in the root directory of the project

## Connect your database

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
```

Here's a short explanation of each component:

- `USER`: The name of your database user
- `PASSWORD`: The password for your database user
- `HOST`: The name of your host name (for the local environment, it is localhost)
- `PORT`: The port where your database server is running (typically 5432 for PostgreSQL)
- `DATABASE`: The name of the database
- `SCHEMA`: The name of the schema inside the database

If you're unsure what to provide for the schema parameter for a PostgreSQL connection URL, you can probably omit it. In that case, the default schema name public will be used.

## Prisma Migrate

### Creating the database schema

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}
```

To map your data model to the database schema, you need to use the prisma migrate CLI commands:

```sh
npx prisma migrate dev --name init
```

This command does two things:

- It creates a new SQL migration file for this migration
- It runs the SQL migration file against the database


## Install Prisma Client

```sh
npm install @prisma/client
```

### Querying the database

Create a new file named index.js and add the following code to it:

```js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

Inside the main function, add the following query to read all User records from the database and print the result:

```js
async function main() {
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
}
```

Now run the code using the same command as before:

```sh
node index.js
```

## Next steps


Continue exploring the Prisma Client API

full docs: `https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create`

## Explore the data in Prisma Studio

Prisma Studio is a visual editor for the data in your database. Run the command in a terminal in the same folder of `prisma.schema`

```sh
npx prisma studio
```

## Thank For Reading

### @Perry-Chouteau