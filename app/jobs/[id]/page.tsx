"use client"

import { getJob, getJobAudits } from "@/app/lib/data"
import Actions from "../../ui/jobs/actions"
import { useEffect, useState } from "react";
import { Job, JobAudit } from "@prisma/client";
import JobAuditLog from "../../ui/jobs/jobAuditLog";

export default function JobPage({ params }: { params: { id: string } }) {

  const [job, setJob] = useState<Job>();
  const [jobAudits, setJobAudits] = useState<JobAudit[]>();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialJob = await getJob(parseInt(params.id))
        if (initialJob) {
          setJob(initialJob);
        }

      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(job) {
          const audits = await getJobAudits(job.id)
          if (audits) {
            setJobAudits(audits);
          }
        }
      } catch (error) {
        console.error('Error fetching audit data:', error);
      }
    };

    fetchData();
  }, [job]);

  if (job) {
    return <div className="grid grid-cols-2 gap-4">
      <div>
        <h2 className="text-3xl font-bold">{job.name}</h2>
        <div className="text-lg mb-10">{job.status.replaceAll("_"," ").toLowerCase()}</div>
        <div>Category: {job.category?.toLowerCase()}</div>
        <div>Sub Category: {job.subCategory?.toLowerCase()}</div>
        <div>Nature: {job.nature?.toLowerCase()}</div>
        <div>Notes: {job.notes?.toLowerCase()}</div>
        <div>Parts: {job.parts?.toLowerCase()}</div>
        <div>Repairs: {job.repairs?.toLowerCase()}</div>
        <div>Assignee: {job.repairer}</div>


        <Actions job={job} setJob={setJob}></Actions>
      </div>

      <JobAuditLog jobAudits={jobAudits}></JobAuditLog>
    </div>
  } else {
    return <div>Job not found</div>
  }


}