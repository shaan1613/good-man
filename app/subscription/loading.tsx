import { Loading } from "@/components/ui/loading";

export default function SubscriptionLoading() {
  return (
    <div className="subscription-container">
      <div className="text-center mb-12">
        <div className="h-10 bg-gray-200 rounded-md w-96 mx-auto animate-pulse mb-4"></div>
        <div className="h-6 bg-gray-200 rounded-md w-64 mx-auto animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {[1, 2, 3].map((item) => (
          <div key={item} className="p-8 border rounded-lg space-y-6">
            <div className="text-center space-y-2">
              <div className="h-6 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
            </div>
            
            <div className="space-y-3">
              {[1, 2, 3, 4].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                </div>
              ))}
            </div>
            
            <div className="h-12 bg-gray-200 rounded-md w-full animate-pulse"></div>
          </div>
        ))}
      </div>
      
      <div className="text-center mb-8">
        <div className="h-6 bg-gray-200 rounded-md w-48 mx-auto animate-pulse mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((item) => (
            <div key={item} className="p-6 border rounded-lg space-y-4">
              <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-center py-8">
        <Loading variant="dots" size="lg" className="text-primary" />
      </div>
    </div>
  );
}
