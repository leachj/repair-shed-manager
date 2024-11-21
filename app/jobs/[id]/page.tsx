"use client"

import { getJob } from "@/app/lib/data"
import Actions from "../../ui/jobs/actions"
import { useEffect, useState } from "react";
import { Job } from "@prisma/client";

export default function JobPage({ params }: { params: { id: string } }) {

  const [job, setJob] = useState<Job>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialJob = await getJob(parseInt(params.id))
        if (initialJob) {
          setJob(initialJob);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (job) {
    return <div>
      <h2 className="text-3xl font-bold">{job.name}</h2>
      <div className="text-lg mb-10">{job.status.replaceAll("_"," ").toLowerCase()}</div>
      <div>Category: {job.category?.toLowerCase()}</div>
      <div>Sub Category: {job.subCategory?.toLowerCase()}</div>
      <div>Nature: {job.nature?.toLowerCase()}</div>
      <div>Notes: {job.notes?.toLowerCase()}</div>
      <div>Parts: {job.parts?.toLowerCase()}</div>
      <div>Repairs: {job.repairs?.toLowerCase()}</div>

      <Actions job={job} setJob={setJob}></Actions>
    </div>
  } else {
    return <div>Job not found</div>
  }


}