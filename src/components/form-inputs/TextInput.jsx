"use client";

import { AlertCircle, Eye, EyeOff } from "lucide-react";

export default function TextInput({
  label,
  name,
  register,
  errors,
  isRequired = false,
  type = "text",
  className = "",
  disabled = false,
  maxLength,
  inputMode,
  pattern,
  showPassword,
  onTogglePassword,
}) {
  const showToggle = type === "password" && typeof showPassword === "boolean";

  const input = (
    <input
      className={`block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 text-sm shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:cursor-not-allowed ${
        showToggle ? "pr-10" : ""
      }`}
      disabled={disabled}
      id={name}
      inputMode={inputMode}
      maxLength={maxLength}
      pattern={pattern}
      type={showToggle ? (showPassword ? "text" : "password") : type}
      {...register(name, {
        required: isRequired ? `${label} là bắt buộc` : false,
      })}
    />
  );

  return (
    <div className={className}>
      <label
        className="mb-1.5 block font-medium text-slate-700 text-sm"
        htmlFor={name}
      >
        {label}
        {isRequired && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {showToggle ? (
        <div className="relative">
          {input}
          <button
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition-colors hover:text-slate-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-slate-400"
            disabled={disabled}
            onClick={onTogglePassword}
            type="button"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      ) : (
        input
      )}
      {errors?.[name] && (
        <p className="mt-1 flex items-center gap-1 text-red-500 text-xs">
          <AlertCircle size={12} />
          {errors[name].message}
        </p>
      )}
    </div>
  );
}
