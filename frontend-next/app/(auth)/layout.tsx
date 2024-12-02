import { Navbar } from '@/components/navbar/Navbar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen max-h-auto flex flex-col">
      <Navbar />
      <div className="flex-1 h-full w-screen px-4 py-4 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default layout;
