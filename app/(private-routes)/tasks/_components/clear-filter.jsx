import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function ClearFilter({
  params,
  setParams,
  tasks,
  setSearchKey,
}) {
  return (
    <div className="mt-5 flex justify-between gap-2">
      <p className="max-sm: text-sm">
        Showing results of {tasks?.meta?.total} tasks
      </p>
      {(params.search ||
        params.sortBy ||
        params.order ||
        params.status ||
        params.priority ||
        params.due_date) && (
        <Badge
          size={"lg"}
          onClick={() => {
            setParams({
              search: "",
              sortBy: "",
              order: "",
              status: "",
              priority: "",
              due_date: "",
            }),
              setSearchKey("");
          }}
          variant="outline"
          className="group w-fit cursor-pointer space-x-1 hover:border-destructive hover:text-destructive"
        >
          <span>Clear all</span>
          <X className="h-4 w-4 group-hover:text-destructive" />
        </Badge>
      )}
    </div>
  );
}
