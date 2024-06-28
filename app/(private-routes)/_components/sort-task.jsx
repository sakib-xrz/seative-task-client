"use client";
import { useState } from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const els = [
  {
    value: "priority,asc",
    label: "Priority (Low to High)",
  },
  {
    value: "priority,desc",
    label: "Priority (High to Low)",
  },
  {
    value: "duration,asc",
    label: "Duration (Short to Long)",
  },
  {
    value: "duration,desc",
    label: "Duration (Long to Short)",
  },
  {
    value: "due_date,asc",
    label: "Due Date (Soonest to Latest)",
  },
  {
    value: "due_date,desc",
    label: "Due Date (Latest to Soonest)",
  },
];

export default function SortTask() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex-grow justify-between"
        >
          {value ? els.find((el) => el.value === value)?.label : "Sort task..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search sort by..." className="h-9" />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {els.map((el) => (
                <CommandItem
                  key={el.value}
                  value={el.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {el.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === el.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
