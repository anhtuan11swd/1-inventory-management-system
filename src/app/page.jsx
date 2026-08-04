import { ArrowRight, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="max-w-xl font-bold text-3xl">Hệ thống Quản lý Kho hàng</h1>
      <p className="max-w-md text-slate-500">
        Nền tảng quản lý hàng tồn kho hiệu quả cho doanh nghiệp của bạn.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-slate-50 text-sm transition hover:bg-blue-700"
          href="/dashboard/home/overview"
        >
          Vào trang quản trị
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
        <Link
          className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 text-sm transition hover:bg-slate-50"
          href="/login"
        >
          <LogIn aria-hidden="true" size={16} />
          Đăng nhập
        </Link>
        <Link
          className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 text-sm transition hover:bg-slate-50"
          href="/register"
        >
          <UserPlus aria-hidden="true" size={16} />
          Đăng ký
        </Link>
      </div>
    </div>
  );
}
