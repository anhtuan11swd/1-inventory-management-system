"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SelectInput from "@/components/form-inputs/SelectInput";
import SubmitButton from "@/components/form-inputs/SubmitButton";
import TextAreaInput from "@/components/form-inputs/TextAreaInput";
import TextInput from "@/components/form-inputs/TextInput";
import { addStockSchema } from "@/lib/validations";

const WAREHOUSE_OPTIONS = [
  { label: "Kho chính", value: "1" },
  { label: "Chi nhánh A", value: "2" },
  { label: "Chi nhánh B", value: "3" },
];

export default function AddInventoryForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addStockSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/adjustments/add", {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      if (res.ok) {
        reset();
        router.push("/dashboard/inventory/adjustments");
        toast.success("Thêm kho thành công");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 gap-6">
        <TextInput
          disabled={isLoading}
          errors={errors}
          isRequired
          label="Số lượng thêm"
          name="addStockQuantity"
          register={register}
          type="number"
        />

        <SelectInput
          defaultValue=""
          disabled={isLoading}
          errors={errors}
          isRequired
          label="Kho nhận"
          name="receivingWarehouseId"
          options={WAREHOUSE_OPTIONS}
          register={register}
        />

        <TextInput
          disabled={isLoading}
          errors={errors}
          label="Số tham chiếu"
          name="referenceNumber"
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
        <SubmitButton buttonTitle="Thêm kho" isLoading={isLoading} />
      </div>
    </form>
  );
}
