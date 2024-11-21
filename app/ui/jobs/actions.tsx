"use client"

import { Job, JobStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import CompleteButton from "./complete-button";
import { changeStatus } from "../../lib/data"


interface ActionProps {
  job: Job
  setJob: (job: Job) => void
}

export default function Actions({ job, setJob }: ActionProps) {

  return (
    <div className="mt-10">
      <h2>Actions</h2>
      <div className="grid grid-flow-col auto-cols-max">
      {job.status === JobStatus.ITEM_IN_SHED && <div className="m-2"><Button onClick={() => changeStatus(job, JobStatus.BEING_ASSESSED, "").then(job => setJob(job))}>Being assessed</Button></div>}
      {(job.status === JobStatus.BEING_ASSESSED || job.status === JobStatus.REAPIR_IN_HAND) && <div className="m-2"><CompleteButton job={job} setJob={setJob}/></div>}
      {job.status === JobStatus.BEING_ASSESSED && <div className="m-2"><Button>Parts Costed</Button></div>}
      {job.status === JobStatus.BEING_ASSESSED && <div className="m-2"><Button  onClick={() => changeStatus(job, JobStatus.REAPIR_IN_HAND, "").then(job => setJob(job))}>Repair in hand</Button></div>}
      </div>
    </div>
  );
}
