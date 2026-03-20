import { fa, faker } from '@faker-js/faker'; 

import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../app/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Cleaning database...');
  await prisma.clientFile.deleteMany();
  await prisma.vehiclePolicyDetail.deleteMany();
  await prisma.homePolicyDetail.deleteMany();
  await prisma.lifePolicyDetail.deleteMany();
  await prisma.insurancePolicy.deleteMany();
  await prisma.client.deleteMany();
  await prisma.broker.deleteMany();
  await prisma.insuranceCompany.deleteMany();
  await prisma.currency.deleteMany();

  console.log('Seeding reference data...');
  
  // 1. Seed Currencies
  const currencies = await Promise.all([
    prisma.currency.create({ data: { abbr: 'HKD', rate: 1.0 } }),
    prisma.currency.create({ data: { abbr: 'USD', rate: 7.8 } }),
    prisma.currency.create({ data: { abbr: 'GBP', rate: 10.2 } }),
  ]);

  // 2. Seed Insurance Companies
  const companies = await Promise.all(
    ['AXA', 'Allianz', 'Prudential', 'AIA', 'Zurich'].map((name) =>
      prisma.insuranceCompany.create({ data: { name } })
    )
  );

  // 3. Seed Brokers
  const brokers = await Promise.all(
    ['Marsh', 'Aon', 'Willis Towers Watson', 'Local Broker Ltd'].map((name) =>
      prisma.broker.create({ data: { name } })
    )
  );

  console.log('Seeding clients and policies...');

  // 4. Seed Clients
  for (let i = 0; i < 20; i++) {
    const isCompany = faker.datatype.boolean();
    
    const client = await prisma.client.create({
      data: {
        type: isCompany ? 'Company' : 'Individual',
        identity: isCompany ? faker.string.alphanumeric(8).toUpperCase() : faker.string.alphanumeric(7).toUpperCase(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        chineseName: faker.datatype.boolean() ? faker.person.fullName() : null, // Placeholder for Chinese name logic
        phoneNumber: faker.phone.number(),
        email: faker.internet.email(),
        files: {
          create: [
            { name: 'ID_Copy.pdf', path: `/uploads/clients/id_${faker.string.uuid()}.pdf` },
            { name: 'Address_Proof.png', path: `/uploads/clients/addr_${faker.string.uuid()}.png` },
          ],
        },
      },
    });

    // 5. Seed 1-3 Policies per Client
    const policyCount = faker.number.int({ min: 1, max: 3 });
    
    for (let j = 0; j < policyCount; j++) {
      const category = faker.helpers.arrayElement(['Vehicle', 'Home', 'Life']);
      const effectiveDate = faker.date.past();
      const expiryDate = new Date(effectiveDate);
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);

      await prisma.insurancePolicy.create({
        data: {
          processType: faker.helpers.arrayElement(['New', 'Renewal']),
          category: category,
          status: faker.helpers.arrayElement(['Active', 'Lapsed', 'Pending']),
          policyNumber: `POL-${faker.string.alphanumeric(10).toUpperCase()}`,
          quotationNumber: `QTN-${faker.string.numeric(8)}`,
          clientId: client.id,
          insuranceCompanyId: faker.helpers.arrayElement(companies).id,
          brokerId: faker.helpers.arrayElement(brokers).id,
          effectiveDate: effectiveDate,
          expiryDate: expiryDate,
          premiumAmount: faker.number.float({ min: 1000, max: 50000, fractionDigits: 2 }),
          currency: faker.helpers.arrayElement(currencies).abbr,
          
          // One-to-One Relation handling based on category
          ...(category === 'Vehicle' && {
            vehicleDetail: {
              create: {
                coverageType: faker.helpers.arrayElement(['Comprehensive', 'Third Party']),
                registrationNumber: faker.vehicle.vrm(),
                seatNumber: faker.helpers.arrayElement(['2', '4', '5', '7']),
                engineNumber: faker.vehicle.vin().substring(0, 10),
                chassisNumber: faker.vehicle.vin(),
                manufacturer: faker.vehicle.manufacturer(),
                modelName: faker.vehicle.model(),
                yearOfManufacture: faker.date.past({ years: 10 }).getFullYear().toString(),
              }
            }
          }),
          ...(category === 'Home' && {
            homeDetail: {
              create: {
                propertyAddress: faker.location.streetAddress(true),
                propertyType: faker.helpers.arrayElement(['Apartment', 'House']),
                sumInsuredStructure: faker.number.float({ min: 1000000, max: 10000000 }),
                isMortgaged: faker.datatype.boolean(),
              }
            }
          }),
          ...(category === 'Life' && {
            lifeDetail: {
              create: {
                beneficiaryName: faker.person.fullName(),
                sumAssured: faker.number.float({ min: 500000, max: 5000000 }),
                medicalRequired: faker.datatype.boolean(),
              }
            }
          }),
        },
      });
    }
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e); 
  })
  .finally(async () => {
    await prisma.$disconnect();
  });