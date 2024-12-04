import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/card';

const DashboardCards = ({ totalApplications, totalJobsPosted, totalNiches }: { totalApplications: number, totalJobsPosted: number, totalNiches: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className='text-6xl font-bold text-zinc-600'>{totalApplications}</CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Jobs Posted by Me</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className='text-6xl font-bold text-zinc-600'>{totalJobsPosted}</CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Niches</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className='text-6xl font-bold text-zinc-600'>{totalNiches}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
