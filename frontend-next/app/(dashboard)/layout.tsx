import { Navbar } from '@/components/navbar/Navbar';
import AppSidebar from '@/components/sidebar/Sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ROLES } from '@/constants';
import { Sidebar } from 'lucide-react';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {

    const user = {
        role: ROLES.JOB_SEEKER,
      };

  return (
    <SidebarProvider>
    <div className="h-screen max-h-auto flex flex-col">
      {/* <Navbar /> */}
      <div className="flex-1 h-full w-screen px-4 py-4 flex items-start justify-start">
        <AppSidebar user={user} />
        <main className='w-full'>
            <Navbar />
            <Separator className='mb-4' />
            {children}
        </main>
      </div>
    </div>
    </SidebarProvider>
  );
};

export default layout;
