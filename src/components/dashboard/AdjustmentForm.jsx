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
import { addStockSchema, transferStockSchema } from "@/lib/validations";

export default function AdjustmentForm({ items, suppliers, type, warehouses }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const schema = type === "add" ? addStockSchema : transferStockSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const itemOptions = items.map((item) => ({
    label: item.title,
    value: item.id,
  }));
  const warehouseOptions = warehouses.map((w) => ({
    label: w.title,
    value: w.id,
  }));
  const supplierOptions = suppliers.map((s) => ({
    label: s.title,
    value: s.id,
  }));

  const onSubmit = async (data) => {
    setIsLoading(true);
    const endpoint =
      type === "add" ? "/api/adjustments/add" : "/api/adjustments/transfer";
    try {
      const res = await fetch(endpoint, {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      if (res.ok) {
        reset();
        router.push("/dashboard/inventory/adjustments");
        toast.success(
          type === "add" ? "Thêm kho thành công" : "Chuyển kho thành công",
        );
      } else if (res.status === 409) {
        toast.error("Kho gửi không đủ hàng");
      } else {
        const error = await res.json();
        toast.error(error.error || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
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
        <SelectInput
          defaultValue=""
          disabled={isLoading}
          errors={errors}
          label="Mặt hàng"
          name="itemId"
          options={itemOptions}
          register={register}
        />

        <TextInput
          disabled={isLoading}
          errors={errors}
          isRequired
          label={type === "add" ? "Số lượng thêm" : "Số lượng chuyển"}
          name={type === "add" ? "addStockQuantity" : "transferStockQuantity"}
          register={register}
          type="number"
        />

        {type === "transfer" && (
          <SelectInput
            defaultValue=""
            disabled={isLoading}
            errors={errors}
            isRequired
            label="Kho gửi"
            name="givingWarehouseId"
            options={warehouseOptions}
            register={register}
          />
        )}

        <SelectInput
          defaultValue=""
          disabled={isLoading}
          errors={errors}
          isRequired
          label="Kho nhận"
          name="receivingWarehouseId"
          options={warehouseOptions}
          register={register}
        />

        {type === "add" && (
          <SelectInput
            defaultValue=""
            disabled={isLoading}
            errors={errors}
            label="Nhà cung cấp"
            name="supplierId"
            options={supplierOptions}
            register={register}
          />
        )}

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
        <SubmitButton
          buttonTitle={type === "add" ? "Thêm kho" : "Chuyển kho"}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
}
