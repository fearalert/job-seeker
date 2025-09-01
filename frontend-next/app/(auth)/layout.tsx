/** @format */

import { Navbar } from '@/components/navbar/Navbar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
