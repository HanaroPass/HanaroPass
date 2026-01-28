export default function NotificationSkeleton() {
  return (
    <div className="flex w-full animate-pulse items-center gap-3 rounded-xl border-2 border-gray-100 bg-white p-4">
      <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />

      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/3 rounded bg-gray-200" />
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-2 w-1/4 rounded bg-gray-200" />
      </div>
    </div>
  );
}
