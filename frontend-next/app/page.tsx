"use client";
import Footer from "@/components/footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Niches from "@/components/home/Niches";
import { Navbar } from "@/components/navbar/Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, user, router]);

  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Niches />
      <Footer />
    </>
  );
}