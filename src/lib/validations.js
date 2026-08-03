import { z } from "zod";

export const categorySchema = z.object({
  description: z.string().optional(),
  title: z.string().min(1, "Tên danh mục là bắt buộc"),
});

export const brandSchema = z.object({
  title: z.string().min(1, "Tên thương hiệu là bắt buộc"),
});

export const unitSchema = z.object({
  abbreviation: z.string().min(1, "Viết tắt là bắt buộc"),
  title: z.string().min(1, "Tên đơn vị là bắt buộc"),
});

export const warehouseSchema = z.object({
  description: z.string().optional(),
  location: z.string().min(1, "Vị trí là bắt buộc"),
  title: z.string().min(1, "Tên kho là bắt buộc"),
  type: z.string().min(1, "Loại kho là bắt buộc"),
});

export const itemSchema = z.object({
  barcode: z.string().optional(),
  brandId: z.string().min(1, "Thương hiệu là bắt buộc"),
  buyingPrice: z.coerce
    .number({ invalid_type_error: "Giá mua phải là số" })
    .min(15000, "Giá mua phải lớn hơn 15.000"),
  categoryId: z.string().min(1, "Danh mục là bắt buộc"),
  description: z.string().optional(),
  dimensions: z.string().optional(),
  notes: z.string().optional(),
  quantity: z.coerce
    .number({ invalid_type_error: "Số lượng phải là số" })
    .min(0, "Số lượng không được âm")
    .optional(),
  reorderPoint: z.coerce
    .number({ invalid_type_error: "Mức đặt lại phải là số" })
    .min(0, "Mức đặt lại không được âm")
    .optional(),
  sellingPrice: z.coerce
    .number({ invalid_type_error: "Giá bán phải là số" })
    .min(15000, "Giá bán phải lớn hơn 15.000"),
  sku: z.string().optional(),
  supplierId: z.string().optional(),
  taxRate: z.coerce
    .number({ invalid_type_error: "Thuế phải là số" })
    .min(0, "Thuế không được âm")
    .max(100, "Thuế không được quá 100%")
    .optional(),
  title: z.string().min(1, "Tên mặt hàng là bắt buộc"),
  unitId: z.string().min(1, "Đơn vị tính là bắt buộc"),
  warehouseId: z.string().optional(),
  weight: z.coerce
    .number({ invalid_type_error: "Khối lượng phải là số" })
    .min(0, "Khối lượng không được âm")
    .optional(),
});

export const addStockSchema = z.object({
  addStockQuantity: z.coerce
    .number({ invalid_type_error: "Số lượng phải là số" })
    .min(1, "Số lượng phải lớn hơn 0"),
  notes: z.string().optional(),
  receivingWarehouseId: z.string().min(1, "Kho nhận là bắt buộc"),
  referenceNumber: z.string().optional(),
});

export const transferStockSchema = z.object({
  givingWarehouseId: z.string().min(1, "Kho gửi là bắt buộc"),
  notes: z.string().optional(),
  receivingWarehouseId: z.string().min(1, "Kho nhận là bắt buộc"),
  referenceNumber: z.string().optional(),
  transferStockQuantity: z.coerce
    .number({ invalid_type_error: "Số lượng phải là số" })
    .min(1, "Số lượng phải lớn hơn 0"),
});
