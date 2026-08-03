"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/form-inputs/SubmitButton";
import TextAreaInput from "@/components/form-inputs/TextAreaInput";
import TextInput from "@/components/form-inputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { supplierSchema } from "@/lib/validations";

export default function CreateSupplierForm({
  initialData = {},
  isUpdate = false,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      address: initialData.address || "",
      contactPerson: initialData.contactPerson || "",
      email: initialData.email || "",
      notes: initialData.notes || "",
      paymentTerms: initialData.paymentTerms || "",
      phone: initialData.phone || "",
      supplierCode: initialData.supplierCode || "",
      taxId: initialData.taxId || "",
      title: initialData.title || "",
    },
    resolver: zodResolver(supplierSchema),
  });

  const onSubmit = async (data) => {
    if (isUpdate) {
      await makePutRequest({
        data,
        endpoint: `/api/suppliers/${initialData.id}`,
        redirectPath: "/dashboard/inventory/suppliers",
        resourceName: "nhà cung cấp",
        router,
        setLoading: setIsLoading,
      });
    } else {
      await makePostRequest({
        data,
        endpoint: "/api/suppliers",
        redirectPath: "/dashboard/inventory/suppliers",
        reset,
        resourceName: "nhà cung cấp",
        router,
        setLoading: setIsLoading,
      });
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-4xl space-y-6">
        <FormHeader
          disabled={isLoading}
          href="/dashboard/inventory/suppliers"
          title={isUpdate ? "Cập nhật nhà cung cấp" : "Tạo nhà cung cấp mới"}
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
              name="title"
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
          <div className="mt-6 flex items-center gap-3">
            <SubmitButton
              buttonTitle={isUpdate ? "Cập nhật" : "Tạo nhà cung cấp"}
              isLoading={isLoading}
            />
            <Link
              className={`inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 text-sm transition-colors hover:bg-slate-50 ${isLoading ? "pointer-events-none cursor-not-allowed opacity-50" : ""}`}
              href="/dashboard/inventory/suppliers"
              tabIndex={isLoading ? -1 : 0}
            >
              <X size={16} /> Hủy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
