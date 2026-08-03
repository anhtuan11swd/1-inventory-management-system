"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/form-inputs/SubmitButton";
import TextAreaInput from "@/components/form-inputs/TextAreaInput";
import TextInput from "@/components/form-inputs/TextInput";
import { supplierSchema } from "@/lib/validations";

export default function NewSupplierPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(supplierSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/suppliers", {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      if (res.ok) {
        reset();
        toast.success("Tạo nhà cung cấp thành công");
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
          href="/dashboard/inventory/suppliers"
          title="Tạo nhà cung cấp mới"
        />
        <form
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextInput
              disabled={isLoading}
              errors={errors}
              isRequired
              label="Tên nhà cung cấp"
              name="name"
              register={register}
            />
            <TextInput
              disabled={isLoading}
              errors={errors}
              label="Mã nhà cung cấp"
              name="supplierCode"
              register={register}
            />
            <TextInput
              disabled={isLoading}
              errors={errors}
              inputMode="numeric"
              label="Số điện thoại"
              maxLength={10}
              name="phone"
              pattern="[0-9]*"
              register={register}
            />
            <TextInput
              disabled={isLoading}
              errors={errors}
              label="Email"
              name="email"
              register={register}
              type="email"
            />
            <TextInput
              disabled={isLoading}
              errors={errors}
              label="Địa chỉ"
              name="address"
              register={register}
            />
            <TextInput
              disabled={isLoading}
              errors={errors}
              label="Người liên hệ"
              name="contactPerson"
              register={register}
            />
            <TextInput
              disabled={isLoading}
              errors={errors}
              label="Mã số thuế"
              maxLength={14}
              name="taxId"
              register={register}
            />
            <div />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6">
            <TextAreaInput
              disabled={isLoading}
              errors={errors}
              label="Điều khoản thanh toán"
              name="paymentTerms"
              register={register}
            />
            <TextAreaInput
              disabled={isLoading}
              errors={errors}
              label="Ghi chú"
              name="notes"
              register={register}
            />
          </div>
          <div className="mt-6">
            <SubmitButton
              buttonTitle="Tạo nhà cung cấp"
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
