"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation'


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
import { customerSchema } from "./schema"
import { createCustomerAction } from "./action"

export default function CustomerForm() {

    const form = useForm<z.infer<typeof customerSchema>>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            firstNames: "",
            lastName: "",
            email: "",
        },
    })
    const router = useRouter()

      async function onSubmit(values: z.infer<typeof customerSchema>) {
        const customer = await createCustomerAction(values)
        router.push(`/customers/${customer.id}`)
      }
      
    return (
        <div>
            <h1 className={`mb-4 text-xl md:text-2xl`}>
                Create a new customer
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="firstNames"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First names</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Form>
        </div>
    )
}
