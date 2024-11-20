import { getAllJobs } from "@/app/lib/data"
import { jobColumns } from "./columns"
import { JobDataTable } from "./data-table"
export const dynamic = "force-dynamic"


export default async function JobsPage() {
  const jobs = await getAllJobs()

  return (
    <div className="container mx-auto py-10">
      <JobDataTable columns={jobColumns} data={jobs} />
    </div>
  )
}
