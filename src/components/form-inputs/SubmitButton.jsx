"use client";

import { Loader2, Plus } from "lucide-react";

export default function SubmitButton({
  isLoading = false,
  buttonTitle = "Tạo mới",
  loadingButtonTitle = "Đang xử lý...",
}) {
  return (
    <button
      className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-slate-50 text-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isLoading}
      type="submit"
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={16} />
          {loadingButtonTitle}
        </>
      ) : (
        <>
          <Plus size={16} />
          {buttonTitle}
        </>
      )}
    </button>
  );
}
