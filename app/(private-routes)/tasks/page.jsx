/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Input } from "@/components/ui/input";
import SortTask from "./_components/sort-task";
import FilterTask from "./_components/filter-task";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { generateQueryString, sanitizeParams } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import ApiKit from "@/common/ApiKit";
import Loading from "@/components/shared/Loading";
import TitleWithButton from "@/components/shared/TitleWithButton";
import ClearFilter from "./_components/clear-filter";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TaskPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "");
  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "",
    order: searchParams.get("order") || "",
    status: searchParams.get("status") || "",
    priority: searchParams.get("priority") || "",
    due_date: searchParams.get("due_date") || "",
  });

  const queryString = generateQueryString(params);

  useEffect(() => {
    router.push(queryString || "/tasks");
  }, [params]);

  const debounced = useDebouncedCallback((value) => {
    setParams((prevParams) => ({
      ...prevParams,
      search: value,
    }));
  }, 400);

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks", params],
    queryFn: () =>
      ApiKit.task.getTasks(sanitizeParams(params)).then((data) => data),
    keepPreviousData: true,
  });

  return (
    <div>
      <div className="my-10 space-y-5">
        <TitleWithButton
          title="Tasks"
          buttonText="Create New Task"
          href="/tasks/new"
        />

        <div className="flex flex-col gap-2 lg:flex-row">
          <Input
            id="search"
            type="text"
            placeholder="Search by task title..."
            className="w-full lg:w-3/5"
            onChange={(event) => {
              debounced(event.target.value);
              setSearchKey(event.target.value);
            }}
            value={searchKey}
            onReset={() => {
              setParams((prevParams) => ({
                ...prevParams,
                search: "",
              }));
              setSearchKey("");
            }}
          />

          <div className="flex w-full items-center gap-2 lg:w-2/5">
            <SortTask params={params} setParams={setParams} />
            <FilterTask params={params} setParams={setParams} />
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="space-y-5">
            <ClearFilter
              params={params}
              setParams={setParams}
              tasks={tasks}
              setSearchKey={setSearchKey}
            />

            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-md bg-accent">
                <div className="border-b-2 py-3 text-center font-semibold">
                  To do
                </div>
                <ScrollArea className="h-[calc(100vh-400px)]">
                  {tasks?.data
                    ?.filter((task) => task?.status === "todo")
                    .map((task) => {
                      return (
                        <div key={task.id} className="m-5 bg-white p-3">
                          <p>{task.title}</p>
                        </div>
                      );
                    })}
                </ScrollArea>
              </div>

              <div className="rounded-md bg-accent">
                <div className="border-b-2 py-3 text-center font-semibold">
                  In progress
                </div>
                <ScrollArea className="h-[calc(100vh-400px)]">
                  {tasks?.data
                    ?.filter((task) => task?.status === "in-progress")
                    .map((task) => {
                      return (
                        <div key={task.id} className="m-5 bg-white p-3">
                          <p>{task.title}</p>
                        </div>
                      );
                    })}
                </ScrollArea>
              </div>

              <div className="rounded-md bg-accent">
                <div className="border-b-2 py-3 text-center font-semibold">
                  Completed
                </div>
                <ScrollArea className="h-[calc(100vh-400px)]">
                  {tasks?.data
                    ?.filter((task) => task?.status === "completed")
                    .map((task) => {
                      return (
                        <div key={task.id} className="m-5 bg-white p-3">
                          <p>{task.title}</p>
                        </div>
                      );
                    })}
                </ScrollArea>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
