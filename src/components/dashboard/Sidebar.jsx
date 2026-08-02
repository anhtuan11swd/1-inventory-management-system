"use client";

import {
  ChevronLeft,
  FileText,
  Home,
  Package,
  Plug,
  Receipt,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/dashboard/home/overview", icon: Home, label: "Trang chủ" },
  { href: "/dashboard/inventory", icon: Package, label: "Kho hàng" },
  { href: "/dashboard/sales", icon: Receipt, label: "Bán hàng" },
  { href: "/dashboard/purchases", icon: ShoppingCart, label: "Mua hàng" },
  { href: "/dashboard/integrations", icon: Plug, label: "Tích hợp" },
  { href: "/dashboard/reports", icon: FileText, label: "Báo cáo" },
  { href: "/dashboard/documents", icon: FileText, label: "Tài liệu" },
];

const GRADIENT =
  "bg-gradient-to-b from-slate-800 to-slate-950 border-r border-slate-800 text-slate-50";

function SidebarContent({ collapsed, onToggleCollapse }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div
        className={cn(
          "flex h-14 items-center gap-2 border-slate-800 border-b bg-slate-950 px-3",
          collapsed && "justify-center px-1",
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-600 text-slate-50">
          <ShoppingCart aria-hidden="true" size={18} />
        </div>
        {!collapsed && (
          <span className="font-bold text-lg text-slate-50">Kho hàng</span>
        )}
      </div>

      <nav
        aria-label="Điều hướng chính"
        className="flex-1 space-y-1 overflow-y-auto p-2"
      >
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 font-medium text-sm transition-colors",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-blue-600 text-slate-50"
                  : "text-slate-300 hover:bg-slate-800 hover:text-slate-50",
              )}
              href={href}
              key={href}
              title={collapsed ? label : undefined}
            >
              <Icon aria-hidden="true" className="shrink-0" size={18} />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-slate-800 border-t bg-slate-950 p-3">
        {!collapsed && (
          <div className="mb-2 rounded-lg border border-slate-700 bg-slate-800/50 p-3">
            <p className="font-medium text-slate-200 text-xs">Gói Free Plan</p>
            <p className="mt-0.5 text-slate-400 text-xs">
              Nâng cấp để mở khóa thêm tính năng.
            </p>
          </div>
        )}
        <button
          aria-label="Thu gọn/mở rộng menu"
          className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 font-medium text-slate-300 text-sm transition-colors hover:bg-slate-800 hover:text-slate-50"
          onClick={onToggleCollapse}
          type="button"
        >
          {!collapsed && <span>Thu gọn</span>}
          <ChevronLeft
            aria-hidden="true"
            className={cn(
              "ml-auto transition-transform",
              collapsed ? "rotate-180" : "",
            )}
            size={18}
          />
        </button>
      </div>
    </div>
  );
}

export default function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}) {
  return (
    <>
      <aside
        aria-label="Sidebar"
        className={cn(
          "hidden shrink-0 lg:block",
          GRADIENT,
          collapsed ? "w-16" : "w-64",
        )}
      >
        <SidebarContent
          collapsed={collapsed}
          onToggleCollapse={onToggleCollapse}
        />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}
      <aside
        aria-hidden={!mobileOpen}
        aria-label="Sidebar di động"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-200 lg:hidden",
          GRADIENT,
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent collapsed={false} />
      </aside>
    </>
  );
}
