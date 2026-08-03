"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function DeleteBtn({
  endpoint,
  id,
  onOptimisticDelete,
  onRollback,
  resourceName,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const result = await Swal.fire({
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Vâng, xóa nó!",
      icon: "warning",
      showCancelButton: true,
      text: `Bạn không thể khôi phục lại ${resourceName || "mặt hàng"} này!`,
      title: "Bạn có chắc không?",
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    // Optimistic delete: remove from UI immediately
    onOptimisticDelete?.(id);

    try {
      const res = await fetch(`${baseUrl}/api/${endpoint}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Xóa thành công");
      } else {
        // Rollback if API fails
        onRollback?.(id);
        const data = await res.json();
        toast.error(data.error || "Xóa thất bại");
      }
    } catch (error) {
      // Rollback on network error
      onRollback?.(id);
      console.error(error);
      toast.error("Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="rounded p-1.5 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={loading}
      onClick={handleDelete}
      type="button"
    >
      {loading ? <span className="text-xs">...</span> : <Trash2 size={16} />}
    </button>
  );
}
