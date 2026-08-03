export default function Loading() {
  return (
    <div className="animate-pulse space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="h-8 w-48 rounded bg-slate-200" />
      <div className="h-4 w-64 rounded bg-slate-200" />
      <div className="mt-6 space-y-4">
        <div className="h-12 rounded-lg bg-slate-200" />
        <div className="space-y-3">
          {["row-1", "row-2", "row-3", "row-4", "row-5"].map((key) => (
            <div className="flex gap-4" key={key}>
              <div className="h-10 w-10 rounded bg-slate-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-1/2 rounded bg-slate-200" />
              </div>
              <div className="h-4 w-20 rounded bg-slate-200" />
              <div className="h-4 w-20 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
