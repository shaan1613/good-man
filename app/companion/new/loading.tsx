import { Loading } from "@/components/ui/loading";

export default function NewCompanionLoading() {
  return (
    <div className="new-companion-container">
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded-md w-64 animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-200 rounded-md w-48 animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>
          </div>
          
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>
          </div>
          
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded-md w-full animate-pulse"></div>
          </div>
          
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-36 animate-pulse"></div>
            <div className="h-32 bg-gray-200 rounded-md w-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-40 bg-gray-200 rounded-md w-full animate-pulse"></div>
          </div>
          
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center py-8">
        <Loading variant="pulse" size="md" className="text-primary w-32" />
      </div>
    </div>
  );
}
