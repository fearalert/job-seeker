import React from "react";
import DetailSingleJobCard from "@/components/jobs/singlejob/card";
import SimilarJobs from "@/components/jobs/singlejob/similarjobs";

const JobDetailsPage = () => {
  return (
    <div className="flex max-w-full mx-auto mt-6 space-x-1">
      {/* Left Section - Single Job Details */}
      <div className="flex-grow">
        <DetailSingleJobCard />
      </div>

      {/* Right Section - Similar Jobs */}
      <div className="w-1/3">
        <SimilarJobs />
      </div>
    </div>
  );
};

export default JobDetailsPage;
