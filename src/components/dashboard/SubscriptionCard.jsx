import { Crown, RefreshCw } from "lucide-react";

export default function SubscriptionCard() {
  return (
    <div className="rounded-lg bg-slate-900 p-3 pt-6">
      <div className="border-orange-400 border-l-2 pl-2">
        <p className="text-slate-200 text-xs">
          Gói cao cấp của bạn hết hạn sau{" "}
          <span className="font-medium text-orange-300">13 ngày</span>. Nâng cấp
          trước khi hết hạn để giữ dữ liệu an toàn.
        </p>
      </div>

      <div className="mt-4 flex items-center border-slate-700 border-t pt-3">
        <button
          className="flex items-center gap-1 pr-2 font-medium text-slate-300 text-xs transition-colors hover:text-slate-50"
          type="button"
        >
          <RefreshCw size={12} />
          Thay đổi gói
        </button>
        <span className="border-slate-600 border-r pr-2" />
        <button
          className="flex items-center gap-1 pl-2 font-medium text-blue-400 text-xs transition-colors hover:text-blue-300"
          type="button"
        >
          <Crown size={12} />
          Nâng cấp
        </button>
      </div>
    </div>
  );
}
