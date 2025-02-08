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
import { assignRepairer } from "../../lib/data"


interface AssignButtonProps {
  job: Job
  setJob: (job: Job) => void
  userMap: Record<string, string>
}

export default function AssignButton({ job, setJob, userMap }: AssignButtonProps) {

  const [repairer, setRepairer] = useState(job.repairer);
  const [notes, setNotes] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Assign</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Job</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Repairer
            </Label>
            <Select onValueChange={(value) => setRepairer(value as JobStatus)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a repairer" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Repairer</SelectLabel>
                    {Object.keys(userMap).map((userId) => (
                    <SelectItem key={userId} value={userId}>
                      {userMap[userId]}
                    </SelectItem>
                    ))}
                    <SelectItem value="unassigned">
                      Unassigned
                    </SelectItem>
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
        <DialogClose asChild>
          <Button onClick={() => assignRepairer(job, repairer, notes).then(updatedJob => setJob(updatedJob)).then(() => setNotes(""))}>Save changes</Button>
        </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
