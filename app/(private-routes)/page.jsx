"use client";

import Loading from "@/components/shared/Loading";
import useStore from "@/store";
import { UserNav } from "./_components/user-nav";
import Container from "@/components/shared/Container";

export default function HomePage() {
  const { user, userLoading } = useStore();

  if (userLoading) {
    return <Loading className="h-screen" />;
  }

  return (
    <Container>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav user={user} />
        </div>
      </div>
    </Container>
  );
}
