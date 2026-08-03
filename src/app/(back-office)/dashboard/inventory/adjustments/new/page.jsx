"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FormHeader from "@/components/dashboard/FormHeader";
import SelectInput from "@/components/form-inputs/SelectInput";
import SubmitButton from "@/components/form-inputs/SubmitButton";
import TextAreaInput from "@/components/form-inputs/TextAreaInput";
import TextInput from "@/components/form-inputs/TextInput";

const BRANCH_OPTIONS = [
  { label: "Chi nhánh A", value: "1" },
  { label: "Chi nhánh B", value: "2" },
];

export default function NewAdjustmentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/adjustments", {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      if (res.ok) {
        reset();
        router.push("/dashboard/inventory/adjustments");
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
          href="/dashboard/inventory/adjustments"
          title="Tạo điều chỉnh kho"
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
              label="Số lượng chuyển"
              name="transferStockQty"
              register={register}
              type="number"
            />

            <SelectInput
              defaultValue=""
              disabled={isLoading}
              errors={errors}
              isRequired
              label="Chi nhánh nhận"
              name="receivingBranchId"
              options={BRANCH_OPTIONS}
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
            <SubmitButton buttonTitle="Tạo điều chỉnh" isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}
