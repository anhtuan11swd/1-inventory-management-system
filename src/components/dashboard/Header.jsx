"use client";

import {
  Bell,
  ChevronDown,
  History,
  LayoutGrid,
  LogOut,
  Menu,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateInitials } from "@/lib/generateInitials";

export default function Header({ onOpenSidebar }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] ?? "";

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      toast.success("Đăng xuất thành công");
      router.push("/login");
    } catch (_error) {
      toast.error("Đã xảy ra lỗi khi đăng xuất");
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-slate-200 border-b bg-slate-100 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          aria-label="Mở menu điều hướng"
          className="-ml-1 rounded-md p-1.5 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 lg:hidden"
          onClick={onOpenSidebar}
          type="button"
        >
          <Menu size={20} />
        </button>

        <History aria-hidden="true" className="text-slate-500" size={16} />

        <div className="hidden sm:block">
          <button
            className="flex items-center gap-1.5 font-medium text-slate-700 text-sm transition hover:text-slate-900"
            type="button"
          >
            Hoạt động gần đây
            <ChevronDown
              aria-hidden="true"
              className="text-slate-400"
              size={14}
            />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        <button
          className="flex items-center gap-1.5 rounded-md bg-blue-600 px-2.5 py-1.5 font-medium text-slate-50 text-sm transition hover:bg-blue-700 sm:px-3"
          type="button"
        >
          <Plus aria-hidden="true" size={16} />
          <span className="hidden sm:inline">Mới</span>
        </button>

        <div className="ml-1 hidden items-center gap-1 border-slate-300 border-l pl-3 sm:flex">
          {[
            { icon: Users, label: "Danh sách người dùng" },
            { icon: Bell, label: "Thông báo" },
            { icon: Settings, label: "Cài đặt" },
          ].map(({ icon: Icon, label }) => (
            <button
              aria-label={label}
              className="rounded-md p-1.5 text-slate-900 transition hover:bg-slate-200"
              key={label}
              type="button"
            >
              <Icon size={18} />
            </button>
          ))}
        </div>

        <button
          aria-label="Chuyển đổi bố cục"
          className="hidden rounded-md p-1.5 text-slate-900 transition hover:bg-slate-200 sm:block"
          type="button"
        >
          <LayoutGrid size={18} />
        </button>

        {status === "loading" ? (
          <div
            aria-label="Đang tải thông tin người dùng"
            className="h-8 w-8 animate-pulse rounded-full bg-slate-300"
            role="status"
          />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  className="flex cursor-pointer items-center gap-2 rounded-md p-1 pr-0.5 transition hover:bg-slate-200 sm:pr-1"
                  type="button"
                >
                  <span className="hidden flex-col text-right md:flex">
                    <span className="font-medium text-slate-900 text-sm leading-tight">
                      {firstName || "Khách"}
                    </span>
                    <span className="text-slate-500 text-xs leading-tight">
                      {user?.email ?? ""}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className="hidden text-slate-400 md:block"
                    size={14}
                  />
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-medium text-slate-50 text-sm">
                    {generateInitials(user?.name)}
                  </span>
                </button>
              }
            />
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  {user?.name ?? "Người dùng"}
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut size={16} />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
