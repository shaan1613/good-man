import { Loading } from "@/components/ui/loading";

export default function RootLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center space-y-4">
        <Loading variant="spinner" size="lg" className="text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading Converso...
        </p>
      </div>
    </div>
  );
}
