import { getJob } from "../../../lib/data"

export default async function JobPage({ params }: { params: { id: string } }) {

  const job = await getJob(parseInt(params.id))
  return <div>Job: {job?.name}</div>
}