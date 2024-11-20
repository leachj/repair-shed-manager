"use server";

import { z } from "zod";
import { createCustomer } from "@/app/lib/data";
import { customerSchema } from "./schema";
import { Customer } from "@prisma/client";


export async function createCustomerAction(customer: z.infer<typeof customerSchema>): Promise<Customer> {
  
  return await createCustomer(customer)

}