import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import CreateItemForm from "@/components/dashboard/CreateItemForm";
import { getData } from "@/lib/getData";

export default async function NewItemPage() {
  const [categories, units, brands, suppliers, warehouses] = await Promise.all([
    getData("/api/categories"),
    getData("/api/units"),
    getData("/api/brands"),
    getData("/api/suppliers"),
    getData("/api/warehouse"),
  ]);

  return (
    <div>
      <Breadcrumbs />
      <CreateItemForm
        brands={brands}
        categories={categories}
        suppliers={suppliers}
        units={units}
        warehouses={warehouses}
      />
    </div>
  );
}
