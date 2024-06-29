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
import { Settings2 } from "lucide-react";
import StatusFilter from "./status-filter";
import PriorityFilter from "./priority-filter";
import FilterDueDate from "./filter-duedate";

export default function FilterTask() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" className="sm:gap-2">
          <Settings2 className="h-4 w-4" />
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
        <StatusFilter />
        <PriorityFilter />
        <FilterDueDate />
      </DialogContent>
    </Dialog>
  );
}
