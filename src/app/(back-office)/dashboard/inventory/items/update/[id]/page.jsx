import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import CreateItemForm from "@/components/dashboard/CreateItemForm";
import { getData } from "@/lib/getData";

export default async function UpdateItemPage({ params }) {
  const { id } = await params;
  const item = await getData(`/api/items/${id}`);

  const [categories, units, brands, suppliers, warehouses] = await Promise.all([
    getData("/api/categories"),
    getData("/api/units"),
    getData("/api/brands"),
    getData("/api/suppliers"),
    getData("/api/warehouse"),
  ]);

  return (
    <div>
      <Breadcrumbs lastLabel={item.title} />
      <CreateItemForm
        brands={brands}
        categories={categories}
        initialData={item}
        isUpdate
        suppliers={suppliers}
        units={units}
        warehouses={warehouses}
      />
    </div>
  );
}
