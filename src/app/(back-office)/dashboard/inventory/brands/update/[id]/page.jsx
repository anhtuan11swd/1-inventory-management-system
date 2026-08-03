import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import CreateBrandForm from "@/components/dashboard/CreateBrandForm";
import { getData } from "@/lib/getData";

export default async function UpdateBrandPage({ params }) {
  const { id } = await params;
  const brand = await getData(`/api/brands/${id}`);

  return (
    <div>
      <Breadcrumbs lastLabel={brand.title} />
      <CreateBrandForm initialData={brand} isUpdate />
    </div>
  );
}
