import { X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FormHeader({ title, href, disabled = false }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
      <h2 className="font-semibold text-lg text-slate-900">{title}</h2>
      <Link
        className={cn(
          "flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium text-slate-500 text-sm transition-colors hover:bg-slate-100 hover:text-slate-700",
          disabled &&
            "pointer-events-none cursor-not-allowed opacity-50 hover:bg-transparent hover:text-slate-500",
        )}
        href={href}
        tabIndex={disabled ? -1 : 0}
      >
        <X size={18} />
      </Link>
    </div>
  );
}
