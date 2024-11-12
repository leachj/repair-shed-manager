
import { Customer, Job, PrismaClient} from "@prisma/client"
import { getUserId } from "./user";

const prisma = new PrismaClient()

export async function getAllJobs() {
  const jobs = prisma.job.findMany()
  return jobs;
}

export async function getJob(id: number) {
  const job = prisma.job.findFirst({where: {id}})
  return job;
}

export async function getJobsForCustomer(customer: Customer) {
  const jobs = prisma.job.findMany({where: {customerId: customer.id}});
  return jobs;
}


export async function getAllCustomers() {
  const jobs = prisma.customer.findMany()
  return jobs;
}

export async function getCustomer(id: number): Promise<Customer | null> {
  const customer = prisma.customer.findFirst({where: {id}})
  return customer;
}

export async function createCustomer(customer: Pick<Customer, "lastName" | "firstNames" | "email">) {
  return await prisma.customer.create({data: customer})
}

export async function createJob(job: Pick<Job, "name" | "parts" | "repairs" | "category" | "subCategory" | "nature">, customer: Customer, repairer?: string) {
  return await prisma.job.create({data: {customerId: customer.id, repairer: repairer, ...job}})
}


export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const userId = await getUserId();
    const jobCountPromise = prisma.job.count();
    const customerCountPromise = prisma.customer.count();
    const numberOfJobsAssignedToMePromise = prisma.job.count({where: {repairer: userId}})
    
    const data = await Promise.all([
      jobCountPromise,
      customerCountPromise,
      numberOfJobsAssignedToMePromise
    ]);


    const numberOfJobs = Number(data[0] ?? '0');
    const numberOfCustomers = Number(data[1] ?? '0');
    const numberOfJobsAssignedToMe = Number((userId && data[2]) ?? '0');
  
    return {
      numberOfCustomers,
      numberOfJobs,
      numberOfJobsAssignedToMe
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}