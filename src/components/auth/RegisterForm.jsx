"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShoppingBag, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextInput from "@/components/form-inputs/TextInput";
import { Button } from "@/components/ui/button";
import { registerSchema } from "@/lib/validations";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        email: data.email,
        name: data.name,
        password: data.password,
      };
      const res = await fetch("/api/user", {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (res.ok) {
        toast.success("Đăng ký thành công");
        router.push("/login");
        return;
      }

      const error = await res.json();

      if (res.status === 409) {
        setError("email", { message: error.error });
      }

      toast.error(error.error || "Đã xảy ra lỗi");
    } catch (_error) {
      toast.error("Đã xảy ra lỗi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-slate-50">
            <ShoppingBag aria-hidden="true" size={24} />
          </div>
          <h1 className="font-bold text-2xl">Tạo tài khoản mới</h1>
          <p className="mt-1 text-slate-500 text-sm">
            Đăng ký để bắt đầu quản lý kho hàng
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            disabled={isLoading}
            errors={errors}
            isRequired
            label="Tên"
            name="name"
            register={register}
          />
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
          <TextInput
            disabled={isLoading}
            errors={errors}
            isRequired
            label="Xác nhận mật khẩu"
            name="confirmPassword"
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
                <UserPlus />
                Đăng ký
              </>
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-slate-500 text-sm">
          Đã có tài khoản?{" "}
          <Link
            aria-disabled={isLoading}
            className={`font-medium text-blue-600 hover:underline ${
              isLoading ? "pointer-events-none opacity-50" : ""
            }`}
            href="/login"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
