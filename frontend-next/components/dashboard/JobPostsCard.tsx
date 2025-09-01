/** @format */

// components/dashboard/JobPostsCard.tsx
'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ROLES } from '@/constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface JobPostChartProps {
  selectedYear: number;
}

const JobPostChart = ({ selectedYear }: JobPostChartProps) => {
  const { myJobs, loading: jobsLoading } = useSelector(
    (state: RootState) => state.jobs
  );
  const { user, loading: userLoading } = useSelector(
    (state: RootState) => state.user
  );

  if (jobsLoading || userLoading)
    return <p className="text-center text-gray-500">Loading Chart...</p>;

  const filteredJobs = myJobs.filter(
    (job) => new Date(job.jobPostedOn).getFullYear() === selectedYear
  );
  const months = Array(12).fill(0);
  filteredJobs.forEach((job) => months[new Date(job.jobPostedOn).getMonth()]++);

  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Job Post Frequency',
        data: months,
        backgroundColor: 'rgba(79, 70, 229, 0.3)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      {user?.role === ROLES.EMPLOYER && (
        <div className="mt-8 w-full bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Jobs Frequency - {selectedYear}
          </h3>
          <div className="h-[300px]">
            <Bar
              data={data}
              options={{
                responsive: true,
                plugins: { legend: { display: true } },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default JobPostChart;
