import { ScrollArea } from "@/components/ui/scroll-area";
import TaskCard from "./task-card";
import ApiKit from "@/common/ApiKit";
import { toast } from "sonner";

const TASK_STATUSES = ["todo", "in-progress", "completed"];

export default function TaskGrid({ tasks, refetch }) {
  const onDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const sourceStatus = e.dataTransfer.getData("sourceStatus");

    if (sourceStatus !== newStatus) {
      const draggedTask = tasks.data.find((task) => task._id === taskId);
      if (draggedTask) {
        draggedTask.status = newStatus;

        const promise = ApiKit.task
          .updateTask(draggedTask._id, { status: newStatus })
          .then(() => {
            refetch();
          })
          .catch((error) => {
            console.error(error);
          });

        toast.promise(promise, {
          loading: "Updating task...",
          success: "Task updated successfully",
          error: "Failed to update task",
        });
      }
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {TASK_STATUSES.map((status) => (
        <div
          key={status}
          className="rounded-md bg-accent"
          onDrop={(e) => onDrop(e, status)}
          onDragOver={allowDrop}
        >
          <div className="border-b-2 py-3 text-center font-semibold">
            {status.replace("-", " ")}{" "}
            <span className="text-xs text-muted-foreground">
              ({tasks?.data?.filter((task) => task?.status === status)?.length})
            </span>
          </div>
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-2 p-2">
              {tasks?.data
                ?.filter((task) => task?.status === status)
                .map((task, index) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    refetch={refetch}
                    index={index}
                  />
                ))}
            </div>
          </ScrollArea>
        </div>
      ))}
    </div>
  );
}
