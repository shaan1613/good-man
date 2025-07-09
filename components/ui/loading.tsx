import React from 'react';

interface LoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  variant = 'spinner', 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const spinnerSize = sizeClasses[size];

  switch (variant) {
    case 'spinner':
      return (
        <div className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] ${spinnerSize} ${className}`}>
          <span className="sr-only">Loading...</span>
        </div>
      );

    case 'dots':
      return (
        <div className={`flex space-x-2 ${className}`}>
          <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
        </div>
      );

    case 'pulse':
      return (
        <div className={`animate-pulse bg-current rounded ${size === 'sm' ? 'h-4' : size === 'md' ? 'h-8' : 'h-12'} ${className}`}>
          <span className="sr-only">Loading...</span>
        </div>
      );

    case 'skeleton':
      return (
        <div className={`animate-pulse bg-gray-200 rounded ${className}`}>
          <span className="sr-only">Loading...</span>
        </div>
      );

    default:
      return (
        <div className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] ${spinnerSize} ${className}`}>
          <span className="sr-only">Loading...</span>
        </div>
      );
  }
};

export const LoadingCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`companion-card animate-pulse ${className}`}>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-20 bg-gray-200 rounded"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export const LoadingGrid: React.FC<{ count?: number; className?: string }> = ({ 
  count = 3, 
  className = '' 
}) => {
  return (
    <div className={`companions-grid ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <LoadingCard key={index} />
      ))}
    </div>
  );
};

export default Loading;
