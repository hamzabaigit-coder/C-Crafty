export default function Loading() {
  return (
    <div className="container-page animate-pulse pt-8" aria-busy="true" aria-label="Loading">
      <div className="h-8 w-64 rounded-lg bg-surface" />
      <div className="mt-3 h-4 w-96 max-w-full rounded bg-surface" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-48 rounded-2xl bg-surface" />
        ))}
      </div>
    </div>
  )
}
