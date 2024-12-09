import React from 'react'
import {
    Card,
    CardContent,
  } from "@/components/ui/card"
  

const Hero = () => {
  return (
    <div id="hero" className='flex flex-col justify-center items-center text-center gap-4 md:gap-8 py-6 md:py-12 px-4 md:px-16 md:pt-32'>
        <h2 className='text-3xl md:text-4xl font-bold text-primary'>Find the Best Job that Fits Your Career</h2>
        <h6 className='text-md font-medium text-zinc-500'>Connecting talents with opportunities for every skills level</h6>
        <Card className='hover:bg-zinc-800 bg-zinc-800'>
            <CardContent>
                <p>We encourage you to explore the diverse range of jobs available and find the perfect fit for your professional journey. 
                  Whether you are seeking your first job or looking to advance your career, JobScan is here to assist you every step of the way. Don’t hesitate to dive in and apply for the positions that resonate with your goals!</p>
            </CardContent>
        </Card>
    </div>
  )
}

export default Hero