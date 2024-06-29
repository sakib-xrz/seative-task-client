import {
  Pencil,
  Trash,
  Clock,
  Flag,
  Calendar,
  MoreVertical,
  Timer,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatText } from "@/lib/utils";

export default function TaskCard({ task }) {
  const isDueDateOver = new Date(task?.due_date) < new Date();
  return (
    <div key={task?._id} className="rounded-lg bg-white shadow-lg">
      <div className="flex items-center justify-between gap-2 px-4 py-4 lg:gap-4 lg:px-6">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="" alt={task?.creator?.name} />
            <AvatarFallback>
              {task?.creator?.name
                ?.split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs text-muted-foreground">Created by</p>
            <h5 className="text-sm font-medium">{task?.creator?.name}</h5>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer rounded-full p-2 hover:bg-accent">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer gap-2">
              <Pencil size={16} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 focus:bg-destructive focus:text-white">
              <Trash size={16} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-6">
        <h2 className="font-semibold">{task?.title}</h2>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-4 text-sm text-gray-600 lg:px-6">
        <div className="flex items-center space-x-2">
          <Flag
            className={
              task?.status === "in-progress"
                ? "text-orange-500"
                : task?.status === "completed"
                  ? "text-green-500"
                  : "text-red-500"
            }
            size={16}
          />
          <span
            className={
              task?.status === "in-progress"
                ? "text-orange-500"
                : task?.status === "completed"
                  ? "text-green-500"
                  : "text-red-500"
            }
          >
            {formatText(task?.status)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="text-gray-500" size={16} />
          <span className="priority capitalize">{task?.priority} priority</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between px-4 pb-4 text-sm text-gray-600 lg:px-6">
        <div className="flex items-center space-x-2">
          <Timer className="text-gray-500" size={16} />
          <span className="due-date">
            Duration: {task?.duration} {task?.duration > 1 ? "hours" : "hour"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar
            className={`due-date ${isDueDateOver ? "text-red-500" : "text-gray-500"}`}
            size={16}
          />
          <span
            className={`due-date ${isDueDateOver ? "text-red-500" : "text-gray-600"}`}
          >
            {" "}
            Due: {new Date(task?.due_date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
