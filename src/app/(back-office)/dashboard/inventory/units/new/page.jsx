"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/form-inputs/SubmitButton";
import TextInput from "@/components/form-inputs/TextInput";
import { unitSchema } from "@/lib/validations";

export default function NewUnitPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(unitSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/units", {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      if (res.ok) {
        reset();
        toast.success("Tạo đơn vị thành công");
        router.push("/dashboard/inventory/units");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Breadcrumbs />
      <div className="mx-auto max-w-4xl space-y-6">
        <FormHeader
          disabled={isLoading}
          href="/dashboard/inventory/units"
          title="Tạo đơn vị tính mới"
        />
        <form
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-6">
            <TextInput
              disabled={isLoading}
              errors={errors}
              isRequired
              label="Tên đơn vị"
              name="title"
              register={register}
            />
            <TextInput
              disabled={isLoading}
              errors={errors}
              isRequired
              label="Viết tắt"
              name="abbreviation"
              register={register}
            />
          </div>
          <div className="mt-6">
            <SubmitButton buttonTitle="Tạo đơn vị" isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}
