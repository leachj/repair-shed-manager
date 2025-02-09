"use server"

import { Customer, Job, JobAuditType, JobStatus, PrismaClient} from "@prisma/client"
import { getUserId, getUserMap } from "./user";

const prisma = new PrismaClient()

export async function getAllJobs() {
  const jobs = await prisma.job.findMany()
  const userMap = await getUserMap()
  return jobs.map((job) => ({...job, repairer: userMap[job.repairer || "unknown"] || "Unassigned"}))
}

export async function getJob(id: number) {
  const job = await prisma.job.findFirst({where: {id}})
  return job;
}

export async function getJobAudits(id: number) {
  const audits = await prisma.jobAudit.findMany({where: {jobId: id}})
  const userMap = await getUserMap()
  return audits.map((audit) => ({...audit, by: userMap[audit.by] || "unknown"}))
}

export async function getJobsForCustomer(customer: Customer) {
  const jobs = await prisma.job.findMany({where: {customerId: customer.id}});
  const userMap = await getUserMap()
  return jobs.map((job) => ({...job, repairer: userMap[job.repairer || "unknown"] || "Unassigned"}))
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
  const createdJob =  await prisma.job.create({data: {customerId: customer.id, repairer: repairer, ...job}})

  const userId = await getUserId() || "unknown"

  await prisma.jobAudit.create({
      data: {
          jobId: createdJob.id,
          by: userId,
          type: JobAuditType.CREATE,
      }
  })

  return createdJob
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

export async function changeStatus(job: Job, status: JobStatus, notes: string | null): Promise<Job> {
  const previousStatus = job.status
  job.status = status
  job = await prisma.job.update({
      where: { id: job.id },
      data: {
          status: job.status,
          notes: notes? (job.notes || "") + ( notes ? "\n" + notes : ""): job.notes
      },
  })

  await createUpdateAudit(job, "status", previousStatus, job.status)

  return job;
}

export async function assignRepairer(job: Job, repairer: string | null, notes: string): Promise<Job> {
  const previousStatus = job.repairer
  job.repairer = repairer === "unassigned" ? null : repairer
  job = await prisma.job.update({
      where: { id: job.id },
      data: {
          repairer: job.repairer,
          notes: (job.notes || "") + ( notes ? "\n" + notes : "")
      },
  })

  await createUpdateAudit(job, "repairer", previousStatus, job.repairer)

  return job;
}

export async function addNotes(job: Job, notes: string): Promise<Job> {
  job = await prisma.job.update({
      where: { id: job.id },
      data: {
          notes: (job.notes || "") + ( notes ? "\n" + notes : "")
      },
  })

  await createUpdateAudit(job, "notes", null, null)

  return job;
}

export async function addParts(job: Job, parts: string): Promise<Job> {
  job = await prisma.job.update({
      where: { id: job.id },
      data: {
          parts: parts
      },
  })

  await createUpdateAudit(job, "parts", null, null)

  return job;
}

async function createUpdateAudit(job: Job, field: string, previousValue: string | null, newValue: string | null) {

  const userId = await getUserId() || "unknown"

  await prisma.jobAudit.create({
      data: {
          jobId: job.id,
          previousValue: previousValue,
          newValue: newValue,
          by: userId,
          type: JobAuditType.UPDATE,
          field: field
      }
  })
}

