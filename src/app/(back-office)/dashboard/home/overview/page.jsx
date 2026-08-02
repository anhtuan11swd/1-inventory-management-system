import SalesOverview from "@/components/dashboard/SalesOverview";

export default function OverviewPage() {
  return (
    <div>
      <h1 className="font-semibold text-2xl">Tổng quan</h1>
      <p className="mt-1 text-slate-500">
        Tổng quan hoạt động kinh doanh và tình trạng kho hàng.
      </p>
      <div className="mt-6">
        <SalesOverview />
      </div>
    </div>
  );
}
