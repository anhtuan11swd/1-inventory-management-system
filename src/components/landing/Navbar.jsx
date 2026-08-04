"use client";

import { Building2, LogIn, LogOut, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiMenu, HiX } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { generateInitials } from "@/lib/generateInitials";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/demo", label: "Demo" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const userInfo = (
    <>
      <span className="hidden flex-col text-right lg:flex">
        <span className="font-medium text-slate-900 text-sm leading-tight">
          {firstName}
        </span>
        <span className="text-slate-500 text-xs leading-tight">
          {user?.email ?? ""}
        </span>
      </span>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-medium text-slate-50 text-sm">
        {generateInitials(user?.name)}
      </span>
    </>
  );

  return (
    <header className="sticky top-0 z-30 border-slate-200 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-2" href="/">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-slate-50">
            <Building2 aria-hidden="true" size={20} />
          </span>
          <span className="font-bold text-slate-900">Inventory</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              className="font-medium text-slate-600 text-sm transition hover:text-blue-600"
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {status === "loading" ? (
            <div
              aria-label="Đang tải thông tin người dùng"
              className="h-9 w-9 animate-pulse rounded-full bg-slate-200"
              role="status"
            />
          ) : user ? (
            <div className="flex items-center gap-3">
              {userInfo}
              <Button onClick={handleSignOut} size="sm" variant="outline">
                <LogOut />
                Đăng xuất
              </Button>
            </div>
          ) : (
            <>
              <Button
                render={<Link href="/login" />}
                size="sm"
                variant="outline"
              >
                <LogIn />
                Đăng nhập
              </Button>
              <Button render={<Link href="/register" />} size="sm">
                <UserPlus />
                Đăng ký
              </Button>
            </>
          )}
        </div>

        <button
          aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
          className="rounded-md p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          type="button"
        >
          {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-slate-200 border-t bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                className="rounded-md px-3 py-2 font-medium text-slate-700 text-sm transition hover:bg-slate-100"
                href={href}
                key={href}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 border-slate-100 border-t pt-3">
            {status === "loading" ? (
              <div
                aria-label="Đang tải thông tin người dùng"
                className="h-9 w-9 animate-pulse rounded-full bg-slate-200"
                role="status"
              />
            ) : user ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-medium text-slate-50 text-sm">
                    {generateInitials(user?.name)}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-medium text-slate-900 text-sm leading-tight">
                      {firstName}
                    </span>
                    <span className="text-slate-500 text-xs leading-tight">
                      {user?.email ?? ""}
                    </span>
                  </span>
                </div>
                <Button onClick={handleSignOut} size="sm" variant="outline">
                  <LogOut />
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  render={
                    <Link href="/login" onClick={() => setMobileOpen(false)} />
                  }
                  size="sm"
                  variant="outline"
                >
                  <LogIn />
                  Đăng nhập
                </Button>
                <Button
                  render={
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                    />
                  }
                  size="sm"
                >
                  <UserPlus />
                  Đăng ký
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
