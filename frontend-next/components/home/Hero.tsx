'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useTypingEffect } from '@/hooks/use-typing-effect'
import { useRouter } from 'next/navigation'

const Hero = () => {
  const typedText = useTypingEffect("Find the Best Job that Fits Your Career", 50);
  const router = useRouter();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="hero" 
      className='flex flex-col justify-center items-center text-center gap-6 md:gap-10 py-12 md:py-24 px-4 md:px-16 md:pt-32 max-w-5xl mx-auto'
    >
      <h1 className='text-3xl md:text-5xl font-bold text-primary'>
        {typedText}
      </h1>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className='text-xl md:text-2xl font-medium text-muted-foreground'
      >
        Connecting talents with opportunities for every skill level
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className='w-full max-w-3xl'
      >
        <Card className='bg-primary/70 text-primary-foreground hover:bg-primary/90 transition-colors duration-300 cursor-pointer'>
          <CardContent className='p-6 md:p-8'>
            <p className='text-lg md:text-xl'>
              We encourage you to explore the diverse range of jobs available and find the perfect fit for your professional journey. 
              Whether you're seeking your first job or looking to advance your career, JobScan is here to assist you every step of the way.
            </p>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Button size="lg" className="group bg-accent hover:bg-accent/90" onClick={() => router.push("/jobs")}>
          Explore Jobs
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default Hero

