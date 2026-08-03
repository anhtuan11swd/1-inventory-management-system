import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import CreateCategoryForm from "@/components/dashboard/CreateCategoryForm";
import { getData } from "@/lib/getData";

export default async function UpdateCategoryPage({ params }) {
  const { id } = await params;
  const category = await getData(`/api/categories/${id}`);

  return (
    <div>
      <Breadcrumbs lastLabel={category.title} />
      <CreateCategoryForm initialData={category} isUpdate />
    </div>
  );
}
