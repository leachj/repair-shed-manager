"use server";

import { z } from "zod";
import { createJob, getCustomer } from "../../../lib/data";
import { jobSchema } from "./schema";
import { Job } from "@prisma/client";
import { getUserId } from "../../../lib/user";


export async function createJobAction(jobParams: z.infer<typeof jobSchema>, customerId: string | null): Promise<Job> {
  
  const customer = await getCustomer(parseInt(customerId || ""))
  let repairer = undefined
  if(jobParams.assignToMe) {
    repairer = await getUserId() || undefined
  }
  
  const job = { ...jobParams, assignToMe: undefined };
  if(customer) {
    return await createJob(job, customer, repairer)
  } else {
    throw new Error("Customer not found")
  }

}