"use client";

import { AlertCircle } from "lucide-react";

export default function TextInput({
  label,
  name,
  register,
  errors,
  isRequired = false,
  type = "text",
  className = "",
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
      <input
        className="block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 text-sm shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        id={name}
        type={type}
        {...register(name, {
          required: isRequired ? `${label} là bắt buộc` : false,
        })}
      />
      {errors?.[name] && (
        <p className="mt-1 flex items-center gap-1 text-red-500 text-xs">
          <AlertCircle size={12} />
          {errors[name].message}
        </p>
      )}
    </div>
  );
}
