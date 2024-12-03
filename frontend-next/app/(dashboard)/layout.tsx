"use client";
import AppSidebar from '@/components/sidebar/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import LoadingView from '../loading';
import { AppDispatch, RootState } from '@/store/store';
import { fetchUser } from '@/store/slices/user.slice';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading, user, error } = useSelector((state: RootState) => state.user);
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("userToken");
      
      if (token && !isAuthenticated) {
        try {
          await dispatch(fetchUser());
        } catch (error) {
          localStorage.removeItem("userToken");
        }
      }
      
      setInitialCheckComplete(true);
    };

    checkAuthentication();
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (initialCheckComplete && !isAuthenticated) {
      redirect("/");
    }
  }, [isAuthenticated, initialCheckComplete]);

  if (!initialCheckComplete || loading) {
    return <LoadingView />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main className="flex-grow">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;