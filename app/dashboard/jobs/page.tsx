import { getAllJobs } from "../../lib/data"
import { jobColumns } from "./columns"
import { JobDataTable } from "./data-table"

export default async function JobsPage() {
  const jobs = await getAllJobs()

  return (
    <div className="container mx-auto py-10">
      <JobDataTable columns={jobColumns} data={jobs} />
    </div>
  )
}
