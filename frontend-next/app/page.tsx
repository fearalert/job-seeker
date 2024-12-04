"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Niches from "@/components/home/Niches";
import { Navbar } from "@/components/navbar/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, user, router]);

  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 justify-center items-center">
        <Hero />
        <Niches />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
