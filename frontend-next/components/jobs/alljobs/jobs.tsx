/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { fetchJobs, clearAllError, Job } from '@/store/slices/job.slice';
import { AppDispatch, RootState } from '@/store/store';
import { Navbar } from '@/components/navbar/Navbar';
import { NICHES } from '@/constants';
import Filters from '@/components/jobs/filters';
import { checkJobValidity, formatDate } from '@/lib/utils';
import LoadingView from '@/app/loading';
import AuthHeader from '@/components/navbar/AuthenticatedHeader';
import { useDebounce } from '@/hooks/use-debounce';
import {
  MapPin,
  DollarSign,
  Clock,
  TypeIcon,
  Eye,
  AlertCircle,
} from 'lucide-react';

export default function JobsPage() {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 300000]);

  const debouncedSearch = useDebounce(searchKeyword, 300);
  const debouncedCity = useDebounce(selectedCity, 300);
  const debouncedNiche = useDebounce(selectedNiche, 300);
  const debouncedSalaryRange = useDebounce(salaryRange, 300);

  const { jobs, loading, error, searchTriggered } = useSelector(
    (state: RootState) => state.jobs
  );

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchJobs({}));
  }, [dispatch]);

  useEffect(() => {
    if (error) dispatch(clearAllError());
  }, [error, dispatch]);

  const cities = ['all', ...new Set(jobs.map((job: Job) => job.location))];
  const niches = ['all', ...new Set(NICHES)];

  useEffect(() => {
    dispatch(
      fetchJobs({
        city: debouncedCity === 'all' ? undefined : debouncedCity,
        niche: debouncedNiche === 'all' ? undefined : debouncedNiche,
        minSalary: debouncedSalaryRange[0],
        maxSalary: debouncedSalaryRange[1],
        searchKeyword: debouncedSearch,
      })
    );
  }, [
    debouncedSearch,
    debouncedCity,
    debouncedNiche,
    debouncedSalaryRange,
    dispatch,
  ]);

  const sortedJobs = [...jobs].sort(
    (a, b) =>
      new Date(b.jobPostedOn).getTime() - new Date(a.jobPostedOn).getTime()
  );

  const JobNotFound = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <AlertCircle className="text-red-400 w-24 h-24 mb-6 animate-pulse" />
      <h2 className="text-2xl font-bold text-zinc-500 mb-4">Jobs Not Found</h2>
      <Button
        onClick={() => window.location.reload()}
        variant="primary"
        className="px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
        Refresh Page
      </Button>
    </div>
  );

  const JobCard = ({ job }: { job: Job }) => {
    const { isExpired, daysLeft } = checkJobValidity(job.jobValidThrough);

    return (
      <motion.div
        whileHover={{ scale: 1.03, boxShadow: '0px 20px 40px rgba(0,0,0,0.1)' }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex flex-col gap-1 pb-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-primary text-lg font-bold">
              {job.jobTitle}
            </CardTitle>
            {isExpired ? (
              <span className="text-red-500 text-sm font-semibold">
                Expired
              </span>
            ) : (
              <span className="text-sm font-semibold text-green-500">
                🔥 {daysLeft} days left
              </span>
            )}
          </div>
          <p className="text-zinc-400 text-sm font-medium truncate">
            {job.organizationName}
          </p>
        </CardHeader>

        <CardContent className="pt-2 space-y-2">
          <div className="flex items-center text-zinc-500 space-x-2">
            <TypeIcon
              size={16}
              className="text-primary"
            />
            <span>{job.jobType}</span>
          </div>
          <div className="flex items-center text-zinc-500 space-x-2">
            <MapPin
              size={16}
              className="text-primary"
            />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-zinc-500 space-x-2">
            <Clock
              size={16}
              className="text-primary"
            />
            <span>{formatDate(job.jobValidThrough)}</span>
          </div>
          <div className="flex items-center text-zinc-500 space-x-2">
            <DollarSign
              size={16}
              className="text-primary"
            />
            <span>Rs. {job.salary.toLocaleString()}</span>
          </div>

          {!isExpired && (
            <div className="flex justify-end mt-4">
              <Link href={`/jobs/${job.id}`}>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-zinc-500 hover:bg-primary hover:text-white transition-all">
                  <Eye className="h-4 w-4" /> View Details
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </motion.div>
    );
  };

  return (
    <>
      {(!isAuthenticated || !user) && <Navbar />}
      {isAuthenticated && user && <AuthHeader title="Browse Jobs" />}
      <div className="flex flex-col md:flex-row gap-8 px-4 md:px-8 py-8 w-full h-full">
        <Filters
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedNiche={selectedNiche}
          setSelectedNiche={setSelectedNiche}
          salaryRange={salaryRange}
          setSalaryRange={setSalaryRange}
          cities={cities}
          niches={niches}
        />

        <section className="flex-1 flex flex-col gap-6">
          <Input
            placeholder="Search for Jobs"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full bg-zinc-100 dark:bg-gray-700 border-none rounded-xl px-4 py-2 text-gray-800 dark:text-gray-100 placeholder-gray-400"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center items-center h-64">
                <LoadingView />
              </div>
            ) : sortedJobs.length > 0 ? (
              sortedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                />
              ))
            ) : (
              <div className="col-span-full text-center">
                {searchTriggered ? <JobNotFound /> : 'Start searching for jobs'}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
