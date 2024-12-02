import { Navbar } from '@/components/navbar/Navbar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen max-h-auto min-h-screen flex flex-col">
      <Navbar />
      <br />
      <div className="h-full w-screen px-4 py-4 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default layout;
