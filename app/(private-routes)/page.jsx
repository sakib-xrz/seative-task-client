"use client";

import Loading from "@/components/shared/Loading";
import useStore from "@/store";

export default function HomePage() {
  const { user, userLoading } = useStore();

  if (userLoading) {
    return <Loading className="h-screen" />;
  }

  console.log("user", user);

  return null;
}
