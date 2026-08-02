"use client";

import {
  BaggageClaim,
  BarChart4,
  Cable,
  ChevronLeft,
  Files,
  Home,
  ShoppingBag,
  ShoppingBasket,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SubscriptionCard from "@/components/dashboard/SubscriptionCard";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  {
    href: "/dashboard/home/overview",
    icon: Home,
    isButton: false,
    label: "Trang chủ",
  },
  {
    href: "/dashboard/inventory",
    icon: BaggageClaim,
    isButton: true,
    label: "Kho hàng",
  },
  {
    href: "/dashboard/sales",
    icon: ShoppingBasket,
    isButton: false,
    label: "Bán hàng",
  },
  {
    href: "/dashboard/purchases",
    icon: ShoppingBag,
    isButton: false,
    label: "Mua hàng",
  },
  {
    href: "/dashboard/integrations",
    icon: Cable,
    isButton: false,
    label: "Tích hợp",
  },
  {
    href: "/dashboard/reports",
    icon: BarChart4,
    isButton: false,
    label: "Báo cáo",
  },
  {
    href: "/dashboard/documents",
    icon: Files,
    isButton: false,
    label: "Tài liệu",
  },
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
        <Link
          aria-label="Về trang chủ"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-600 text-slate-50"
          href="/dashboard/home/overview"
        >
          <ShoppingBag aria-hidden="true" size={18} />
        </Link>
        {!collapsed && (
          <span className="font-bold text-lg text-slate-50">Kho hàng</span>
        )}
      </div>

      <nav
        aria-label="Điều hướng chính"
        className="flex-1 overflow-y-auto px-3 py-6"
      >
        <div className="flex flex-col gap-2">
          {NAV_LINKS.map(({ href, label, icon: Icon, isButton }) => {
            const isActive = pathname === href;

            if (isButton) {
              return (
                <button
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2 font-medium text-sm transition-colors",
                    collapsed && "justify-center px-0",
                    "text-slate-300 hover:bg-slate-800 hover:text-slate-50",
                  )}
                  key={href}
                  title={collapsed ? label : undefined}
                  type="button"
                >
                  <Icon aria-hidden="true" className="shrink-0" size={18} />
                  {!collapsed && <span className="truncate">{label}</span>}
                </button>
              );
            }

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-2 font-medium text-sm transition-colors",
                  collapsed && "justify-center px-0",
                  isActive
                    ? "bg-blue-600 text-white"
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
        </div>
      </nav>

      <div className="mt-auto border-slate-800 border-t bg-slate-950 p-3">
        {!collapsed && <SubscriptionCard />}
        <button
          aria-label="Thu gọn/mở rộng menu"
          className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-md px-3 py-2 font-medium text-slate-300 text-sm transition-colors hover:bg-slate-800 hover:text-slate-50"
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
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={onCloseMobile}
        />
      )}
      <aside
        aria-hidden={!mobileOpen}
        aria-label="Sidebar di động"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col transition-transform duration-200 lg:hidden",
          GRADIENT,
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center justify-end border-slate-800 border-b bg-slate-950 px-3 lg:hidden">
          <button
            aria-label="Đóng menu"
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-50"
            onClick={onCloseMobile}
            type="button"
          >
            <X size={20} />
          </button>
        </div>
        <SidebarContent collapsed={false} onToggleCollapse={onCloseMobile} />
      </aside>
    </>
  );
}
