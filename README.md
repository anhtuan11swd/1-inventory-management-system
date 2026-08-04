# Hệ thống Quản lý Kho hàng

Nền tảng quản lý kho hàng hiện đại được xây dựng bằng Next.js, giúp doanh nghiệp theo dõi tồn kho, quản lý hàng hóa, nhà cung cấp, kho hàng và thực hiện chuyển kho giữa các chi nhánh trong một giao diện duy nhất.

## Mục lục

- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Yêu cầu](#yêu-cầu)
- [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)
- [Môi trường](#môi-trường)
- [Hướng dẫn sử dụng](#hướng-dẫn-sử-dụng)
- [API Reference](#api-reference)
- [Schema Database](#schema-database)
- [Scripts](#scripts)
- [Tính năng đang phát triển](#tính-năng-đang-phát-triển)

## Tính năng

- **Quản lý hàng hóa (Items)**: CRUD hàng hóa với thông tin chi tiết (SKU, barcode, giá mua/bán, trọng lượng, kích thước, thuế)
- **Danh mục (Categories)**: Phân loại hàng hóa theo danh mục
- **Thương hiệu (Brands)**: Quản lý thương hiệu sản phẩm
- **Đơn vị tính (Units)**: Quản lý đơn vị đo lường (kg, cái, thùng, ...)
- **Kho hàng (Warehouses)**: Quản lý nhiều kho với vị trí, loại kho và tổng tồn kho
- **Nhà cung cấp (Suppliers)**: Thông tin nhà cung cấp bao gồm mã số thuế, điều khoản thanh toán
- **Điều chỉnh tồn kho**:
  - **Bổ sung kho (Add Stock)**: Nhập hàng vào kho từ nhà cung cấp
  - **Chuyển kho (Transfer Stock)**: Chuyển hàng giữa các kho với kiểm tra tồn kho đủ
- **Xác thực người dùng**: Đăng ký / Đăng nhập với NextAuth + Credentials Provider + JWT
- **Trang Demo**: Dữ liệu mẫu để trải nghiệm giao diện mà không cần đăng ký
- **Tải ảnh lên**: Hỗ trợ UploadThing cho việc tải ảnh sản phẩm
- **Responsive Design**: Giao diện thích ứng trên mọi thiết bị (mobile sidebar, collapsible menu)
- **Dark Mode**: Hỗ trợ chế độ tối (sẵn sàng trong CSS theme)

## Công nghệ sử dụng

| Lớp | Công nghệ |
|------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| ORM | [Prisma 6](https://www.prisma.io/) |
| Database | [MongoDB](https://www.mongodb.com/) (MongoDB Atlas) |
| Xác thực | [NextAuth 5](https://next-auth.js.org/) (Credentials + JWT) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) (Base Vega style) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Form | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Icons | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) |
| Upload | [UploadThing](https://uploadthing.com/) |
| Toast | [React Hot Toast](https://react-hot-toast.com/) |
| Alert | [SweetAlert2](https://sweetalert2.github.io/) |
| Linting | [Biome](https://biomejs.dev/) + ESLint |
| Font | [Inter](https://vercel.com/font) (via next/font) |

## Cấu trúc dự án

```
.
├── prisma/
│   └── schema.prisma              # Database schema (MongoDB)
├── public/                        # Static assets (SVGs, images)
├── src/
│   ├── app/
│   │   ├── (back-office)/         # Khu vực quản trị (bảo vệ bằng auth)
│   │   │   ├── dashboard/
│   │   │   │   ├── home/          # Tổng quan, thông báo, cập nhật
│   │   │   │   ├── inventory/     # Quản lý kho hàng
│   │   │   │   │   ├── items/         # Hàng hóa
│   │   │   │   │   ├── categories/    # Danh mục
│   │   │   │   │   ├── brands/        # Thương hiệu
│   │   │   │   │   ├── units/         # Đơn vị tính
│   │   │   │   │   ├── warehouse/     # Kho hàng
│   │   │   │   │   ├── suppliers/     # Nhà cung cấp
│   │   │   │   │   └── adjustments/   # Điều chỉnh kho
│   │   │   │   ├── sales/         # Bán hàng
│   │   │   │   ├── purchases/     # Mua hàng
│   │   │   │   ├── reports/       # Báo cáo
│   │   │   │   ├── documents/     # Tài liệu
│   │   │   │   └── integrations/  # Tích hợp
│   │   │   ├── layout.jsx         # Back-office layout (auth guard)
│   │   │   └── loading.jsx        # Loading skeleton
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/ # NextAuth route handler
│   │   │   ├── user/              # Đăng ký người dùng
│   │   │   ├── items/             # CRUD hàng hóa
│   │   │   ├── categories/        # CRUD danh mục
│   │   │   ├── brands/            # CRUD thương hiệu
│   │   │   ├── units/             # CRUD đơn vị tính
│   │   │   ├── warehouse/         # CRUD kho hàng
│   │   │   ├── suppliers/         # CRUD nhà cung cấp
│   │   │   ├── adjustments/       # Điều chỉnh tồn kho
│   │   │   │   ├── add/               # Bổ sung kho
│   │   │   │   └── transfer/          # Chuyển kho
│   │   │   ├── upload/            # Xóa ảnh UploadThing
│   │   │   └── uploadthing/       # UploadThing route handler
│   │   ├── login/                 # Trang đăng nhập
│   │   ├── register/              # Trang đăng ký
│   │   ├── demo/                  # Trang demo (dữ liệu mẫu)
│   │   ├── layout.jsx             # Root layout
│   │   ├── page.jsx               # Landing page (Hero + Navbar + Footer)
│   │   └── globals.css            # Tailwind + theme variables
│   ├── components/
│   │   ├── auth/                  # LoginForm, RegisterForm
│   │   ├── dashboard/             # Các component dashboard
│   │   │   ├── BackOfficeShell.jsx    # Shell layout (sidebar + header)
│   │   │   ├── Sidebar.jsx            # Sidebar điều hướng
│   │   │   ├── Header.jsx             # Header với user menu
│   │   │   ├── DataTable.jsx          # Bảng dữ liệu generic
│   │   │   ├── CreateItemForm.jsx     # Form tạo/sửa hàng hóa
│   │   │   ├── CreateCategoryForm.jsx # Form tạo/sửa danh mục
│   │   │   ├── CreateBrandForm.jsx    # Form tạo/sửa thương hiệu
│   │   │   ├── CreateUnitForm.jsx     # Form tạo/sửa đơn vị tính
│   │   │   ├── CreateWarehouseForm.jsx # Form tạo/sửa kho hàng
│   │   │   ├── CreateSupplierForm.jsx  # Form tạo/sửa nhà cung cấp
│   │   │   ├── AddInventoryForm.jsx   # Form bổ sung kho
│   │   │   ├── TransferInventoryForm.jsx # Form chuyển kho
│   │   │   ├── AdjustmentForm.jsx     # Form điều chỉnh kho
│   │   │   ├── DeleteBtn.jsx          # Nút xóa với optimistic update
│   │   │   ├── SalesOverview.jsx      # Tổng quan bán hàng
│   │   │   └── ...
│   │   ├── form-inputs/           # Các input reusable
│   │   ├── landing/               # Hero, Navbar, Footer
│   │   ├── Providers.jsx          # Toast provider
│   │   └── ui/                    # shadcn/ui components
│   ├── context/
│   │   └── AuthProvider.jsx       # NextAuth SessionProvider
│   ├── lib/
│   │   ├── authOptions.js         # NextAuth config (Credentials + JWT)
│   │   ├── validations.js         # Zod schemas (item, category, brand, ...)
│   │   ├── apiRequest.js          # Helper functions (makePostRequest, makePutRequest)
│   │   ├── getData.js             # Server-side data fetching
│   │   ├── requireAuth.js         # Auth middleware cho API routes
│   │   ├── uploadthing.js         # UploadThing client helper
│   │   ├── utils.js               # cn() utility (clsx + tailwind-merge)
│   │   ├── demoData.js            # Dữ liệu mẫu cho demo page
│   │   └── generateInitials.js    # Tạo initials từ tên
│   └── libs/
│       └── db.js                  # Prisma client singleton
├── .env.example                   # Mẫu biến môi trường
├── biome.json                     # Cấu hình Biome (lint + format)
├── components.json                # Cấu hình shadcn/ui
├── eslint.config.mjs              # Cấu hình ESLint
├── jsconfig.json                  # Path alias (@/ → src/)
├── next.config.mjs                # Cấu hình Next.js
├── postcss.config.mjs             # Cấu hình PostCSS
├── prisma.config.ts               # Cấu hình Prisma CLI
└── package.json                   # Dependencies & scripts
```

## Yêu cầu

- **Node.js**: >= 18.17
- **npm** / **yarn** / **pnpm** / **bun** (package manager tùy chọn)
- **MongoDB Atlas**: Có tài khoản và cluster MongoDB (free tier là đủ)
- **UploadThing**: Tài khoản để lấy API token cho upload ảnh

## Hướng dẫn cài đặt

### 1. Clone repo

```bash
git clone https://github.com/your-username/1-inventory-management-system.git
cd 1-inventory-management-system
```

### 2. Cài đặt dependencies

```bash
npm install
```

Sau khi cài đặt, Prisma client sẽ tự động generate (qua script `postinstall`).

### 3. Cấu hình biến môi trường

```bash
cp .env.example .env
```

Chỉnh sửa file `.env` và điền thông tin:

```env
# MongoDB Atlas connection string
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/inventory?retryWrites=true&w=majority"

# NextAuth secret (tạo tại https://next-auth.js.org/configuration/options#secret)
AUTH_SECRET='your_auth_secret_here'

# UploadThing token (lấy tại https://uploadthing.com/dashboard)
UPLOADTHING_TOKEN='your_uploadthing_token_here'

# Trust host (đặt true khi deploy)
AUTH_TRUST_HOST=true
```

### 4. Khởi chạy development server

```bash
npm run dev
```

Truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## Môi trường

| Biên | Mô tả | Bắt buộc |
|------|-------|----------|
| `DATABASE_URL` | Connection string MongoDB Atlas | Có |
| `AUTH_SECRET` | Secret key cho NextAuth JWT | Có |
| `AUTH_TRUST_HOST` | Trust host header (set `true` khi deploy) | Có |
| `UPLOADTHING_TOKEN` | API token UploadThing | Có (cho upload ảnh) |
| `NEXT_PUBLIC_BASE_URL` | Base URL cho server-side fetch (default: `http://localhost:3000`) | Không |

## Hướng dẫn sử dụng

### Đăng ký tài khoản

1. Truy cập `/register`
2. Nhập tên, email, mật khẩu
3. Mật khẩu yêu cầu: >= 8 ký tự, có chữ hoa, chữ thường, số, ký tự đặc biệt, không có khoảng trắng
4. Sau khi đăng ký, hệ thống sẽ chuyển sang trang đăng nhập

### Đăng nhập

1. Truy cập `/login`
2. Nhập email và mật khẩu
3. Sau khi đăng nhập thành công, sẽ chuyển đến `/dashboard/home/overview`

### Trang Demo

Truy cập `/demo` để xem dữ liệu mẫu (hàng hóa, kho hàng, danh mục) mà không cần đăng ký tài khoản.

### Quản lý kho hàng

Sau khi đăng nhập, truy cập `/dashboard/inventory` để quản lý:

- **Hàng hóa**: Tạo, chỉnh sửa, xóa hàng hóa với đầy đủ thông tin
- **Danh mục**: Phân loại hàng hóa
- **Thương hiệu**: Quản lý thương hiệu
- **Đơn vị tính**: Quản lý đơn vị (kg, cái, thùng, ...)
- **Kho hàng**: Tạo và quản lý nhiều kho
- **Nhà cung cấp**: Thông tin nhà cung cấp
- **Điều chỉnh kho**: Bổ sung hoặc chuyển kho

### Điều chỉnh tồn kho

- **Bổ sung kho** (`/dashboard/inventory/adjustments/new`): Nhập hàng từ nhà cung cấp vào kho
- **Chuyển kho** (`/dashboard/inventory/adjustments/transfer`): Chuyển hàng giữa các kho (kiểm tra tồn kho đủ trước khi chuyển)

## API Reference

Tất cả API routes đều yêu cầu xác thực (trừ `/api/user` POST và `/api/auth`).

### Hàng hóa

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/api/items` | Lấy danh sách hàng hóa |
| `GET` | `/api/items/[id]` | Lấy chi tiết hàng hóa |
| `POST` | `/api/items` | Tạo hàng hóa mới |
| `PUT` | `/api/items/[id]` | Cập nhật hàng hóa |
| `DELETE` | `/api/items/[id]` | Xóa hàng hóa |

### Danh mục

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/api/categories` | Lấy danh sách danh mục |
| `POST` | `/api/categories` | Tạo danh mục mới |
| `PUT` | `/api/categories/[id]` | Cập nhật danh mục |
| `DELETE` | `/api/categories/[id]` | Xóa danh mục |

### Thương hiệu

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/api/brands` | Lấy danh sách thương hiệu |
| `POST` | `/api/brands` | Tạo thương hiệu mới |
| `PUT` | `/api/brands/[id]` | Cập nhật thương hiệu |
| `DELETE` | `/api/brands/[id]` | Xóa thương hiệu |

### Đơn vị tính

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/api/units` | Lấy danh sách đơn vị tính |
| `POST` | `/api/units` | Tạo đơn vị tính mới |
| `PUT` | `/api/units/[id]` | Cập nhật đơn vị tính |
| `DELETE` | `/api/units/[id]` | Xóa đơn vị tính |

### Kho hàng

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/api/warehouse` | Lấy danh sách kho hàng |
| `POST` | `/api/warehouse` | Tạo kho hàng mới |
| `PUT` | `/api/warehouse/[id]` | Cập nhật kho hàng |
| `DELETE` | `/api/warehouse/[id]` | Xóa kho hàng |

### Nhà cung cấp

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/api/suppliers` | Lấy danh sách nhà cung cấp |
| `POST` | `/api/suppliers` | Tạo nhà cung cấp mới |
| `PUT` | `/api/suppliers/[id]` | Cập nhật nhà cung cấp |
| `DELETE` | `/api/suppliers/[id]` | Xóa nhà cung cấp |

### Điều chỉnh tồn kho

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/api/adjustments` | Lấy danh sách điều chỉnh kho |
| `POST` | `/api/adjustments` | Tạo điều chỉnh kho mới |
| `GET` | `/api/adjustments/add` | Lấy danh sách bổ sung kho |
| `POST` | `/api/adjustments/add` | Bổ sung hàng vào kho |
| `GET` | `/api/adjustments/transfer` | Lấy danh sách chuyển kho |
| `POST` | `/api/adjustments/transfer` | Chuyển hàng giữa các kho |

### Người dùng

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `POST` | `/api/user` | Đăng ký tài khoản mới |

### Xác thực

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/api/auth/providers` | Liệt kê các auth providers |
| `GET` | `/api/auth/session` | Lấy session hiện tại |
| `POST` | `/api/auth/signin` | Đăng nhập |
| `POST` | `/api/auth/signout` | Đăng xuất |

## Schema Database

```
┌─────────────┐     ┌──────────┐     ┌─────────┐
│   Category   │────<│   Item   │>────│  Brand  │
└─────────────┘     └──────────┘     └─────────┘
                          │
                   ┌──────┴──────┐
                   │             │
              ┌────┴────┐  ┌─────┴─────┐
              │  Unit   │  │ Warehouse │
              └─────────┘  └─────┬─────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
    ┌─────────┴──────┐  ┌───────┴────────┐  ┌──────┴──────────┐
    │ AddStock-      │  │ TransferStock- │  │    Supplier     │
    │ Adjustment     │  │ Adjustment     │  │                 │
    └────────────────┘  └────────────────┘  └─────────────────┘
```

**Model chính:**

- **Item**: Mặt hàng với tên, mô tả, ảnh, SKU, barcode, số lượng, giá mua/bán, trọng lượng, kích thước, thuế, reorder point
- **Category**: Danh mục phân loại
- **Brand**: Thương hiệu
- **Unit**: Đơn vị tính (tiêu đề + viết tắt)
- **Warehouse**: Kho hàng với vị trí, loại kho, tổng tồn kho
- **Supplier**: Nhà cung cấp với thông tin liên hệ, mã số thuế, điều khoản thanh toán
- **AddStockAdjustment**: Lịch sử bổ sung kho (số lượng, kho nhận, nhà cung cấp)
- **TransferStockAdjustment**: Lịch sử chuyển kho (số lượng, kho gửi, kho nhận)
- **User**: Tài khoản người dùng (email, tên, hashed password)
- **Account / Session / VerificationToken**: Models cho NextAuth

## Scripts

```bash
# Development
npm run dev              # Khởi chạy dev server (port 3000)
npm run predev           # Tự động kill port 3000 trước khi dev

# Production
npm run build            # Build production
npm run start            # Khởi chạy production server

# Lint & Format
npm run biome:check      # Lint + format bằng Biome
npm run biome:lint       # Chỉ lint
npm run biome:format     # Chỉ format
npm run biome:ci         # Kiểm tra CI (không sửa file)
npm run lint             # Lint bằng ESLint
npm run lint:fix         # Tự động sửa lỗi ESLint

# Prisma
npm run postinstall      # Generate Prisma client
```

## Tính năng đang phát triển

Các module sau đang trong giai đoạn phát triển (đã có UI placeholder nhưng chưa có chức năng đầy đủ):

- **Bán hàng**: Khách hàng, đơn hàng bán, gói hàng, vận chuyển, hóa đơn, biên nhận, thanh toán, trả hàng, ghi có
- **Mua hàng**: Quản lý đơn mua hàng
- **Báo cáo**: Thống kê và báo cáo
- **Tài liệu**: Quản lý tài liệu
- **Tích hợp**: Kết nối với bên thứ ba
