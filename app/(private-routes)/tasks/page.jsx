/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Input } from "@/components/ui/input";
import SortTask from "./_components/sort-task";
import FilterTask from "./_components/filter-task";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { generateQueryString } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

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

  return (
    <div>
      <div className="my-10">
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

        <div className="mt-5 flex justify-end">
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
              className="group cursor-pointer space-x-1 hover:border-destructive hover:text-destructive"
            >
              <span>Clear all</span>
              <X className="h-4 w-4 group-hover:text-destructive" />
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
