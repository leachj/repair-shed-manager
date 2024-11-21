"use client"

import { Job, JobStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { changeStatus } from "../../lib/data"


interface CompleteButtonProps {
  job: Job
  setJob: (job: Job) => void
}

export default function CompleteButton({ job, setJob }: CompleteButtonProps) {

  const [status, setStatus] = useState(job.status);
  const [notes, setNotes] = useState("");


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Complete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Mark as Complete</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Result
            </Label>
            <Select onValueChange={(value) => setStatus(value as JobStatus)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a result" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Result</SelectLabel>
                  <SelectItem value="COMPLETE_REPAIR_SUCCESSFUL">Repaired</SelectItem>
                  <SelectItem value="COMPLETE_ITEM_NOT_REPAIRED">Not Repaired</SelectItem>
                  <SelectItem value="COMPLETE_ITEM_SCRAPPER">Scrapped</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-top">
              Notes
            </Label>
            <Textarea placeholder="Optional" className="w-[300px] h-[200px]" onChange={(value) => setNotes(value.target.value)}></Textarea>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => changeStatus(job, status, notes).then(updatedJob => setJob(updatedJob))}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
