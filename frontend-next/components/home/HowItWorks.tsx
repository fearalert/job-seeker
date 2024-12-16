'use client'

import React from "react";
import { CircleUserRoundIcon, CompassIcon, HandshakeIcon } from 'lucide-react';
import Image from "next/image";
import { motion } from "framer-motion";
import { useTypingEffect } from "@/hooks/use-typing-effect";

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const typedText = useTypingEffect("How It Works", 50);

  return (
    <motion.div
      id="how-it-works"
      className="py-16 bg-background max-w-7xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="text-center px-6 md:px-16" variants={itemVariants}>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{typedText}</h2>
        <p className="text-sm text-zinc-500 mt-4">
          Discover your next career opportunity in one of our top trending cities. Explore job markets in 
          top niches of Nepal, each offering unique benefits. Find where your next job could take you.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-24 mt-12 px-6 md:px-16">
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image 
            src="/image.png" 
            width={400} 
            height={400} 
            alt="image" 
            className="object-contain rounded-full bg-background bg-blend-overlay"
          />
        </motion.div>
        <motion.div className="flex flex-col items-start justify-end text-start gap-12" variants={containerVariants}>
          {[
            {
              icon: <CircleUserRoundIcon className="text-white w-8 h-8" />,
              title: "Create your profile",
              description: "Save time by filling out your application information once, allowing you to apply for thousands of opportunities.",
              color: "bg-yellow-500"
            },
            {
              icon: <CompassIcon className="text-white w-8 h-8" />,
              title: "Search jobs and compare pay packages",
              description: "Search and compare jobs based on location, specialty, pay rate, and healthcare systems to find the best fit.",
              color: "bg-blue-500"
            },
            {
              icon: <HandshakeIcon className="text-white w-8 h-8" />,
              title: "Find your next assignment",
              description: "Secure your dream job and embark on a fulfilling career journey in top locations.",
              color: "bg-green-500"
            }
          ].map((step, index) => (
            <motion.div key={index} className="flex flex-row gap-4 items-center justify-center text-center" variants={itemVariants}>
              <motion.div
                className={`min-w-16 min-h-16 ${step.color} rounded-md flex justify-center items-center text-center`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {step.icon}
              </motion.div>
              <div className="flex flex-col items-start justify-center">
                <h3 className="font-bold text-sm">{step.title}</h3>
                <p className="mt-2 text-gray-600 text-xs text-start">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HowItWorks;
