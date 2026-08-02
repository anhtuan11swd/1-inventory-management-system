"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/form-inputs/SubmitButton";
import TextInput from "@/components/form-inputs/TextInput";

export default function NewBrandPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/brands", {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      if (res.ok) {
        reset();
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
          href="/dashboard/inventory/brands"
          title="Tạo thương hiệu mới"
        />
        <form
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-6">
            <TextInput
              errors={errors}
              isRequired
              label="Tên thương hiệu"
              name="title"
              register={register}
            />
          </div>
          <div className="mt-6">
            <SubmitButton buttonTitle="Tạo thương hiệu" isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}
