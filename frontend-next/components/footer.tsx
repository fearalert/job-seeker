import Link from 'next/link'
import React from 'react'
import { Separator } from './ui/separator'

const Footer = () => {
  const homeLinks = [
    {
      id: 1,
      label: "Home",
      link: "/",
    },
    {
      id: 2,
      label: "Niches",
      link: "#niches",
    },
    {
      id: 3,
      label: "How does it work?",
      link: "#how-it-works",
    },
  ];

  const employerLinks = [
    {
      id: 1,
      label: "Login",
      link: "/auth/employer/login",
    },
    {
      id: 2,
      label: "Register",
      link: "/auth/employer/register",
    },
    // {
    //   id: 3,
    //   label: "Post New Job",
    //   link: "/dashboard",
    // },
  ];

  const candidateLinks = [
    {
      id: 1,
      label: "Login",
      link: "/auth/candidate/login",
    },
    {
      id: 2,
      label: "Register",
      link: "/auth/candidate/register",
    },
    {
      id: 3,
      label: "Browse Jobs",
      link: "/jobs",
    },
    {
      id: 4,
      label: "ATS Checker",
      link: "/ats-checker",
    },
  ]
  return (
    <footer className="flex flex-col px-12 bg-zinc-900">
      <div className='flex flex-col mt-4 md:mt-0 md:flex-row justify-between items-center'>
        <h3 className='text-primary bg-white p-2 rounded-md font-bold text-2xl'>Job Baba</h3>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 md:space-x-10 py-12 items-start justify-center">
          <div className='flex flex-col'>
              <h3 className='text-white font-bold'>Home</h3>
              <ul className='text-zinc-300 text-sm flex flex-col items-start justify-start gap-2 py-4'>
                {
                  homeLinks.map((link) => {
                    return(
                      <li key={link.id} className='text-zinc-400'>
                        <Link href={link.link}>
                          {link.label}
                        </Link>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
            <div className='flex flex-col'>
              <h3 className='text-white font-bold'>For Employers</h3>
              <ul className='text-zinc-300 text-sm flex flex-col items-start justify-start gap-2 py-4'>
                {
                  employerLinks.map((link) => {
                    return(
                      <li key={link.id} className='text-zinc-400'>
                        <Link href={link.link}>
                          {link.label}
                        </Link>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
            <div className='flex flex-col'>
              <h3 className='text-white font-bold'>For Job Seekers</h3>
              <ul className='text-zinc-300 text-sm flex flex-col items-start justify-start gap-2 py-4'>
                {
                  candidateLinks.map((link) => {
                    return(
                      <li key={link.id} className='text-zinc-400'>
                        <Link href={link.link}>
                          {link.label}
                        </Link>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
        </div>
      </div>
      <Separator className='w-full bg-zinc-500'/>
      <div className='flex flex-col items-center justify-center py-4'>
        <span className='text-zinc-300 font-bold'>All Rights Reserved</span>
        <span className='text-zinc-500 font-medium text-xs'>&copy; Rohan Dhakal 2024</span>
      </div>
      </footer>
  )
}

export default Footer