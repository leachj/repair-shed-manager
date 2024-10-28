import { JobStatus, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const customer = await prisma.customer.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      email: 'test2@example.com',
      firstNames: 'test',
      lastName: 'two',
    }
  })

  const job = await prisma.job.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'test item 1',
      notes: 'this is a test item',
      customerId: 1
    },
  })
  const job2 = await prisma.job.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'test item 2',
      notes: 'this is another test item',
      customerId: 1
    },
  })
  console.log({ customer, job, job2 })
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