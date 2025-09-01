/** @format */

'use client';
import AppSidebar from '@/components/sidebar/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingView from '../loading';
import { AppDispatch, RootState } from '@/store/store';
import { fetchUser } from '@/store/slices/user.slice';
import { toast } from '@/hooks/use-toast';
import { ROLES } from '@/constants';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading, user } = useSelector(
    (state: RootState) => state.user
  );
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('userToken');

      if (token && !isAuthenticated) {
        try {
          await dispatch(fetchUser());
        } catch (error) {
          localStorage.removeItem('userToken');
          toast({
            title: 'Error',
            description: error?.toString(),
          });
        }
      }
      setInitialCheckComplete(true);
    };

    checkAuthentication();
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (initialCheckComplete && !isAuthenticated) {
      redirect('/');
      return;
    }

    // Basic RBAC: if authenticated but role is unexpected, redirect home
    if (initialCheckComplete && isAuthenticated && user) {
      const role = user.role;
      if (role !== ROLES.EMPLOYER && role !== ROLES.JOB_SEEKER) {
        // Unknown role - force logout/redirect
        localStorage.removeItem('userToken');
        redirect('/');
      }
    }
  }, [isAuthenticated, initialCheckComplete, user]);

  if (!initialCheckComplete || loading) {
    return <LoadingView />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex h-full items-start bg-background w-full">
        <AppSidebar />
        <main className="min-h-screen flex flex-col items-start justify-start w-full">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
