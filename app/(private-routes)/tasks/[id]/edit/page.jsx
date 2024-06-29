/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";
import { CalendarIcon, CircleChevronLeft } from "lucide-react";

import ApiKit from "@/common/ApiKit";
import Loading from "@/components/shared/Loading";
import SelectField from "@/components/shared/SelectField";
import FormikError from "@/components/shared/FormikError";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const statusOptions = [
  { value: "todo", label: "To do" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

const priorityOptions = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export default function TaskEdit({ params }) {
  const router = useRouter();
  const { id } = params;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: task, isLoading: isTaskLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: () => ApiKit.task.getTask(id).then(({ data }) => data?.task),
    enabled: !!id,
  });

  const { data: users, isLoading: isUserLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => ApiKit.user.getUsers().then(({ data }) => data?.users),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: null,
      priority: null,
      due_date: null,
      assignees: [],
      duration: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      const payload = {};
      Object.entries(values).forEach(([key, value]) => {
        if (values[key] !== null || values[key] !== "") {
          payload[key] = value;
        }
      });

      const promise = ApiKit.task
        .updateTask(id, payload)
        .then(() => {
          router.push("/tasks");
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          setLoading(false);
        });

      toast.promise(promise, {
        loading: "Updating task...",
        success: "Task updated successfully",
        error: "Failed to update task",
      });
    },
  });

  useEffect(() => {
    if (task) {
      formik.setValues({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        due_date: task.due_date,
        assignees: task.assignees,
        duration: task.duration,
      });
    }
  }, [task]);

  if (isTaskLoading || isUserLoading) return <Loading className="h-screen" />;

  const userOptions = users.map((user) => ({
    value: user._id,
    label: user.name,
  }));

  return (
    <form onSubmit={formik.handleSubmit} className="my-10 space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Link href="/tasks">
          <Button size="icon" variant="ghost">
            <CircleChevronLeft />
          </Button>
        </Link>
        <h2 className="text-lg font-semibold text-primary md:text-2xl">
          Edit Task
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Information</CardTitle>
          <CardDescription>
            Edit the information below to update the task.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="w- grid gap-2">
              <Label htmlFor="title">
                Title<span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                className="w-full"
                placeholder="Enter task title"
                {...formik.getFieldProps("title")}
              />
              <FormikError formik={formik} name="title" />
            </div>
            <div className="w- grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className="min-h-32"
                placeholder="Enter task description"
                {...formik.getFieldProps("description")}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <SelectField
              label="Status"
              options={statusOptions}
              placeholder={"Select status..."}
              onChange={(selected) => {
                formik.setFieldValue("status", selected.value);
              }}
              value={statusOptions.find(
                (option) => option.value === formik.values.status,
              )}
            />
            <SelectField
              label="Priority"
              options={priorityOptions}
              placeholder={"Select priority..."}
              onChange={(selected) => {
                formik.setFieldValue("priority", selected.value);
              }}
              value={priorityOptions.find(
                (option) => option.value === formik.values.priority,
              )}
            />
            <Popover open={open} onOpenChange={setOpen}>
              <div className="flex flex-col gap-2 max-sm:w-full">
                <Label htmlFor="due_date">Select Due Date</Label>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-between text-muted-foreground",
                      formik.values.due_date && "text-black",
                    )}
                  >
                    {formik.values.due_date ? (
                      format(new Date(formik.values.due_date), "PPP")
                    ) : (
                      <span>Select due date...</span>
                    )}
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
              </div>
              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={new Date(formik.values.due_date)}
                  onSelect={(date) => {
                    formik.setFieldValue(
                      "due_date",
                      format(date, "P").split("/").join("-"),
                    );
                    setOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <SelectField
                label="Assignees"
                options={userOptions}
                placeholder={"Select assignees..."}
                isSearchable
                isMulti
                onChange={(selected) => {
                  formik.setFieldValue(
                    "assignees",
                    selected.map((user) => user.value),
                  );
                }}
                value={userOptions.filter((user) =>
                  formik.values.assignees?.includes(user.value),
                )}
              />
            </div>

            <div className="col-span-4 grid gap-2">
              <Label htmlFor="duration">Duration (Hour)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="Enter task duration"
                {...formik.getFieldProps("duration")}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button loading={loading} type="submit">
            Update Task
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
