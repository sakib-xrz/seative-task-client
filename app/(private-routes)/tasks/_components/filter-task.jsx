import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import StatusFilter from "./status-filter";
import PriorityFilter from "./priority-filter";
import DueDateFilter from "./duedate-filter";

export default function FilterTask({ params, setParams }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" className="sm:gap-2">
          <ListFilter className="h-4 w-4" />
          <p className="hidden sm:block">Filter</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select filter option</DialogTitle>
          <DialogDescription>
            <p>Filter your tasks by status, priority and due date.</p>
          </DialogDescription>
        </DialogHeader>
        <StatusFilter params={params} setParams={setParams} />
        <PriorityFilter params={params} setParams={setParams} />
        <DueDateFilter params={params} setParams={setParams} />
      </DialogContent>
    </Dialog>
  );
}
