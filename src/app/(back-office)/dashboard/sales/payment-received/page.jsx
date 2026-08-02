import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FixedHeader from "@/components/dashboard/FixedHeader";

export default function PaymentReceivedPage() {
  return (
    <div>
      <Breadcrumbs />
      <FixedHeader title="Tất cả thanh toán nhận" />
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Thanh toán nhận</h1>
        <p className="mt-1 text-slate-500">Quản lý thanh toán nhận.</p>
      </div>
    </div>
  );
}
