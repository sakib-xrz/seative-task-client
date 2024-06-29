import { ScrollArea } from "@/components/ui/scroll-area";
import TaskCard from "./task-card";

export default function TaskGrid({ tasks }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <div className="rounded-md bg-accent">
        <div className="border-b-2 py-3 text-center font-semibold">
          To do{" "}
          <span className="text-xs text-muted-foreground">
            ({tasks?.data?.filter((task) => task?.status === "todo")?.length})
          </span>
        </div>
        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="space-y-2 p-2">
            {tasks?.data
              ?.filter((task) => task?.status === "todo")
              .map((task) => {
                return <TaskCard key={task._id} task={task} />;
              })}
          </div>
        </ScrollArea>
      </div>

      <div className="rounded-md bg-accent">
        <div className="border-b-2 py-3 text-center font-semibold">
          In progress{" "}
          <span className="text-xs text-muted-foreground">
            (
            {
              tasks?.data?.filter((task) => task?.status === "in-progress")
                ?.length
            }
            )
          </span>
        </div>
        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="space-y-2 p-2">
            {tasks?.data
              ?.filter((task) => task?.status === "in-progress")
              .map((task) => {
                return <TaskCard key={task._id} task={task} />;
              })}
          </div>
        </ScrollArea>
      </div>

      <div className="rounded-md bg-accent">
        <div className="border-b-2 py-3 text-center font-semibold">
          Completed{" "}
          <span className="text-xs text-muted-foreground">
            (
            {
              tasks?.data?.filter((task) => task?.status === "completed")
                ?.length
            }
            )
          </span>
        </div>
        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="space-y-2 p-2">
            {tasks?.data
              ?.filter((task) => task?.status === "completed")
              .map((task) => {
                return <TaskCard key={task._id} task={task} />;
              })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
