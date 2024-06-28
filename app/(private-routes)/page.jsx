"use client";

import Loading from "@/components/shared/Loading";
import useStore from "@/store";
import { UserNav } from "./_components/user-nav";
import Container from "@/components/shared/Container";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import SortTask from "./_components/sort-task";

export default function HomePage() {
  const { user, userLoading } = useStore();

  if (userLoading) {
    return <Loading className="h-screen" />;
  }

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
            <SortTask />
            <Button variant="outline" className="sm:gap-2">
              <Settings2 className="h-4 w-4" />
              <p className="hidden sm:block">Filter</p>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
