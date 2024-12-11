import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { motion } from 'framer-motion'

const Niches = () => {
    
  const topNiches = [
    {
      "id": 1,
      "role": "Software Development",
      "description": "Involves creating, testing, and maintaining software applications tailored to specific needs."
    },
    {
      "id": 2,
      "role": "Web Development",
      "description": "Focuses on building and maintaining websites and web applications, ensuring functionality and user experience."
    },
    {
      "id": 3,
      "role": "Cybersecurity",
      "description": "Protects systems, networks, and data from unauthorized access and cyber threats."
    },
    {
      "id": 4,
      "role": "Data Science",
      "description": "Extracts insights and knowledge from structured and unstructured data to support decision-making."
    },
    {
      "id": 5,
      "role": "Artificial Intelligence",
      "description": "Develops intelligent systems capable of performing tasks that typically require human intelligence."
    },
    {
      "id": 6,
      "role": "Cloud Computing",
      "description": "Manages and delivers computing services such as servers, storage, and databases over the internet."
    },
    {
      "id": 7,
      "role": "DevOps",
      "description": "Combines development and IT operations to enable continuous delivery and improve system reliability."
    },
    {
      "id": 8,
      "role": "Mobile App Development",
      "description": "Designs and develops applications for mobile devices, ensuring cross-platform compatibility."
    },
    {
      "id": 9,
      "role": "Blockchain",
      "description": "Works on decentralized ledger technologies to enable secure and transparent data sharing."
    },
    {
      "id": 10,
      "role": "Database Administration",
      "description": "Maintains and optimizes databases to ensure secure, efficient, and reliable data management."
    },
    {
      "id": 11,
      "role": "Network Administration",
      "description": "Manages and troubleshoots an organization’s network infrastructure to ensure connectivity."
    },
    {
      "id": 12,
      "role": "UI/UX Design",
      "description": "Focuses on creating visually appealing and user-friendly interfaces for digital products."
    },
    {
      "id": 13,
      "role": "Game Development",
      "description": "Designs, develops, and tests video games for various platforms and audiences."
    },
    {
      "id": 14,
      "role": "IoT (Internet of Things)",
      "description": "Develops and integrates connected devices to enable seamless communication and automation."
    },
    {
      "id": 15,
      "role": "Big Data",
      "description": "Processes and analyzes large datasets to uncover trends, patterns, and actionable insights."
    },
    {
      "id": 16,
      "role": "Machine Learning",
      "description": "Builds algorithms and models that enable computers to learn and make decisions autonomously."
    },
    {
      "id": 17,
      "role": "IT Project Management",
      "description": "Plans, organizes, and oversees IT projects to ensure timely delivery and alignment with objectives."
    },
    {
      "id": 18,
      "role": "IT Support and Helpdesk",
      "description": "Provides technical assistance and resolves IT-related issues for users and organizations."
    },
    {
      "id": 19,
      "role": "Systems Administration",
      "description": "Installs, configures, and maintains computer systems and servers to ensure optimal performance."
    },
    {
      "id": 20,
      "role": "IT Consulting",
      "description": "Advises organizations on best practices and strategies for leveraging IT to achieve business goals."
    },
    {
      "id": 21,
      "role": "Business Analyst",
      "description": "Analyzes business processes and systems to recommend improvements and technology solutions."
    }
  ];
  
      
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <motion.div
      id='niches'
      className='flex flex-col justify-center items-center text-center gap-4 md:gap-8 py-6 md:py-12 px-4 md:px-16 max-w-5xl mx-auto'
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 className='text-3xl md:text-4xl font-bold text-primary' variants={itemVariants}>
        Top Niches
      </motion.h2>
      <motion.div className='grid md:grid-cols-3 gap-4' variants={containerVariants}>
        {topNiches.map((niche) => (
          <motion.div key={niche.id} variants={itemVariants}>
            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card className='text-center h-[200px] border-sm rounded-md shadow-xs border-slate-100 bg-slate-50 hover:bg-slate-100 max-w-[350px] transition-all duration-300 ease-in-out'>
                <CardHeader className='font-bold text-xl text-primary py-0 pb-4'>
                  {niche.role}
                </CardHeader>
                <CardContent className='py-0'>
                  <p className='text-zinc-400 text-sm'>{niche.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Niches