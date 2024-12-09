import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { ROLES } from "@/constants";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const JobPostChart = () => {
  const { myJobs, loading: jobsLoading } = useSelector((state: RootState) => state.jobs);
  const { user, loading: userLoading } = useSelector((state: RootState) => state.user);

  const calculateMonthlyFrequency = (dates: string[]) => {
    const months = Array(12).fill(0);
    dates.forEach((date) => {
      const month = new Date(date).getMonth();
      months[month]++;
    });
    return months;
  };

  if (jobsLoading || userLoading) {
    return <div className="text-center text-lg font-semibold">Loading Data...</div>;
  }

  const dates = myJobs.map((job) => job.jobPostedOn);
  const frequency = calculateMonthlyFrequency(dates);

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Frequency",
        data: frequency,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {user?.role === ROLES.EMPLOYER && (
        <div className="mt-8 w-full">
          <h3 className="text-lg font-semibold text-primary mb-6">Jobs Frequency</h3>
          <div className="h-[300px]">
            <Bar data={chartData} />
          </div>
        </div>
      )}
    </>
  );
};

export default JobPostChart;
