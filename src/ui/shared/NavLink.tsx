"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavLinkProps {
  title?: string;
  Icon?: React.ComponentType<{ className?: string }>;
  destination: string;
  isToolkit?: boolean;
}

export default function NavLink({
  title,
  Icon,
  destination,
  isToolkit,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === destination;

  return (
    <Link
      href={destination}
      className={clsx(
        `flex flex-col items-center justify-center w-14 h-14 text-gray-400`,
        {
          "text-white": isActive,
          "border-twd-primary-purple border-solid border-[3px] rounded-full p-10 bg-twd-navbar-background shadow-[0px_0px_8px_2px_rgba(137,63,252)] -translate-y-4 ":
            isToolkit,
          "bg-gray-100 text-twd-primary-purple ": isActive && isToolkit,
        }
      )}
    >
      {Icon && (
        <Icon
          className={clsx("flex-shrink-0", {
            "h-7 w-7": !isToolkit,
            "h-9 w-9": isToolkit,
          })}
        />
      )}

      {!isToolkit && <p className="text-xs mt-1">{title}</p>}
    </Link>
  );
}
