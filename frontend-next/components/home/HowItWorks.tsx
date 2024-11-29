import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BotIcon,
  CircleUserRoundIcon,
  CompassIcon,
  HandshakeIcon,
  PersonStandingIcon,
} from "lucide-react";
import Image from "next/image";

const HowItWorks = () => {
  return (
    <div id="how-it-works" className="py-16 bg-background max-w-6xl">
      <div className="text-center px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">How It Works</h2>
        <p className="mt-4 text-sm text-gray-600">
          Discover your next career opportunity in one of our top trending cities. Explore job markets in 
          top niches of Nepal, each offering unique benefits. Find where your next job could take you.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-12 mt-12 px-6 md:px-16">
        <Image src="/image.png" width={400} height={400} alt={"image"} className="bg-transparent object-contain rounded-3xl"/>
        <div className="flex flex-col items-start justify-end text-start gap-4">
            <div className="flex flex-row gap-4 items-start justify-start text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-md flex justify-center items-center">
                    <CircleUserRoundIcon className="text-white w-8 h-8" />
                </div>
                <div className="flex flex-col items-start justify-start">
                    <h3 className="mt-4 font-bold text-sm">Create your profile</h3>
                    <p className="mt-2 text-gray-600 text-xs text-start">
                        Save time by filling out your application information once, allowing you to apply for thousands of opportunities.
                    </p>
                </div>
            </div>
            <div className="flex flex-row gap-4 items-start justify-start text-center">
                {/* Step 2 */}
                <div className="w-16 h-16 bg-blue-500 rounded-md flex justify-center items-center">
                    <CompassIcon className="text-white w-8 h-8" />
                </div>
                <div className="flex flex-col items-start justify-start">
                    <h3 className="mt-4 font-bold text-sm">Search jobs and compare pay packages</h3>
                    <p className="mt-2 text-gray-600 text-xs text-start">
                    Search and compare jobs based on location, specialty, pay rate, and healthcare systems to find the best fit.
                    </p>
                </div>
                </div>

                <div className="flex flex-row gap-4 items-start justify-start text-center">
                {/* Step 3 */}
                <div className="w-16 h-16 bg-green-500 rounded-md flex justify-center items-center">
                    <HandshakeIcon className="text-white w-8 h-8" />
                </div>
                <div className="flex flex-col items-start justify-start">
                    <h3 className="mt-4 font-bold text-sm">Find your next assignment</h3>
                    <p className="mt-2 text-gray-600 text-xs text-start">
                    Secure your dream job and embark on a fulfilling career journey in top locations.
                    </p>
                </div>
                </div>
            </div>
      </div>
    </div>
  );
};

export default HowItWorks;
