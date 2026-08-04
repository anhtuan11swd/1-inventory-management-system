"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextInput from "@/components/form-inputs/TextInput";
import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/lib/validations";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok && !result?.error) {
        toast.success("Đăng nhập thành công");
        router.push("/dashboard/home/overview");
        router.refresh();
        return;
      }

      toast.error("Email hoặc mật khẩu không đúng");
    } catch (_error) {
      toast.error("Đã xảy ra lỗi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-slate-50">
              <ShoppingBag aria-hidden="true" size={24} />
            </div>
            <h1 className="font-bold text-2xl">Đăng nhập</h1>
            <p className="mt-1 text-slate-500 text-sm">
              Chào mừng trở lại, vui lòng đăng nhập để tiếp tục
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              disabled={isLoading}
              errors={errors}
              isRequired
              label="Email"
              name="email"
              register={register}
              type="email"
            />
            <TextInput
              disabled={isLoading}
              errors={errors}
              isRequired
              label="Mật khẩu"
              name="password"
              onTogglePassword={() => setShowPassword((prev) => !prev)}
              register={register}
              showPassword={showPassword}
              type="password"
            />
            <Button
              className="w-full"
              disabled={isLoading}
              size="lg"
              type="submit"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <LogIn />
                  Đăng nhập
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-slate-500 text-sm">
            Chưa có tài khoản?{" "}
            <Link
              aria-disabled={isLoading}
              className={`font-medium text-blue-600 hover:underline ${
                isLoading ? "pointer-events-none opacity-50" : ""
              }`}
              href="/register"
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
