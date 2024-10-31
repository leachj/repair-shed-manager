"use client"

import { Job } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "../../ui/dashboard/data-table-column-header"
import Link from "next/link"

export const jobColumns: ColumnDef<Job>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => {
      return <Button variant={"link"}><Link href={`/dashboard/jobs/${row.getValue("id")}`}>{row.getValue("id") as string}</Link></Button>
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return <div className="text-transform: capitalize">{(row.getValue("status") as string).replaceAll("_"," ").toLowerCase()}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      return <div>{(row.getValue("createdAt") as Date).toLocaleDateString("en-GB")}</div>
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
  }
]
