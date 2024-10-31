import { getAllCustomers } from "../../lib/data"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export const dynamic = "force-dynamic"

export default async function JobsPage() {
  const customers = await getAllCustomers()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={customers} />
    </div>
  )
}
