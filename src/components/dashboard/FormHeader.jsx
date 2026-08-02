import { X } from "lucide-react";
import Link from "next/link";

export default function FormHeader({ title, href }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
      <h2 className="font-semibold text-lg text-slate-900">{title}</h2>
      <Link
        className="flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium text-slate-500 text-sm transition-colors hover:bg-slate-100 hover:text-slate-700"
        href={href}
      >
        <X size={18} />
      </Link>
    </div>
  );
}
