import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FormHeader from "@/components/dashboard/FormHeader";
import { getData } from "@/lib/getData";
import AdjustmentTabs from "./AdjustmentTabs";

export default async function NewAdjustmentPage() {
  const [items, warehouses] = await Promise.all([
    getData("/api/items"),
    getData("/api/warehouse"),
  ]);

  return (
    <div>
      <Breadcrumbs />
      <div className="mx-auto max-w-4xl space-y-6">
        <FormHeader
          href="/dashboard/inventory/adjustments"
          title="Tạo điều chỉnh kho"
        />
        <AdjustmentTabs items={items} warehouses={warehouses} />
      </div>
    </div>
  );
}
