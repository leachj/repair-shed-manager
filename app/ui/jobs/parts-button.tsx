"use client"

import { Job, JobStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { addParts, changeStatus } from "../../lib/data"


interface PartsButtonProps {
  job: Job
  setJob: (job: Job) => void
}

export default function PartsButton({ job, setJob }: PartsButtonProps) {

  const [notes, setParts] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Parts ordered</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Parts</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-top">
              Parts
            </Label>
            <Textarea placeholder="" className="w-[300px] h-[200px]" onChange={(value) => setParts(value.target.value)}></Textarea>
          </div>
        </div>
        <DialogFooter>
        <DialogClose asChild>
          <Button onClick={() => addParts(job, notes).then((updatedJob) => changeStatus(updatedJob, JobStatus.PARTS_ORDERED,null)).then(updatedJob => setJob(updatedJob)).then(() => setParts(""))}>Save changes</Button>
        </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
