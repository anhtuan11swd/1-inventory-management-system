"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormHeader from "@/components/dashboard/FormHeader";
import SelectInput from "@/components/form-inputs/SelectInput";
import SubmitButton from "@/components/form-inputs/SubmitButton";
import TextAreaInput from "@/components/form-inputs/TextAreaInput";
import TextInput from "@/components/form-inputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { warehouseSchema } from "@/lib/validations";

const WAREHOUSE_TYPE_OPTIONS = [
  { label: "Chính", value: "main" },
  { label: "Chi nhánh", value: "branch" },
];

export default function CreateWarehouseForm({
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
      description: initialData.description || "",
      location: initialData.location || "",
      title: initialData.title || "",
      type: initialData.warehouseType || "",
    },
    resolver: zodResolver(warehouseSchema),
  });

  const onSubmit = async (data) => {
    if (isUpdate) {
      await makePutRequest({
        data,
        endpoint: `/api/warehouse/${initialData.id}`,
        redirectPath: "/dashboard/inventory/warehouse",
        resourceName: "kho hàng",
        router,
        setLoading: setIsLoading,
      });
    } else {
      await makePostRequest({
        data,
        endpoint: "/api/warehouse",
        redirectPath: "/dashboard/inventory/warehouse",
        reset,
        resourceName: "kho hàng",
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
          href="/dashboard/inventory/warehouse"
          title={isUpdate ? "Cập nhật kho hàng" : "Tạo kho hàng mới"}
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
              label="Tên kho"
              name="title"
              register={register}
            />
            <TextInput
              disabled={isLoading}
              errors={errors}
              isRequired
              label="Vị trí"
              name="location"
              register={register}
            />
            <TextAreaInput
              disabled={isLoading}
              errors={errors}
              label="Mô tả"
              name="description"
              register={register}
            />
            <SelectInput
              defaultValue=""
              disabled={isLoading}
              errors={errors}
              isRequired
              label="Loại kho"
              name="type"
              options={WAREHOUSE_TYPE_OPTIONS}
              register={register}
            />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <SubmitButton
              buttonTitle={isUpdate ? "Cập nhật" : "Tạo kho hàng"}
              isLoading={isLoading}
            />
            <Link
              className={`inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 text-sm transition-colors hover:bg-slate-50 ${isLoading ? "pointer-events-none cursor-not-allowed opacity-50" : ""}`}
              href="/dashboard/inventory/warehouse"
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
