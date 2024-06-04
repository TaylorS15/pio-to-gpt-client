import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="relative flex min-h-[100dvh] w-screen flex-col items-center gap-8 bg-black p-6 text-white">
      <div className="absolute right-4 top-4 flex gap-6">
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-9 w-9" />
      </div>
      <div className="absolute bottom-8 left-auto right-auto flex flex-col gap-4">
        <div className="flex gap-4">
          <Skeleton className="h-10 w-96" />
          <Skeleton className="h-10 w-16" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-28" />
        </div>
        <Skeleton className="h-6 w-36" />
      </div>
    </main>
  );
}
