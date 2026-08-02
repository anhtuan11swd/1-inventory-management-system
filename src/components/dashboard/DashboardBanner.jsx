"use client";

import { CreditCard, X, Zap } from "lucide-react";

export default function DashboardBanner({ onClose }) {
  return (
    <div className="relative rounded-lg bg-white p-6 shadow-sm sm:px-8 sm:py-6">
      <div className="grid grid-cols-12 items-center gap-3">
        <div className="col-span-2 flex items-center justify-center sm:col-span-2">
          <CreditCard className="text-blue-600" size={32} />
        </div>
        <div className="col-span-7 sm:col-span-7">
          <p className="font-semibold text-slate-900 text-sm sm:text-base">
            Bắt đầu chấp nhận thanh toán trực tuyến
          </p>
          <p className="mt-0.5 text-slate-500 text-xs sm:text-sm">
            Kích hoạt cổng thanh toán để nhận thanh toán trực tiếp từ khách
            hàng.
          </p>
        </div>
        <div className="col-span-12 flex justify-start sm:col-span-3 sm:justify-end">
          <button
            className="flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 font-medium text-slate-50 text-xs uppercase transition-colors hover:bg-blue-700 sm:py-2.5 sm:text-sm"
            type="button"
          >
            <Zap size={14} />
            Kích hoạt
          </button>
        </div>
      </div>

      <button
        aria-label="Đóng banner"
        className="absolute top-4 right-4 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        onClick={onClose}
        type="button"
      >
        <X size={16} />
      </button>
    </div>
  );
}
