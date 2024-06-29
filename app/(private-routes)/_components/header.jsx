"use client";

import Loading from "@/components/shared/Loading";
import useStore from "@/store";
import { UserNav } from "./user-nav";

export default function Header() {
  const { user, userLoading } = useStore();

  if (userLoading) {
    return <Loading className="h-screen" />;
  }
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome back {user?.name?.split(" ")[0]}!
        </h2>
      </div>
      <div className="flex items-center space-x-2">
        <UserNav user={user} />
      </div>
    </div>
  );
}
