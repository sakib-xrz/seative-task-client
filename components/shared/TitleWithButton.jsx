import Link from "next/link";

import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function TitleWithButton({
  title,
  buttonText,
  href = "#",
  icon = true,
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between md:gap-0 ${
        buttonText && "gap-4"
      }`}
    >
      <h2 className="text-lg font-semibold text-primary md:text-2xl">
        {title}
      </h2>
      {buttonText ? (
        <div className="w-full sm:w-fit">
          <Link href={href}>
            <Button className="w-full justify-center" size="sm">
              {icon && <Plus className="mr-2 h-4 w-4 text-white" />}
              {buttonText}
            </Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
