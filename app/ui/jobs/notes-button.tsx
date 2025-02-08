"use client"

import { Job } from "@prisma/client";
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
import { addNotes } from "../../lib/data"


interface NotesButtonProps {
  job: Job
  setJob: (job: Job) => void
}

export default function NotesButton({ job, setJob }: NotesButtonProps) {

  const [notes, setNotes] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Notes</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Notes</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-top">
              Notes
            </Label>
            <Textarea placeholder="" className="w-[300px] h-[200px]" onChange={(value) => setNotes(value.target.value)}></Textarea>
          </div>
        </div>
        <DialogFooter>
        <DialogClose asChild>
          <Button onClick={() => addNotes(job, notes).then(updatedJob => setJob(updatedJob)).then(() => setNotes(""))}>Save changes</Button>
        </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
