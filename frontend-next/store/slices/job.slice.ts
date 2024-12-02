import { HOSTNAME } from "@/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";

export interface Job {
  id: string; // Matches _id in the API response
  jobTitle: string; // Matches jobTitle in the API response
  jobType: string; // Matches jobType in the API response
  organizationType: string; // Matches organizationType in the API response
  location: string; // Matches location in the API response
  jobIntroduction: string; // Matches jobIntroduction in the API response
  jobResponsibilities: string[]; // Matches jobResponsibilities in the API response
  salary: number; // Matches salary in the API response, assuming it will be converted from string to number
  jobPostedOn: string; // Matches jobPostedOn in the API response
  jobValidThrough: string; // Matches jobValidThrough in the API response
  jobBenefits: string[]; // Matches jobBenefits in the API response
  jobQualifications: string[]; // Matches jobQualifications in the API response
  hiringMultipleCandidates: boolean; // Matches hiringMultipleCandidates in the API response
  jobNiche: string; // Matches jobNiche in the API response
  newsLettersSent: boolean; // Matches newsLettersSent in the API response
  howToApply: string; // Matches howToApply in the API response
  postedBy: string; // Matches postedBy in the API response
  personalWebsite?: {
    title: string;
    url: string;
  }; // Matches personalWebsite in the API response
}

interface JobsState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  message: string | null;
  singleJob: Job | null;
  myJobs: Job[];
  searchTriggered: boolean;
}

interface FetchJobsFilters {
  city?: string;
  niche?: string;
  searchKeyword?: string;
  minSalary?: number;
  maxSalary?: number;
}

const initialState: JobsState = {
  jobs: [],
  loading: false,
  error: null,
  message: null,
  singleJob: null,
  myJobs: [],
  searchTriggered: false,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    requestForAllJobs(state, action: PayloadAction<{ isSearch: boolean }>) {
      state.loading = true;
      state.error = null;
      state.searchTriggered = action.payload.isSearch;
    },
    successForAllJobs(state, action: PayloadAction<{ jobs: Job[]; message?: string }>) {
      state.loading = false;
      state.jobs = action.payload.jobs;
      state.error = null;
      state.message = action.payload.message || null;
    },
    failureForAllJobs(state, action: PayloadAction<{ error: string }>) {
      state.loading = false;
      state.error = action.payload.error;
    },
    requestForSingleJob(state) {
      state.loading = true;
      state.error = null;
    },
    successForSingleJob(state, action: PayloadAction<Job>) {
      state.loading = false;
      state.singleJob = action.payload;
      state.error = null;
    },
    failureForSingleJob(state, action: PayloadAction<{ error: string }>) {
      state.loading = false;
      state.error = action.payload.error;
    },
    clearAllError(state) {
      state.error = null;
    },
    resetJobSlice(state) {
      return { ...initialState };
    },
  },
});

export const {
  requestForAllJobs,
  successForAllJobs,
  failureForAllJobs,
  requestForSingleJob,
  successForSingleJob,
  failureForSingleJob,
  clearAllError,
  resetJobSlice,
} = jobSlice.actions;

export const fetchJobs = (filters: FetchJobsFilters) => async (dispatch: AppDispatch) => {
  try {
    const { city, niche, searchKeyword, minSalary, maxSalary } = filters;
    const isSearch = !!(city || niche || searchKeyword || minSalary || maxSalary);
    dispatch(requestForAllJobs({ isSearch }));

    let link = `${HOSTNAME}/api/v1/job/`;

    if (isSearch) {
      link += "searchalljobs?";
      const queryParams: string[] = [];

      if (searchKeyword) queryParams.push(`searchKeyword=${encodeURIComponent(searchKeyword)}`);
      if (niche) queryParams.push(`niche=${encodeURIComponent(niche)}`);
      if (city) queryParams.push(`city=${encodeURIComponent(city)}`);
      if (minSalary) queryParams.push(`minSalary=${encodeURIComponent(minSalary.toString())}`);
      if (maxSalary) queryParams.push(`maxSalary=${encodeURIComponent(maxSalary.toString())}`);

      link += queryParams.join("&");
    } else {
      link += "getalljobs";
    }

    const response = await axios.get(link, { withCredentials: true });
    // Ensure we map _id to id
    const jobs = response.data.jobs.map((job: any) => ({
      id: job._id,
      jobTitle: job.jobTitle,
      jobType: job.jobType,
      organizationType: job.organizationType,
      location: job.location,
      jobIntroduction: job.jobIntroduction,
      jobResponsibilities: job.jobResponsibilities,
      salary: Number(job.salary),
      jobPostedOn: job.jobPostedOn,
      jobValidThrough: job.jobValidThrough,
      jobBenefits: job.jobBenefits,
      jobQualifications: job.jobQualifications,
      hiringMultipleCandidates: job.hiringMultipleCandidates,
      jobNiche: job.jobNiche,
      newsLettersSent: job.newsLettersSent,
      howToApply: job.howToApply,
      postedBy: job.postedBy,
      personalWebsite: job.personalWebsite,
    }));
    dispatch(successForAllJobs({ jobs, message: response.data.message }));
  } catch (error: any) {
    dispatch(failureForAllJobs({ error: error.response?.data?.message || "Failed to fetch jobs" }));
  }
};

export const fetchSingleJob = (jobId: string) => async (dispatch: AppDispatch) => {
  dispatch(requestForSingleJob());
  try {
    const response = await axios.get(`${HOSTNAME}/api/v1/job/getsinglejob/${jobId}`, { withCredentials: true });
    dispatch(successForSingleJob(response.data.job));
  } catch (error: any) {
    dispatch(failureForSingleJob({ error: error.response?.data?.message || "Failed to fetch single job" }));
  }
};

export const clearAllJobErrors = () => (dispatch: AppDispatch) => {
  dispatch(clearAllError());
};

export const resetJobSlices = () => (dispatch: AppDispatch) => {
  dispatch(resetJobSlice());
};

export default jobSlice.reducer;
