import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'

const Niches = () => {
    
   const topNiches= [
        {
          "id": 1,
          "role": "Java Developer",
          "description": "Responsible for developing and maintaining Java-based applications, ensuring high performance and scalability."
        },
        {
          "id": 2,
          "role": "Sales Manager",
          "description": "Leads a sales team, develops strategies to meet sales targets, and fosters client relationships."
        },
        {
          "id": 3,
          "role": "UI/UX Designer",
          "description": "Designs intuitive user interfaces and ensures a seamless user experience across digital platforms."
        },
        {
          "id": 4,
          "role": "Data Analyst",
          "description": "Analyzes large datasets to identify trends, generate insights, and support data-driven decision-making."
        },
        {
          "id": 5,
          "role": "Marketing Coordinator",
          "description": "Coordinates marketing campaigns, manages social media channels, and assists in promotional activities."
        },
        {
          "id": 6,
          "role": "Project Manager",
          "description": "Oversees project development from inception to completion, ensuring timelines and goals are met."
        },
        {
          "id": 7,
          "role": "Software Engineer",
          "description": "Designs, develops, tests, and maintains software solutions using modern programming languages."
        },
        {
          "id": 8,
          "role": "Customer Support Specialist",
          "description": "Provides technical and non-technical support to customers, ensuring their issues are resolved promptly."
        },
        {
          "id": 9,
          "role": "DevOps Engineer",
          "description": "Collaborates with development and operations teams to automate and optimize infrastructure, ensuring continuous integration and delivery."
        },
        {
          "id": 10,
          "role": "Data Scientist",
          "description": "Uses machine learning algorithms and statistical methods to analyze complex data sets and develop predictive models."
        },
        {
          "id": 11,
          "role": "Cybersecurity Specialist",
          "description": "Protects an organization’s networks, systems, and data from security threats by implementing security protocols and monitoring for vulnerabilities."
        },
        {
          "id": 12,
          "role": "Content Strategist",
          "description": "Develops content strategies for websites, blogs, and social media platforms to drive engagement and align with business objectives."
        },
        {
          "id": 13,
          "role": "SEO Specialist",
          "description": "Optimizes website content to improve search engine rankings and drive organic traffic to the site."
        },
        {
          "id": 14,
          "role": "Cloud Architect",
          "description": "Designs and manages cloud computing systems and infrastructure, ensuring scalability, performance, and security."
        },
        {
          "id": 15,
          "role": "Full-Stack Developer",
          "description": "Develops both front-end and back-end components of web applications, ensuring seamless integration and performance."
        }
      ]
      
  return (
    <div id='niches' className='flex flex-col justify-center items-center text-center gap-4 md:gap-8 py-6 md:py-12 px-4 md:px-16 max-w-5xl'>
        <h2 className='text-3xl md:text-4xl font-bold text-primary'>Top Niches</h2>
        <div className='grid md:grid-cols-3 gap-4'>
        {
        topNiches.map((niche) => {
                return (
                    <Card key={niche.id} className='text-center bg-background border border-zinc-50 hover:bg-slate-50 max-w-[350px]'>
                        <CardHeader className='font-bold text-xl text-primary py-0 pb-4'>
                            {niche.role}
                        </CardHeader>
                        <CardContent className='py-0'>
                            <p className='text-zinc-400 text-xs'>{niche.description}</p>
                        </CardContent>
                    </Card>
                );
            })
        }
        </div>
    </div>
  )
}

export default Niches