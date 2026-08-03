import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import CreateWarehouseForm from "@/components/dashboard/CreateWarehouseForm";
import { getData } from "@/lib/getData";

export default async function UpdateWarehousePage({ params }) {
  const { id } = await params;
  const warehouse = await getData(`/api/warehouse/${id}`);

  return (
    <div>
      <Breadcrumbs lastLabel={warehouse.title} />
      <CreateWarehouseForm initialData={warehouse} isUpdate />
    </div>
  );
}
