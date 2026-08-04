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
  imageUrl: z.string().url().optional().or(z.literal("")),
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

export const supplierSchema = z.object({
  address: z.string().optional(),
  contactPerson: z.string().optional(),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  notes: z.string().optional(),
  paymentTerms: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{10}$/.test(val), {
      message: "Số điện thoại phải có đúng 10 chữ số",
    })
    .refine((val) => !val || val.startsWith("0"), {
      message: "Số điện thoại phải bắt đầu bằng 0",
    }),
  supplierCode: z.string().optional(),
  taxId: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{10}$|^\d{10}-\d{3}$/.test(val), {
      message:
        "Mã số thuế phải gồm 10 số hoặc 13 số (XXXXXXXXXX hoặc XXXXXXXXXX-XXX)",
    }),
  title: z.string().min(1, "Tên nhà cung cấp là bắt buộc"),
});

export const addStockSchema = z.object({
  addStockQuantity: z.coerce
    .number({ invalid_type_error: "Số lượng phải là số" })
    .min(1, "Số lượng phải lớn hơn 0"),
  itemId: z.string().optional(),
  notes: z.string().optional(),
  receivingWarehouseId: z.string().min(1, "Kho nhận là bắt buộc"),
  referenceNumber: z.string().optional(),
  supplierId: z.string().optional(),
});

export const transferStockSchema = z.object({
  givingWarehouseId: z.string().min(1, "Kho gửi là bắt buộc"),
  itemId: z.string().optional(),
  notes: z.string().optional(),
  receivingWarehouseId: z.string().min(1, "Kho nhận là bắt buộc"),
  referenceNumber: z.string().optional(),
  transferStockQuantity: z.coerce
    .number({ invalid_type_error: "Số lượng phải là số" })
    .min(1, "Số lượng phải lớn hơn 0"),
});

const namePattern = /^[\p{L}\p{M}\p{Z}.'’-]+$/u;
const passwordPattern =
  /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,64}$/;

export const userSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email là bắt buộc")
    .email("Email không hợp lệ")
    .max(254, "Email không được vượt quá 254 ký tự"),
  name: z
    .string()
    .trim()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(100, "Tên không được vượt quá 100 ký tự")
    .regex(
      namePattern,
      "Tên chỉ được chứa chữ cái, dấu cách, gạch nối (-), dấu nháy ('), dấu chấm (.) và dấu cách đơn",
    )
    .refine(
      (value) => /\p{L}/u.test(value),
      "Tên phải chứa ít nhất một chữ cái",
    )
    .transform((value) => value.replace(/\s+/g, " ")),
  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(64, "Mật khẩu không được vượt quá 64 ký tự")
    .regex(
      passwordPattern,
      "Mật khẩu phải có ít nhất 1 chữ thường, 1 chữ hoa, 1 chữ số, 1 ký tự đặc biệt và không chứa khoảng trắng",
    ),
});

export const registerSchema = userSchema
  .extend({
    confirmPassword: z.string().min(1, "Xác nhận mật khẩu là bắt buộc"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Xác nhận mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email là bắt buộc")
    .email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});
