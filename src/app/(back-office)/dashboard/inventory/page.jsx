import {
  Diff,
  Factory,
  LayoutGrid,
  LayoutPanelTop,
  Scale,
  Tag,
  Warehouse,
} from "lucide-react";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";
import OptionCard from "@/components/dashboard/OptionCard";

const OPTION_CARDS = [
  {
    description: "Hàng hóa và sản phẩm trong kho.",
    enabled: true,
    icon: LayoutGrid,
    link: "/dashboard/inventory/items/new",
    linkTitle: "Mặt hàng mới",
    title: "Hàng hóa",
  },
  {
    description: "Phân loại hàng hóa theo danh mục.",
    enabled: true,
    icon: LayoutPanelTop,
    link: "/dashboard/inventory/categories/new",
    linkTitle: "Danh mục mới",
    title: "Danh mục",
  },
  {
    description: "Thương hiệu sản phẩm.",
    enabled: true,
    icon: Tag,
    link: "/dashboard/inventory/brands/new",
    linkTitle: "Thương hiệu mới",
    title: "Thương hiệu",
  },
  {
    description: "Đơn vị đo lường hàng hóa.",
    enabled: true,
    icon: Scale,
    link: "/dashboard/inventory/units/new",
    linkTitle: "Đơn vị mới",
    title: "Đơn vị tính",
  },
  {
    description: "Kho hàng và vị trí lưu trữ.",
    enabled: true,
    icon: Warehouse,
    link: "/dashboard/inventory/warehouse/new",
    linkTitle: "Kho hàng mới",
    title: "Kho hàng",
  },
  {
    description: "Nhà cung cấp sản phẩm.",
    enabled: true,
    icon: Factory,
    link: "/dashboard/inventory/suppliers/new",
    linkTitle: "Nhà cung cấp mới",
    title: "Nhà cung cấp",
  },
  {
    description: "Điều chỉnh tồn kho.",
    enabled: true,
    icon: Diff,
    link: "/dashboard/inventory/adjustments/new",
    linkTitle: "Điều chỉnh mới",
    title: "Điều chỉnh kho",
  },
];

export default function InventoryPage() {
  return (
    <div>
      <Breadcrumbs />
      <FixedHeader
        newLink="/dashboard/inventory/items/new"
        title="Tổng quan kho hàng"
      />

      <div className="mt-6 grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
        {OPTION_CARDS.map((card) => (
          <OptionCard key={card.title} optionData={card} />
        ))}
      </div>
    </div>
  );
}
