import { Layers, LayoutGrid, Truck, Users } from "lucide-react";
import DataTable from "@/components/dashboard/DataTable";
import Navbar from "@/components/landing/Navbar";
import { DEMO_COUNTS, DEMO_WAREHOUSES } from "@/lib/demoData";

const STAT_CARDS = [
  {
    color: "text-blue-600",
    icon: Layers,
    title: "Hàng hóa",
    value: DEMO_COUNTS.items,
  },
  {
    color: "text-emerald-600",
    icon: LayoutGrid,
    title: "Danh mục",
    value: DEMO_COUNTS.categories,
  },
  {
    color: "text-orange-600",
    icon: Truck,
    title: "Kho hàng",
    value: DEMO_COUNTS.warehouses,
  },
  {
    color: "text-purple-600",
    icon: Users,
    title: "Nhà cung cấp",
    value: DEMO_COUNTS.suppliers,
  },
];

export default function DemoPage() {
  const allItems = DEMO_WAREHOUSES.flatMap((warehouse) =>
    warehouse.items.map((item) => ({ ...item, warehouse: warehouse.title })),
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-bold text-3xl text-slate-900 sm:text-4xl">
            Khám phá hệ thống qua dữ liệu mẫu
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Đây là dữ liệu minh họa dùng để trải nghiệm giao diện. Hãy tạo tài
            khoản để quản lý kho hàng thật của bạn.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAT_CARDS.map(({ color, icon: Icon, title, value }) => (
            <div
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-md"
              key={title}
            >
              <div className="flex items-center justify-between">
                <p className={`font-bold text-2xl ${color}`}>{value}</p>
                <Icon aria-hidden="true" className="text-slate-300" size={20} />
              </div>
              <p className="mt-1 font-medium text-slate-700 text-sm">{title}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="font-semibold text-slate-900 text-xl">
            Hàng tồn kho hiện có
          </h2>
          <div className="mt-4">
            <DataTable
              columns={["imageUrl", "title", "warehouse", "quantity"]}
              data={allItems}
              headerLabels={{
                imageUrl: "Ảnh",
                quantity: "Số lượng",
                title: "Tên hàng",
                warehouse: "Kho",
              }}
              resourceName="hàng hóa"
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {DEMO_WAREHOUSES.map((warehouse) => (
            <div
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={warehouse.id}
            >
              <h2 className="font-semibold text-lg text-slate-900">
                Tồn kho tại {warehouse.title}
              </h2>
              <p className="mt-0.5 text-slate-500 text-sm">
                Tổng tồn kho: {warehouse.stockQuantity}
              </p>
              <div className="mt-4">
                <DataTable
                  columns={["imageUrl", "title", "quantity"]}
                  data={warehouse.items}
                  headerLabels={{
                    imageUrl: "Ảnh",
                    quantity: "Số lượng",
                    title: "Tên hàng",
                  }}
                  resourceName="hàng hóa"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-blue-600 px-6 py-10 text-center">
          <h2 className="font-semibold text-2xl text-slate-50">
            Sẵn sàng quản lý kho thật?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-blue-100">
            Tạo tài khoản miễn phí để bắt đầu quản lý hàng tồn kho, chuyển kho
            giữa các chi nhánh và theo dõi hoạt động kinh doanh.
          </p>
          <a
            className="mt-6 inline-flex items-center rounded-md bg-white px-5 py-2.5 font-medium text-blue-700 text-sm transition hover:bg-blue-50"
            href="/register"
          >
            Tạo tài khoản mới
          </a>
        </div>
      </main>
    </div>
  );
}
