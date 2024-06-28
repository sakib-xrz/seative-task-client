import { cn } from "@/lib/utils";

export default function FormikError({ formik, name, className }) {
  const showError = formik.errors[name] && formik.touched[name];
  const defaultClassNames =
    "rounded-md bg-red-50 px-2 py-1 text-sm text-destructive border border-destructive";
  const errorMessage = formik.errors[name];
  return showError ? (
    <div>
      <div className={cn(defaultClassNames, className)}>{errorMessage}</div>
    </div>
  ) : null;
}
