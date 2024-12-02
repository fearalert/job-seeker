import Footer from "@/components/footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Niches from "@/components/home/Niches";
import { Navbar } from "@/components/navbar/Navbar";

export default function Home() {
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
