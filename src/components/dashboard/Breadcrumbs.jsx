"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const LABELS = {
  adjustments: "Điều chỉnh kho",
  brands: "Thương hiệu",
  categories: "Danh mục",
  "credit-notes": "Ghi có",
  customers: "Khách hàng",
  dashboard: "Trang chủ",
  inventory: "Kho hàng",
  invoices: "Hóa đơn",
  items: "Hàng hóa",
  new: "Tạo mới",
  packages: "Gói hàng",
  "payment-received": "Thanh toán nhận",
  sales: "Bán hàng",
  "sales-orders": "Đơn hàng bán",
  "sales-receipts": "Biên nhận bán",
  "sales-returns": "Trả hàng bán",
  shipments: "Vận chuyển",
  suppliers: "Nhà cung cấp",
  units: "Đơn vị tính",
  warehouse: "Kho hàng",
};

export default function Breadcrumbs({ lastLabel }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const SKIP_SEGMENTS = ["update"];

  const items = segments
    .map((segment, index) => {
      if (SKIP_SEGMENTS.includes(segment)) return null;
      return { originalIndex: index, segment };
    })
    .filter(Boolean)
    .map((item, index, arr) => {
      const isLast = index === arr.length - 1;
      const href = `/${segments.slice(0, item.originalIndex + 1).join("/")}`;
      const label =
        isLast && lastLabel ? lastLabel : LABELS[item.segment] || item.segment;
      return { href, isLast, label };
    });

  if (items.length <= 1) return null;

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {items.map((item) => (
          <Fragment key={item.href}>
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink render={<Link href={item.href} />}>
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item.isLast && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
