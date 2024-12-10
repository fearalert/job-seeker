import ATSChecker from '@/components/ats/Atschecker'
import Footer from '@/components/footer'
import { Navbar } from '@/components/navbar/Navbar'
import React from 'react'

const ATSCheckerPage = () => {
  return (
    <>
        <Navbar />
        <ATSChecker />
        {/* <Footer /> */}
    </>
  )
}

export default ATSCheckerPage