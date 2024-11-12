import { getJob } from "../../../lib/data"

export default async function JobPage({ params }: { params: { id: string } }) {

  const job = await getJob(parseInt(params.id))
  return <div>
    <h2>Job: {job?.name}</h2>
    <div>Category: {job?.category?.toLowerCase()}</div>
    <div>Sub Category: {job?.subCategory?.toLowerCase()}</div>
    <div>Nature: {job?.nature?.toLowerCase()}</div>
  </div>
}