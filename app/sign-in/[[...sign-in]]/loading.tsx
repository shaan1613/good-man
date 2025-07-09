import { Loading } from "@/components/ui/loading";

export default function SignInLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="h-8 bg-gray-200 rounded-md w-48 mx-auto animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-md w-64 mx-auto animate-pulse"></div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>
          </div>
          
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>
          </div>
          
          <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>
        </div>
        
        <div className="text-center">
          <div className="h-4 bg-gray-200 rounded-md w-32 mx-auto animate-pulse"></div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>
        </div>
        
        <div className="flex items-center justify-center py-4">
          <Loading variant="spinner" size="md" className="text-primary" />
        </div>
      </div>
    </div>
  );
}
