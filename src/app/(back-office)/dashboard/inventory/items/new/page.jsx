"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FormHeader from "@/components/dashboard/FormHeader";
import ImageInput from "@/components/form-inputs/ImageInput";
import SelectInput from "@/components/form-inputs/SelectInput";
import SubmitButton from "@/components/form-inputs/SubmitButton";
import TextAreaInput from "@/components/form-inputs/TextAreaInput";
import TextInput from "@/components/form-inputs/TextInput";
import { useUploadThing } from "@/lib/uploadthing";

const CATEGORY_OPTIONS = [
  { label: "Điện tử", value: "1" },
  { label: "Quần áo", value: "2" },
  { label: "Thực phẩm & Đồ uống", value: "3" },
];

const UNIT_OPTIONS = [
  { label: "Kilôgam (kg)", value: "1" },
  { label: "Cái (cái)", value: "2" },
  { label: "Lít (L)", value: "3" },
];

const BRAND_OPTIONS = [
  { label: "HP", value: "1" },
  { label: "Dell", value: "2" },
  { label: "Samsung", value: "3" },
];

const SUPPLIER_OPTIONS = [
  { label: "Nhà cung cấp A", value: "1" },
  { label: "Nhà cung cấp B", value: "2" },
];

const WAREHOUSE_OPTIONS = [
  { label: "Kho chính", value: "1" },
  { label: "Chi nhánh A", value: "2" },
  { label: "Chi nhánh B", value: "3" },
];

export default function NewItemPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {},
    onUploadError: (error) => console.error("Lỗi tải lên:", error),
  });

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
              options={CATEGORY_OPTIONS}
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
                isRequired={false}
                label="SKU"
                name="sku"
                register={register}
              />
              <TextInput
                disabled={isLoading}
                errors={errors}
                isRequired={false}
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
                options={UNIT_OPTIONS}
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
              options={BRAND_OPTIONS}
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
              isRequired
              label="Nhà cung cấp"
              name="supplierId"
              options={SUPPLIER_OPTIONS}
              register={register}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextInput
                disabled={isLoading}
                errors={errors}
                isRequired
                label="Mức đặt lại"
                name="reorderPoint"
                register={register}
                type="number"
              />
              <SelectInput
                defaultValue=""
                disabled={isLoading}
                errors={errors}
                isRequired
                label="Kho hàng"
                name="warehouseId"
                options={WAREHOUSE_OPTIONS}
                register={register}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextInput
                disabled={isLoading}
                errors={errors}
                isRequired={false}
                label="Khối lượng (kg)"
                name="weight"
                register={register}
                type="number"
              />
              <TextInput
                disabled={isLoading}
                errors={errors}
                isRequired={false}
                label="Kích thước (DxRxC)"
                name="dimensions"
                register={register}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextInput
                disabled={isLoading}
                errors={errors}
                isRequired={false}
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
