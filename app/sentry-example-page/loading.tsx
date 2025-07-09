import { Loading } from "@/components/ui/loading";

export default function SentryExampleLoading() {
  return (
    <div className="sentry-example-container">
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-200 rounded-md w-64 mx-auto animate-pulse mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-md w-80 mx-auto animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="p-6 border rounded-lg space-y-4">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded-md w-32 animate-pulse"></div>
        </div>
        
        <div className="p-6 border rounded-lg space-y-4">
          <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded-md w-36 animate-pulse"></div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="h-6 bg-gray-200 rounded w-44 animate-pulse mb-4"></div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center py-8">
        <Loading variant="spinner" size="lg" className="text-primary" />
      </div>
    </div>
  );
}
