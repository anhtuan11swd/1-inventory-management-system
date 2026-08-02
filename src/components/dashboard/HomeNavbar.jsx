"use client";

import { Building2, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/dashboard/home/overview", label: "Bảng điều khiển" },
  { href: "/dashboard/home/getting-started", label: "Bắt đầu" },
  { href: "/dashboard/home/updates", label: "Cập nhật gần đây" },
  { href: "/dashboard/home/announcements", label: "Thông báo" },
];

export default function HomeNavbar({ onCloseBanner }) {
  const pathname = usePathname();

  return (
    <div className="relative">
      <div
        className="bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/head-bg.svg')" }}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white">
              <Building2 className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-slate-200 text-sm">Xin chào,</p>
              <p className="font-semibold text-slate-50">JB Web Developer</p>
            </div>
          </div>

          {onCloseBanner && (
            <button
              aria-label="Đóng banner"
              className="rounded-md p-1.5 text-slate-300 transition-colors hover:bg-white/10 hover:text-slate-50"
              onClick={onCloseBanner}
              type="button"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex flex-wrap gap-x-4 border-white/20 border-b px-5">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                className={cn(
                  "whitespace-nowrap border-b-2 py-3 font-medium text-sm transition-colors",
                  isActive
                    ? "border-blue-600 text-white"
                    : "border-transparent text-slate-300 hover:text-slate-100",
                )}
                href={href}
                key={href}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
