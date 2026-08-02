import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SalesActivityCard({ item }) {
  return (
    <div className="cursor-pointer rounded-lg border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-blue-500 hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className={cn("font-bold text-2xl", item.color)}>{item.number}</p>
        <CheckCircle2 className="text-slate-300" size={20} />
      </div>
      <p className="mt-1 font-medium text-slate-700 text-sm">{item.title}</p>
      <p className="mt-0.5 text-slate-400 text-xs">{item.unit}</p>
    </div>
  );
}
