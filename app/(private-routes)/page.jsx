"use client";

import Loading from "@/components/shared/Loading";
import useStore from "@/store";
import { UserNav } from "./_components/user-nav";
import Container from "@/components/shared/Container";
import { Input } from "@/components/ui/input";
import SortTask from "./_components/sort-task";
import FilterTask from "./_components/filter-task";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { generateQueryString } from "@/lib/utils";

export default function HomePage() {
  const { user, userLoading } = useStore();
  const router = useRouter();
  const searchParams = useSearchParams();
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
    router.push(queryString);
  }, [queryString, router]);

  if (userLoading) {
    return <Loading className="h-screen" />;
  }

  console.log(params);

  return (
    <Container>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome back {user?.name?.split(" ")[0]}!
          </h2>
          <p className="hidden text-muted-foreground sm:block">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav user={user} />
        </div>
      </div>

      <div className="my-10">
        <div className="flex flex-col gap-2 lg:flex-row">
          <Input
            id="search"
            type="text"
            placeholder="Search by task title..."
            className="w-full lg:w-3/5"
          />

          <div className="flex w-full items-center gap-2 lg:w-2/5">
            <SortTask params={params} setParams={setParams} />
            <FilterTask params={params} setParams={setParams} />
          </div>
        </div>
      </div>
    </Container>
  );
}
