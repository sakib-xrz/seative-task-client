import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function DueDateFilter({ params, setParams }) {
  const [open, setOpen] = useState(false);
  const value = params?.dueDate;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("justify-between", value && "text-black")}
        >
          {value ? format(value, "PPP") : <span>Filter by due date...</span>}
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar
          mode="single"
          selected={new Date(value)}
          onSelect={(date) => {
            setParams({
              ...params,
              dueDate: format(date, "P").split("/").join("-"),
            });
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
