import { Loading, LoadingGrid } from "@/components/ui/loading";

export default function CompanionLoading() {
  return (
    <div className="companion-container">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded-md w-56 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-md w-40 animate-pulse"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded-md w-40 animate-pulse"></div>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="h-12 bg-gray-200 rounded-md flex-1 animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded-md w-32 animate-pulse"></div>
      </div>
      
      <LoadingGrid count={8} />
      
      <div className="flex items-center justify-center py-8">
        <Loading variant="spinner" size="md" className="text-primary" />
      </div>
    </div>
  );
}
