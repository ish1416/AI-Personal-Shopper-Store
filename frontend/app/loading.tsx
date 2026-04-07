export default function Loading() {
  return (
    <div className="p-8 space-y-4 max-w-4xl">
      <div className="h-8 w-48 bg-ink-soft rounded-xl shimmer" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] card shimmer" />
        ))}
      </div>
    </div>
  );
}
