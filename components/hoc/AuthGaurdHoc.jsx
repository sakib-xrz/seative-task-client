/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_TOKEN_KEY } from "@/lib/keyChain";
import { setTokenAndRedirect } from "@/lib/utils";
import useStore from "@/store";
import Loading from "../shared/Loading";

export default function AuthGuardHoc({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, userLoading, fetchUser } = useStore();

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (token) {
      setTokenAndRedirect(token)
        .then(() => {
          fetchUser();
        })
        .catch((error) => {
          console.log("Error from setTokenAndRedirect", error);
          router.push("/logout");
        });
    } else {
      const nextURL = { next: pathname };
      const queryParams = new URLSearchParams(nextURL).toString();
      router.push(`/login?${queryParams}`);
    }
  }, []);

  if (userLoading) {
    return <Loading className="h-screen" />;
  }

  return user?.email ? children : null;
}
