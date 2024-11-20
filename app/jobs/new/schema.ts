import { JobCategory, JobNature, JobSubCategory } from "@prisma/client";
import { z } from "zod";

export const JobCategoryEnum = z.nativeEnum(JobCategory, {message: "Please choose a category"})
export const JobSubCategoryEnum = z.nativeEnum(JobSubCategory, {message: "Please choose a sub category"})
export const JobNatureEnum = z.nativeEnum(JobNature, {message: "Please choose a nature"})



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
    category: JobCategoryEnum,
    subCategory: JobSubCategoryEnum,
    nature: JobNatureEnum,
    assignToMe: z.boolean()
})