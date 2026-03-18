import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <main className={`flex-grow ${className}`}>
      {children}
    </main>
  );
}
