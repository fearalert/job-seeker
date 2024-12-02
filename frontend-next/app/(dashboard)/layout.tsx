"use client";
import AppSidebar from '@/components/sidebar/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingView from '../loading';

const layout = ({ children }: { children: React.ReactNode }) => {

 
    const { isAuthenticated, error, loading, user } = useSelector((state: any) => state.user);

    console.log(isAuthenticated)

    useEffect(()=> {
      if(!isAuthenticated) {
        loading === true
        redirect("/");
      }
    }, [isAuthenticated, loading])

    if (loading) {
      return (
        <LoadingView />
      )
    }
  
  return (
    <>
      {
        isAuthenticated ? (
          <SidebarProvider>
                <div className="h-screen max-h-auto flex flex-col">
                <div className="flex-1 h-full w-screen px-4 py-4 flex items-start justify-start">
                  <AppSidebar user={user} />
                  <main className='w-full'>
                      {children}
                  </main>
                </div>
              </div>
          </SidebarProvider> 

        ) : 
        <LoadingView />
      }
   
    </>
  );
};

export default layout;
