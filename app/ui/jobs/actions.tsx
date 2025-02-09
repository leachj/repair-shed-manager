"use client"

import { Job, JobStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import CompleteButton from "./complete-button";
import { changeStatus } from "../../lib/data"
import AssignButton from "./assign-button";
import NotesButton from "./notes-button";
import PartsButton from "./parts-button";

const completeStatuses: JobStatus[] = [JobStatus.COMPLETE_REPAIR_SUCCESSFUL, JobStatus.COMPLETE_ITEM_SCRAPPER, JobStatus.COMPLETE_ITEM_NOT_REPAIRED]

interface ActionProps {
  job: Job
  setJob: (job: Job) => void
  userMap: Record<string, string>
}

export default function Actions({ job, setJob, userMap }: ActionProps) {

  return (
    <div className="mt-10">
      <h2>Actions</h2>
      <div className="flex flex-wrap">
      {!completeStatuses.includes(job.status) && <div className="m-1"><AssignButton job={job} setJob={setJob} userMap={userMap}/></div>}
      {!completeStatuses.includes(job.status) && <div className="m-1"><NotesButton job={job} setJob={setJob} /></div>}
      {job.status === JobStatus.ITEM_IN_SHED && <div className="m-1"><Button onClick={() => changeStatus(job, JobStatus.BEING_ASSESSED, "").then(job => setJob(job))}>Being assessed</Button></div>}
      {(job.status === JobStatus.BEING_ASSESSED || job.status === JobStatus.REAPIR_IN_HAND) && <div className="m-1"><CompleteButton job={job} setJob={setJob}/></div>}
      {job.status === JobStatus.BEING_ASSESSED && <div className="m-1"><PartsButton job={job} setJob={setJob} /></div>}
      {(job.status === JobStatus.BEING_ASSESSED || job.status === JobStatus.PARTS_ORDERED) && <div className="m-1"><Button  onClick={() => changeStatus(job, JobStatus.REAPIR_IN_HAND, "").then(job => setJob(job))}>Repair in hand</Button></div>}
      {completeStatuses.includes(job.status)  && <div className="m-1"><Button  onClick={() => changeStatus(job, JobStatus.BEING_ASSESSED, "").then(job => setJob(job))}>Reopen</Button></div>}

      </div>
    </div>
  );
}
