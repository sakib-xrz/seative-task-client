"use client";
import { useState } from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const sortOptions = [
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
    label: "Duration (Low to High)",
  },
  {
    value: "duration,desc",
    label: "Duration (High to Low)",
  },
  {
    value: "due_date,asc",
    label: "Due Date (Low to High)",
  },
  {
    value: "due_date,desc",
    label: "Due Date (High to Low)",
  },
];

export default function SortTask({ params, setParams }) {
  const [open, setOpen] = useState(false);
  const { sortBy, order } = params;
  const value = sortBy && order ? `${sortBy},${order}` : "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex-grow justify-between"
        >
          {value
            ? sortOptions.find((el) => el.value === value)?.label
            : "Sort task..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {sortOptions.map((el) => (
                <CommandItem
                  key={el.value}
                  value={el.value}
                  onSelect={(currentValue) => {
                    setParams({
                      ...params,
                      sortBy: currentValue.split(",")[0],
                      order: currentValue.split(",")[1],
                    });
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
