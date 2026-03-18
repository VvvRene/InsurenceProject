import { fa, faker } from '@faker-js/faker'; 

import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "~/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    
    await prisma.client.deleteMany();

    const clients = Array.from({ length: 10 }).map(() => ({
        abbreviation: faker.person.gender(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        chineseName: faker.person.fullName(),
        createdAt: faker.date.past(),
        updateAt: faker.date.recent()
    }));

    await prisma.client.createMany({
        data: clients
    });
}

main();