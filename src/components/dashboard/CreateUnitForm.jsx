"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/form-inputs/SubmitButton";
import TextInput from "@/components/form-inputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { unitSchema } from "@/lib/validations";

export default function CreateUnitForm({ initialData = {}, isUpdate = false }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      abbreviation: initialData.abbreviation || "",
      title: initialData.title || "",
    },
    resolver: zodResolver(unitSchema),
  });

  const onSubmit = async (data) => {
    if (isUpdate) {
      await makePutRequest({
        data,
        endpoint: `/api/units/${initialData.id}`,
        redirectPath: "/dashboard/inventory/units",
        resourceName: "đơn vị",
        router,
        setLoading: setIsLoading,
      });
    } else {
      await makePostRequest({
        data,
        endpoint: "/api/units",
        redirectPath: "/dashboard/inventory/units",
        reset,
        resourceName: "đơn vị",
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
          href="/dashboard/inventory/units"
          title={isUpdate ? "Cập nhật đơn vị" : "Tạo đơn vị mới"}
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
          <div className="mt-6 flex items-center gap-3">
            <SubmitButton
              buttonTitle={isUpdate ? "Cập nhật" : "Tạo đơn vị"}
              isLoading={isLoading}
            />
            <Link
              className={`inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 text-sm transition-colors hover:bg-slate-50 ${isLoading ? "pointer-events-none cursor-not-allowed opacity-50" : ""}`}
              href="/dashboard/inventory/units"
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
