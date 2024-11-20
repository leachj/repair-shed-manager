import { z } from "zod";

export const customerSchema = z.object({
    firstNames: z.string().min(2, {
        message: "First names must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last Name must be at least 2 characters.",
    }),
    email: z.union([
        z.literal(''),
        z.string().email(),
    ]),
})