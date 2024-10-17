import { getAllJobs } from "../../lib/data"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function JobsPage() {
  const jobs = await getAllJobs()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={jobs} />
    </div>
  )
}
