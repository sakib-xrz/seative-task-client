/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/tasks");
  }, []);
  return (
    <div className="absolute inset-0 z-10 flex h-screen w-full items-center justify-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      Loading...
    </div>
  );
}
