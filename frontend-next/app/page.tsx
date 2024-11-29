import Footer from "@/components/footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Niches from "@/components/home/Niches";
import { NavigationMenuDemo } from "@/components/navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <NavigationMenuDemo />
      <main className="flex flex-col gap-8 row-start-2 justify-center items-center">
        <Hero />
        <Niches />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
