"use client";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CollapsibleLink({ href, title, exact }) {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      className={cn(
        "flex items-center justify-between rounded-md px-3 py-1.5 pl-8 text-sm transition-all",
        isActive
          ? "bg-blue-600 text-white"
          : "text-slate-300 hover:bg-slate-800 hover:text-slate-50",
      )}
      href={href}
    >
      <span className="flex items-center gap-2">
        <PlusCircle className="shrink-0" size={14} />
        {title}
      </span>
    </Link>
  );
}
