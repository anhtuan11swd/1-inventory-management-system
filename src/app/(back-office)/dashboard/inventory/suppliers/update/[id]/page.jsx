import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import CreateSupplierForm from "@/components/dashboard/CreateSupplierForm";
import { getData } from "@/lib/getData";

export default async function UpdateSupplierPage({ params }) {
  const { id } = await params;
  const supplier = await getData(`/api/suppliers/${id}`);

  return (
    <div>
      <Breadcrumbs lastLabel={supplier.title} />
      <CreateSupplierForm initialData={supplier} isUpdate />
    </div>
  );
}
