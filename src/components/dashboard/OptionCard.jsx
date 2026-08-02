import Link from "next/link";

export default function OptionCard({ optionData }) {
  const {
    title,
    description,
    icon: Icon,
    link,
    linkTitle,
    enabled,
  } = optionData;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
        <Icon className="text-blue-600" size={20} strokeWidth={1.5} />
      </div>
      <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
      <p className="mt-1 text-slate-500 text-xs leading-relaxed">
        {description}
      </p>
      <div className="mt-4">
        {enabled ? (
          <Link
            className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 font-medium text-slate-50 text-xs transition-colors hover:bg-blue-700"
            href={link}
          >
            {linkTitle}
          </Link>
        ) : (
          <button
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-600 text-xs transition-colors hover:bg-slate-50"
            type="button"
          >
            Kích hoạt
          </button>
        )}
      </div>
    </div>
  );
}
