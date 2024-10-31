import { getCustomer, getJobsForCustomer } from "../../../lib/data"
import { jobColumns } from "../../jobs/columns"
import { JobDataTable } from "../../jobs/data-table"

export default async function CustomerPage({ params }: { params: { id: string } }) {

  const customer = await getCustomer(parseInt(params.id))

  return <div>
    <div><h1 className={`mb-4 text-xl md:text-2xl`}>{customer?.firstNames} {customer?.lastName}</h1></div>
    <div>Email: {customer?.email}</div>
    <h2>Jobs for this customer:</h2>
    {customer?<JobDataTable columns={jobColumns} data={await getJobsForCustomer(customer)}></JobDataTable>:''}
  </div>
}