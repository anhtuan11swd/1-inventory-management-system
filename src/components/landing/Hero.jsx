import { ArrowRight, Eye, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/authOptions";

export default async function Hero() {
  const session = await auth();

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white">
      <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24">
        <span className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-medium text-blue-700 text-xs sm:text-sm">
          Nền tảng quản lý kho hàng hiện đại
        </span>

        <h1 className="font-bold text-3xl text-slate-900 sm:text-4xl md:text-5xl">
          Hệ thống Quản lý Kho hàng
        </h1>

        <p className="mt-4 max-w-2xl text-slate-600 sm:text-lg">
          Quản lý hàng tồn kho hiệu quả cho doanh nghiệp của bạn — theo dõi số
          lượng tồn, chuyển kho giữa các chi nhánh, và thống kê hoạt động kinh
          doanh trong một nền tảng duy nhất.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {session ? (
            <Link
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 font-medium text-slate-50 text-sm transition hover:bg-blue-700"
              href="/dashboard/home/overview"
            >
              Vào trang quản trị
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          ) : (
            <>
              <Link
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 font-medium text-slate-50 text-sm transition hover:bg-blue-700"
                href="/login"
              >
                <LogIn aria-hidden="true" size={16} />
                Đăng nhập hệ thống
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 text-sm transition hover:bg-slate-50"
                href="/demo"
              >
                <Eye aria-hidden="true" size={16} />
                Xem demo
              </Link>
            </>
          )}
        </div>

        <div className="mt-14 w-full">
          <Image
            alt="Minh họa giao diện bảng điều khiển"
            className="h-auto w-full rounded-xl border border-slate-200 shadow-2xl"
            height={600}
            priority
            src="/mockup.svg"
            width={960}
          />
        </div>
      </div>
    </section>
  );
}
