"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import AddInventoryForm from "@/components/dashboard/AddInventoryForm";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import FormHeader from "@/components/dashboard/FormHeader";
import TransferInventoryForm from "@/components/dashboard/TransferInventoryForm";
import { cn } from "@/lib/utils";

const TABS = [
  { icon: Plus, key: "add", label: "Thêm kho" },
  { icon: Minus, key: "transfer", label: "Chuyển kho" },
];

export default function NewAdjustmentPage() {
  const [activeForm, setActiveForm] = useState("add");

  return (
    <div>
      <Breadcrumbs />
      <div className="mx-auto max-w-4xl space-y-6">
        <FormHeader
          href="/dashboard/inventory/adjustments"
          title="Tạo điều chỉnh kho"
        />

        <div className="flex gap-2 rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 font-medium text-sm transition-colors",
                  activeForm === tab.key
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100",
                )}
                key={tab.key}
                onClick={() => setActiveForm(tab.key)}
                type="button"
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeForm === "add" ? (
          <AddInventoryForm />
        ) : (
          <TransferInventoryForm />
        )}
      </div>
    </div>
  );
}
