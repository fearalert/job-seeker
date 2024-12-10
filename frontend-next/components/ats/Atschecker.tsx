'use client';

import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ATSChecker() {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [resume, setResume] = useState<string>('');
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const handleScoreCheck = async () => {
    setLoading(true);
    setScore(null);
    setRecommendations([]);

    try {
      const response = await fetch('/api/ats-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobDescription, resume }),
      });

      if (!response.ok) {
        throw new Error('Error calculating ATS score');
      }

      const data = await response.json();
      setScore(parseFloat(data.score));
      setRecommendations(data.recommendations || []);
    } catch (error) {
      setScore(null);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['Match', 'Mismatch'],
    datasets: [
      {
        data: score !== null ? [score, 100 - score] : [0, 100],
        backgroundColor: ['#4CAF50', '#F44336'],
        hoverBackgroundColor: ['#45A049', '#D32F2F'],
      },
    ],
  };

  return (
    <div className="w-full min-h-screen h-auto px-6 md:px-24 py-6 bg-white shadow-lg rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-primary">ATS Score Checker</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="mb-4">
          <Label className="block text-sm font-semibold mb-1">Job Description</Label>
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value.trim())}
            placeholder="Paste the job description here..."
            className="h-fit min-h-[400px] w-full"
          />
        </div>
        <div className="mb-4">
          <Label className="block text-sm font-semibold mb-1">Resume</Label>
          <Textarea
            value={resume}
            onChange={(e) => setResume(e.target.value.trim())}
            placeholder="Paste your resume here..."
            className="h-fit min-h-[400px] w-full"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={handleScoreCheck}
          disabled={loading}
          className="w-fit text-white"
          variant="primary"
        >
          {loading ? 'Checking...' : 'Check ATS Score'}
        </Button>
      </div>
      {score !== null && (
        <div className="mt-6 text-center">
          <div className="w-64 mx-auto">
            <Doughnut data={chartData} />
          </div>
          <h2 className="mt-4 text-lg font-bold">
            Your ATS Compatibility Score: <span className="text-green-600">{score}%</span>
          </h2>
        </div>
      )}
      {recommendations.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Recommendations</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-md p-4 border-l-4 border-primary"
              >
                <p className="text-zinc-700 text-sm">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
