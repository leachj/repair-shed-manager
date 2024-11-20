"use client"

import { Customer } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/app/ui/dashboard/data-table-column-header"
import Link from "next/link"

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => {
      return <Link href={`/customers/${row.getValue("id")}`}><Button variant={"link"}>{row.getValue("id") as string}</Button></Link>
    },
  },
  {
    accessorKey: "firstNames",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Names" />
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  }
]
