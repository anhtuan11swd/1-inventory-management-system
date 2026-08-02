import { Boxes, Component, Package, ScrollText } from "lucide-react";
import FixedHeader from "@/components/dashboard/FixedHeader";
import OptionCard from "@/components/dashboard/OptionCard";

const OPTION_CARDS = [
  {
    description: "Hàng hóa và sản phẩm trong kho.",
    enabled: true,
    icon: Package,
    link: "/dashboard/inventory/items/new",
    linkTitle: "Mặt hàng mới",
    title: "Hàng hóa",
  },
  {
    description: "Nhóm hàng hóa theo danh mục.",
    enabled: false,
    icon: Boxes,
    link: "#",
    linkTitle: "Nhóm mặt hàng mới",
    title: "Nhóm hàng hóa",
  },
  {
    description: "Hàng hóa tổng hợp từ nhiều mục.",
    enabled: false,
    icon: Component,
    link: "#",
    linkTitle: "Mặt hàng tổng hợp mới",
    title: "Mặt hàng tổng hợp",
  },
  {
    description: "Danh sách giá cho hàng hóa.",
    enabled: false,
    icon: ScrollText,
    link: "#",
    linkTitle: "Bảng giá mới",
    title: "Bảng giá",
  },
];

export default function InventoryPage() {
  return (
    <div>
      <FixedHeader newLink="/dashboard/inventory/items/new" />

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {OPTION_CARDS.map((card) => (
          <OptionCard key={card.title} optionData={card} />
        ))}
      </div>
    </div>
  );
}
