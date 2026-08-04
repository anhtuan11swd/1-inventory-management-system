import DataTable from "@/components/dashboard/DataTable";

export default function StockTable({ title, items }) {
  return (
    <div className="mt-6">
      <h2 className="mb-4 font-semibold text-lg text-slate-900">{title}</h2>
      <DataTable
        columns={["imageUrl", "title", "quantity"]}
        data={items}
        headerLabels={{
          imageUrl: "Ảnh",
          quantity: "Số lượng",
          title: "Tên hàng",
        }}
        resourceName="hàng hóa"
      />
    </div>
  );
}
