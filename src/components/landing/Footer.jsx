import { Building2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-slate-200 border-t bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-slate-50">
            <Building2 aria-hidden="true" size={18} />
          </span>
          <span className="font-bold text-slate-900">Inventory</span>
        </div>

        <p className="max-w-md text-center text-slate-500 text-sm md:text-left">
          © {new Date().getFullYear()} Trần Anh Tuấn. Hệ thống dùng cho mục đích
          cá nhân và portfolio. Không sử dụng cho mục đích thương mại.
        </p>

        <nav className="flex items-center gap-6">
          <Link
            className="font-medium text-slate-600 text-sm transition hover:text-blue-600"
            href="/"
          >
            Trang chủ
          </Link>
          <Link
            className="font-medium text-slate-600 text-sm transition hover:text-blue-600"
            href="/demo"
          >
            Demo
          </Link>
          <Link
            className="font-medium text-slate-600 text-sm transition hover:text-blue-600"
            href="/login"
          >
            Đăng nhập
          </Link>
        </nav>
      </div>
    </footer>
  );
}
