import { Loading, LoadingGrid } from "@/components/ui/loading";

export default function DashboardLoading() {
  return (
    <div className="dashboard-container">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded-md w-48 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-md w-32 animate-pulse"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded-md w-32 animate-pulse"></div>
      </div>
      
      <div className="mb-6">
        <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>
      </div>
      
      <LoadingGrid count={6} className="mb-8" />
      
      <div className="flex items-center justify-center py-8">
        <Loading variant="dots" size="md" className="text-primary" />
      </div>
    </div>
  );
}
