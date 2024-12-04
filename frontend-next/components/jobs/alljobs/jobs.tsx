"use client";

import { useState, useEffect, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { fetchJobs, clearAllError, Job } from "@/store/slices/job.slice";
import { AppDispatch, RootState } from "@/store/store";
import { Navbar } from "@/components/navbar/Navbar";
import { NICHES } from "@/constants";

import { MapPin, DollarSign, Clock, TypeIcon, Eye } from "lucide-react";
import Filters from "@/components/jobs/filters";
import { formatDate } from "@/lib/utils";
import LoadingView from "@/app/loading";

export default function JobsPage() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedNiche, setSelectedNiche] = useState<string>("all");
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 300000]);

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
    if (error) {
      dispatch(clearAllError());
    }
  }, [error, dispatch]);

  const cities = ["all", ...new Set(jobs.map((job: Job) => job.location))];
  const niches = ["all", ...new Set(NICHES)];

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      fetchJobs({
        searchKeyword: searchKeyword.trim(),
        city: selectedCity === "all" ? undefined : selectedCity,
        niche: selectedNiche === "all" ? undefined : selectedNiche,
        minSalary: salaryRange[0],
        maxSalary: salaryRange[1],
      })
    );
  };

  const JobCard = ({ job }: { job: Job }) => (
    <Card
      key={job.id}
      className="bg-background shadow-xs rounded-lg hover:shadow-md hover:bg-background transition-all duration-300"
    >
      <CardHeader className="mb-0 pb-0 flex flex-col">
        <CardTitle className="text-primary text-xl mb-0 pb-0">{job.jobTitle}</CardTitle>
        <p className="text-ellipsis font-semibold max-w-60 text-zinc-400">{job.organizationName}</p>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-1">
        <div className="flex items-center text-zinc-500 space-x-2">
            <TypeIcon size={16} className="text-primary" />
            <span>{job.jobType}</span>
          </div>

          <div className="flex items-center text-zinc-500 space-x-2">
            <MapPin size={16} className="text-primary" />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center text-zinc-500 space-x-2">
            <Clock size={16} className="text-primary" />
            <span>{formatDate(job.jobValidThrough)}</span>
          </div>

          <div className="flex items-center text-zinc-500 space-x-2">
            <DollarSign size={16} className="text-primary" />
            <span>Rs. {job.salary.toLocaleString()}</span>
          </div>

          <div className="flex justify-end items-center mt-4">
            <Link href={`/jobs/${job.id}`}>
              <Button variant="outline"
                  className='text-zinc-500'
              >
                  <Eye className="mr-2 h-4 w-4" /> View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {(!isAuthenticated && !user)&& <Navbar />}
      {(isAuthenticated && user) && <h1 className="text-primary font-bold text-4xl px-4 py-4">View Jobs</h1>}
      <div className={`flex flex-col md:flex-row px-4 py-8 ${isAuthenticated ? "md:px-4 md:flex-row-reverse" : "md:px-24"} w-full gap-8`}>
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

        <section className="flex flex-col w-full">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Search for Jobs"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full bg-zinc-100 border-none rounded-lg"
              />
              <Button variant="primary" type="submit">
                Find Job
              </Button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center items-center h-64">
              <LoadingView />
              </div>
            ) : jobs.length > 0 ? (
              jobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <div className="col-span-full text-center text-zinc-500">
                {searchTriggered ? "No Jobs Found" : "Start searching for jobs"}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}