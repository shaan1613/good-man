import { Loading } from "@/components/ui/loading";

export default function MyJourneyLoading() {
  return (
    <div className="my-journey-container">
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded-md w-48 animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-200 rounded-md w-64 animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="p-6 border rounded-lg space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mb-8">
        <div className="h-6 bg-gray-200 rounded-md w-40 animate-pulse mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>
              <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-center py-8">
        <Loading variant="spinner" size="md" className="text-primary" />
      </div>
    </div>
  );
}
