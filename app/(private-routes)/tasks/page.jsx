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

import TaskGrid from "./_components/task-grid";

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

            <TaskGrid tasks={tasks} refetch={refetch} />
          </div>
        )}
      </div>
    </div>
  );
}
