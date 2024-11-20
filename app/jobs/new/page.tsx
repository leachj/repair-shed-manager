"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter, useSearchParams } from 'next/navigation'


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { jobSchema, JobCategoryEnum, JobSubCategoryEnum, JobNatureEnum } from "./schema"
import { createJobAction } from "./action"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function JobForm() {

    const form = useForm<z.infer<typeof jobSchema>>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            name: "",
            repairs: "",
            parts: "",
            assignToMe: false,
        },
    })
    const router = useRouter()
    const searchParams = useSearchParams()
    const customerId = searchParams.get('customerId')

    async function onSubmit(values: z.infer<typeof jobSchema>) {
        const job = await createJobAction(values, customerId)
        router.push(`/jobs/${job.id}`)
    }

    return (
        <div>
            <h1 className={`mb-4 text-xl md:text-2xl`}>
                Create a new Job
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Item name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="parts"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Parts brought in</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="repairs"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Repair needed</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.keys(JobCategoryEnum.enum).map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option.toLowerCase()}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subCategory"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sub Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a sub category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.keys(JobSubCategoryEnum.enum).map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option.toLowerCase()}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nature"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nature</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a nature" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.keys(JobNatureEnum.enum).map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option.toLowerCase().replaceAll("_"," ")}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="assignToMe"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                                <FormControl>
                                    <Checkbox checked={field.value}
                                        onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Assign to me
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Form>
        </div>
    )
}
