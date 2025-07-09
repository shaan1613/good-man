import { Loading } from "@/components/ui/loading";

export default function CompanionDetailLoading() {
  return (
    <div className="companion-detail-container">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded-md w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-32 animate-pulse"></div>
          </div>
        </div>
        <div className="h-10 bg-gray-200 rounded-md w-24 animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-32 bg-gray-200 rounded-md w-full animate-pulse"></div>
          </div>
          
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-40 animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded-md w-full animate-pulse"></div>
          </div>
          
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-36 animate-pulse"></div>
            <div className="h-40 bg-gray-200 rounded-md w-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="p-6 border rounded-lg space-y-4">
            <div className="h-5 bg-gray-200 rounded w-28 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>
          </div>
          
          <div className="p-6 border rounded-lg space-y-4">
            <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center py-8">
        <Loading variant="dots" size="lg" className="text-primary" />
      </div>
    </div>
  );
}
