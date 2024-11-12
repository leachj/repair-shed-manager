import { z } from "zod";


export const jobSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    parts: z.string().min(2, {
        message: "Parts must be at least 2 characters.",
    }),
    repairs: z.string().min(2, {
        message: "Repairs must be at least 2 characters.",
    }),
    assignToMe: z.boolean()
})