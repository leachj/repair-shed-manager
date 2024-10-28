"use client"

import { Customer } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "../../ui/dashboard/data-table-column-header"
import Link from "next/link"

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => {
      return <Button variant={"link"}><Link href={`/dashboard/customers/${row.getValue("id")}`}>{row.getValue("id") as String}</Link></Button>
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
