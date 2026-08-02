"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchInput({ className }) {
  return (
    <search className={cn("relative flex items-center", className)}>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-2.5 text-slate-400"
        size={16}
      />
      <input
        aria-label="Tìm kiếm khách hàng"
        className="w-56 rounded-md border border-slate-200 bg-white py-1.5 pr-3 pl-8 text-slate-900 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:w-64"
        placeholder="Tìm kiếm trong khách hàng"
        type="search"
      />
    </search>
  );
}
