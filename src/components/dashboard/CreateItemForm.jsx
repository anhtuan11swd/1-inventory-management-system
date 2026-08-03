"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormHeader from "@/components/dashboard/FormHeader";
import ImageInput from "@/components/form-inputs/ImageInput";
import SelectInput from "@/components/form-inputs/SelectInput";
import SubmitButton from "@/components/form-inputs/SubmitButton";
import TextAreaInput from "@/components/form-inputs/TextAreaInput";
import TextInput from "@/components/form-inputs/TextInput";
import { useUploadThing } from "@/lib/uploadthing";
import { itemSchema } from "@/lib/validations";

export default function CreateItemForm({
  categories,
  units,
  brands,
  suppliers,
  warehouses,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(itemSchema),
  });

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {},
    onUploadError: (error) => console.error("Lỗi tải lên:", error),
  });

  const categoryOptions = categories.map((c) => ({
    label: c.title,
    value: c.id,
  }));
  const unitOptions = units.map((u) => ({
    label: `${u.title} (${u.abbreviation})`,
    value: u.id,
  }));
  const brandOptions = brands.map((b) => ({ label: b.title, value: b.id }));
  const supplierOptions = suppliers.map((s) => ({
    label: s.title,
    value: s.id,
  }));
  const warehouseOptions = warehouses.map((w) => ({
    label: w.title,
    value: w.id,
  }));

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let imageUrl = "";

      if (imageFile) {
        const res = await startUpload([imageFile]);
        if (res?.[0]?.ufsUrl) {
          imageUrl = res[0].ufsUrl;
        }
      }

      const payload = { ...data, imageUrl };
      const res = await fetch("/api/items", {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      if (res.ok) {
        reset();
        setImageFile(null);
        toast.success("Tạo mặt hàng thành công");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-4xl space-y-6">
        <FormHeader
          disabled={isLoading}
          href="/dashboard/inventory/items"
          title="Tạo mặt hàng mới"
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
              label="Tên mặt hàng"
              name="title"
              register={register}
            />

            <ImageInput
              disabled={isLoading}
              imageFile={imageFile}
              label="Ảnh mặt hàng"
              setImageFile={setImageFile}
            />

            <SelectInput
              defaultValue=""
              disabled={isLoading}
              errors={errors}
              isRequired
              label="Danh mục"
              name="categoryId"
              options={categoryOptions}
              register={register}
            />

            <TextAreaInput
              disabled={isLoading}
              errors={errors}
              label="Mô tả"
              name="description"
              register={register}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextInput
                disabled={isLoading}
                errors={errors}
                label="SKU"
                name="sku"
                register={register}
              />
              <TextInput
                disabled={isLoading}
                errors={errors}
                label="Barcode"
                name="barcode"
                register={register}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextInput
                disabled={isLoading}
                errors={errors}
                isRequired
                label="Số lượng tồn"
                name="quantity"
                register={register}
                type="number"
              />
              <SelectInput
                defaultValue=""
                disabled={isLoading}
                errors={errors}
                isRequired
                label="Đơn vị tính"
                name="unitId"
                options={unitOptions}
                register={register}
              />
            </div>

            <SelectInput
              defaultValue=""
              disabled={isLoading}
              errors={errors}
              isRequired
              label="Thương hiệu"
              name="brandId"
              options={brandOptions}
              register={register}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextInput
                disabled={isLoading}
                errors={errors}
                isRequired
                label="Giá mua"
                name="buyingPrice"
                register={register}
                type="number"
              />
              <TextInput
                disabled={isLoading}
                errors={errors}
                isRequired
                label="Giá bán"
                name="sellingPrice"
                register={register}
                type="number"
              />
            </div>

            <SelectInput
              defaultValue=""
              disabled={isLoading}
              errors={errors}
              label="Nhà cung cấp"
              name="supplierId"
              options={supplierOptions}
              register={register}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextInput
                disabled={isLoading}
                errors={errors}
                label="Mức đặt lại"
                name="reorderPoint"
                register={register}
                type="number"
              />
              <SelectInput
                defaultValue=""
                disabled={isLoading}
                errors={errors}
                label="Kho hàng"
                name="warehouseId"
                options={warehouseOptions}
                register={register}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextInput
                disabled={isLoading}
                errors={errors}
                label="Khối lượng (kg)"
                name="weight"
                register={register}
                type="number"
              />
              <TextInput
                disabled={isLoading}
                errors={errors}
                label="Kích thước (DxRxC)"
                name="dimensions"
                register={register}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextInput
                disabled={isLoading}
                errors={errors}
                label="Thuế (%)"
                name="taxRate"
                register={register}
                type="number"
              />
              <div />
            </div>

            <TextAreaInput
              disabled={isLoading}
              errors={errors}
              label="Ghi chú"
              name="notes"
              register={register}
            />
          </div>

          <div className="mt-6">
            <SubmitButton buttonTitle="Tạo mặt hàng" isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}
