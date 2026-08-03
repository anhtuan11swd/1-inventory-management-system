"use client";

import { AlertCircle, ChevronDown } from "lucide-react";

export default function SelectInput({
  label,
  name,
  register,
  errors,
  isRequired = false,
  options = [],
  className = "",
  defaultValue = "",
  disabled = false,
}) {
  return (
    <div className={className}>
      <label
        className="mb-1.5 block font-medium text-slate-700 text-sm"
        htmlFor={name}
      >
        {label}
        {isRequired && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          className="block w-full appearance-none rounded-md border border-slate-300 bg-white px-3 py-2 pr-10 text-slate-900 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:cursor-not-allowed"
          defaultValue={defaultValue}
          disabled={disabled}
          id={name}
          {...register(name, {
            required: isRequired ? `${label} là bắt buộc` : false,
          })}
        >
          <option value="">-- Chọn --</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
          size={16}
        />
      </div>
      {errors?.[name] && (
        <p className="mt-1 flex items-center gap-1 text-red-500 text-xs">
          <AlertCircle size={12} />
          {errors[name].message}
        </p>
      )}
    </div>
  );
}
