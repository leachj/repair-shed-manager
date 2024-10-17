
import { PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export async function getAllJobs() {
  const jobs = prisma.job.findMany()
  return jobs;
}

export async function getJob(id: number) {
  const job = prisma.job.findFirst({where: {id}})
  return job;
}


export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const jobCountPromise = prisma.job.count();
    const customerCountPromise = prisma.customer.count();
    
    const data = await Promise.all([
      jobCountPromise,
      customerCountPromise,
    ]);


    const numberOfJobs = Number(data[0] ?? '0');
    const numberOfCustomers = Number(data[1] ?? '0');
  
    return {
      numberOfCustomers,
      numberOfJobs,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}