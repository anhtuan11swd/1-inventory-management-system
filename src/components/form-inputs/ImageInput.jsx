"use client";

import { Pencil, Upload, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

export default function ImageInput({
  label,
  imageFile,
  setImageFile,
  existingImageUrl,
  className = "",
  disabled = false,
}) {
  const inputRef = useRef(null);

  const objectUrl = useMemo(() => {
    if (!imageFile) return null;
    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  const previewURL = objectUrl || existingImageUrl || null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  if (previewURL) {
    return (
      <div className={className}>
        <label
          className="mb-1.5 block font-medium text-slate-700 text-sm"
          htmlFor="image-upload"
        >
          {label}
        </label>
        <div className="relative overflow-hidden rounded-md border border-slate-200">
          <Image
            alt="Ảnh minh họa"
            className="h-48 w-full object-contain"
            height={192}
            priority
            src={previewURL}
            style={{ height: "auto", width: "100%" }}
            width={384}
          />
          <div className="absolute top-2 right-2 flex gap-1.5">
            <button
              className="flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 font-medium text-slate-700 text-xs shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={disabled}
              onClick={() => inputRef.current?.click()}
              type="button"
            >
              <Pencil size={12} />
              Thay đổi ảnh
            </button>
            <button
              className="flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 font-medium text-slate-700 text-xs shadow-sm transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={disabled}
              onClick={() => {
                setImageFile(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              type="button"
            >
              <X size={12} />
              Xóa
            </button>
          </div>
        </div>
        <input
          accept="image/*"
          className="hidden"
          id="image-upload"
          onChange={handleFileChange}
          ref={inputRef}
          type="file"
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <label
        className="mb-1.5 block font-medium text-slate-700 text-sm"
        htmlFor="image-upload"
      >
        {label}
      </label>
      <button
        className={cn(
          "relative flex w-full flex-col items-center gap-2 rounded-md border-2 border-slate-300 border-dashed p-6 transition-colors",
          disabled
            ? "cursor-not-allowed opacity-50 hover:cursor-not-allowed hover:border-slate-300"
            : "cursor-pointer hover:border-blue-400",
        )}
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        type="button"
      >
        <Upload className="h-8 w-8 text-slate-400" />
        <span className="text-slate-500 text-sm">Chọn ảnh để tải lên</span>
        <input
          accept="image/*"
          className="hidden"
          id="image-upload"
          onChange={handleFileChange}
          ref={inputRef}
          type="file"
        />
      </button>
    </div>
  );
}
