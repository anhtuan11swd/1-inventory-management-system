import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import CreateUnitForm from "@/components/dashboard/CreateUnitForm";
import { getData } from "@/lib/getData";

export default async function UpdateUnitPage({ params }) {
  const { id } = await params;
  const unit = await getData(`/api/units/${id}`);

  return (
    <div>
      <Breadcrumbs lastLabel={unit.title} />
      <CreateUnitForm initialData={unit} isUpdate />
    </div>
  );
}
