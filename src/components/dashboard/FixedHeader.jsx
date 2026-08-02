import {
  HelpCircle,
  LayoutGrid,
  List,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function FixedHeader({ newLink }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center gap-2">
        <button
          className="rounded-md bg-slate-100 px-3 py-1.5 font-medium text-slate-900 text-sm transition-colors hover:bg-slate-200"
          type="button"
        >
          Tất cả hàng hóa
        </button>
      </div>

      <div className="flex items-center gap-1">
        {newLink && (
          <Link
            className="flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 font-medium text-slate-900 text-sm shadow-sm transition-colors hover:bg-slate-50"
            href={newLink}
          >
            <Plus size={16} />
            Mới
          </Link>
        )}

        <div className="ml-1 flex items-center overflow-hidden rounded-md border border-slate-200">
          <button
            aria-label="Hiển thị danh sách"
            className="bg-slate-100 p-1.5 text-slate-600 transition-colors hover:bg-slate-200"
            type="button"
          >
            <List size={16} />
          </button>
          <button
            aria-label="Hiển thị lưới"
            className="p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            type="button"
          >
            <LayoutGrid size={16} />
          </button>
        </div>

        <button
          aria-label="Thêm tùy chọn"
          className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          type="button"
        >
          <MoreHorizontal size={18} />
        </button>
        <button
          aria-label="Trợ giúp"
          className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          type="button"
        >
          <HelpCircle size={18} />
        </button>
      </div>
    </div>
  );
}
