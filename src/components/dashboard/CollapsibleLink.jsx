"use client";

import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function CollapsibleLink({ href, title }) {
  return (
    <Link
      className="flex items-center justify-between rounded-md px-3 py-1.5 pl-8 text-slate-300 text-sm transition-all hover:bg-slate-800 hover:text-slate-50"
      href={href}
    >
      <span className="flex items-center gap-2">
        <PlusCircle className="shrink-0" size={14} />
        {title}
      </span>
    </Link>
  );
}
