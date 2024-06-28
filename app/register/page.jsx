"use client";

import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormikError from "@/components/shared/FormikError";

import ApiKit from "@/common/ApiKit";
import { setTokenAndRedirect } from "@/lib/utils";

export default function ResisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const previousURL = searchParams.get("next");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("name is required"),
      email: Yup.string().email().required("email is required"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);

      const promise = ApiKit.auth
        .register(values)
        .then(({ data }) => {
          setTokenAndRedirect(data.access, () => {
            if (previousURL) {
              router.push(previousURL);
            } else {
              router.push("/");
            }
          });
        })
        .catch((error) => {
          console.log(error);
          throw error;
        })
        .finally(() => {
          setLoading(false);
        });

      toast.promise(promise, {
        loading: "Creating an account...",
        success: "Account created successfully",
        error: (error) => error?.message || "Failed to create an account",
      });
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex min-h-screen w-full items-center justify-center max-sm:px-4"
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Max Robinson"
                {...formik.getFieldProps("name")}
              />
              <FormikError formik={formik} name="name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...formik.getFieldProps("email")}
              />
              <FormikError formik={formik} name="email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
              />
              <FormikError formik={formik} name="password" />
            </div>
            <Button loading={loading} type="submit" className="w-full">
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
