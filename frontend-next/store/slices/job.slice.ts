import { HOSTNAME } from "@/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";
import { User } from "./user.slice";

export interface Job {
  id: string; // Matches _id in the API response
  jobTitle: string; // Matches jobTitle in the API response
  jobType: string; // Matches jobType in the API response
  organizationType: string; // Matches organizationType in the API response
  organizationName: string;
  location: string; // Matches location in the API response
  jobIntroduction: string; // Matches jobIntroduction in the API response
  jobResponsibilities: string[]; // Matches jobResponsibilities in the API response
  salary: string; // Matches salary in the API response, assuming it will be converted from string to number
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
  totalNiches: number;
  totalJobsPosted: number;
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
  totalNiches: 0,
  totalJobsPosted: 0,
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
    requestForMyJobs(state) {
      state.loading = true;
      state.error = null;
    },
    successForMyJobs(state, action: PayloadAction<Job[]>) {
      state.loading = false;
      state.myJobs = action.payload;
      state.error = null;
    },
    failureForMyJobs(state, action: PayloadAction<{ error: string }>) {
      state.loading = false;
      state.error = action.payload.error;
    },
    requestForPostJob(state) {
      state.loading = true;
      state.error = null;
    },
    successForPostJob(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    successForTotalJobs(state, action: PayloadAction<number>) {
      state.loading = false;
      state.totalJobsPosted = action.payload;
    },

    successForNiches(state, action: PayloadAction<number>) {
      state.loading = false;
      state.totalNiches = action.payload;
    },
    failureForPostJob(state, action: PayloadAction<{ error: string }>) {
      state.loading = false;
      state.error = action.payload.error;
    },
    requestForDeleteJob(state) {
      state.loading = true;
      state.error = null;
    },
    successForDeleteJob(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    failureForDeleteJob(state, action: PayloadAction<{ error: string }>) {
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
  successForMyJobs,
  failureForMyJobs,
  requestForMyJobs,
  requestForDeleteJob,
  requestForPostJob,
  successForDeleteJob,
  successForPostJob,
  failureForDeleteJob,
  failureForPostJob,
  successForNiches,
  successForTotalJobs
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
      organizationName: job.organizationName,
      location: job.location,
      jobIntroduction: job.jobIntroduction,
      jobResponsibilities: job.jobResponsibilities,
      salary: job.salary,
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
    const job = {
      id: response.data.job._id,
      jobTitle: response.data.job.jobTitle,
      jobType: response.data.job.jobType,
      organizationType: response.data.job.organizationType,
      organizationName: response.data.job.organizationName,
      location: response.data.job.location,
      jobIntroduction: response.data.job.jobIntroduction,
      jobResponsibilities: response.data.job.jobResponsibilities,
      salary: response.data.job.salary,
      jobPostedOn: response.data.job.jobPostedOn,
      jobValidThrough: response.data.job.jobValidThrough,
      jobBenefits: response.data.job.jobBenefits,
      jobQualifications: response.data.job.jobQualifications,
      hiringMultipleCandidates: response.data.job.hiringMultipleCandidates,
      jobNiche: response.data.job.jobNiche,
      newsLettersSent: response.data.job.newsLettersSent,
      howToApply: response.data.job.howToApply,
      postedBy: response.data.job.postedBy,
      personalWebsite: response.data.job.personalWebsite,
    };
    dispatch(successForSingleJob(job));
  } catch (error: any) {
    dispatch(failureForSingleJob({ error: error.response?.data?.message || "Failed to fetch single job" }));
  }
};

export const fetchMyJobs = () => async (dispatch: AppDispatch) => {
  dispatch(requestForMyJobs());
  try {
    const response = await axios.get(`${HOSTNAME}/api/v1/job/getmyjobs`, { withCredentials: true });

    const myJobs = response.data.jobs.map((job: any) => ({
      id: job._id,
      jobTitle: job.jobTitle,
      jobType: job.jobType,
      organizationType: job.organizationType,
      organizationName: job.organizationName,
      location: job.location,
      jobIntroduction: job.jobIntroduction,
      jobResponsibilities: job.jobResponsibilities,
      salary: job.salary,
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
    dispatch(successForMyJobs(myJobs));
  } catch (error: any) {
    dispatch(failureForMyJobs({ error: error.response?.data?.message || "Failed to fetch jobs" }));
  }
};

export const fetchTotalJobsPosted = () => async (dispatch: AppDispatch) => {
  dispatch(requestForMyJobs());
  try {
    const response = await axios.get(`${HOSTNAME}/api/v1/job/getmyjobs`, {
      withCredentials: true,
    });
    const totalJobs = response.data.jobs.length;
    dispatch(successForTotalJobs(totalJobs));
  } catch (error: any) {
    dispatch(
      failureForMyJobs({
        error: error.response?.data?.message || "Failed to fetch total jobs posted",
      })
    );
  }
};


export const fetchTotalNiches = () => async (dispatch: AppDispatch) => {
  dispatch(requestForMyJobs());
  try {
    const response = await axios.get(`${HOSTNAME}/api/v1/job/getmyjobs`, {
      withCredentials: true,
    });
    const niches = new Set(response.data.jobs.map((job: any) => job.jobNiche));
    const totalNiches = niches.size;
    dispatch(successForNiches(totalNiches));
  } catch (error: any) {
    dispatch(
      failureForMyJobs({
        error: error.response?.data?.message || "Failed to fetch total niches",
      })
    );
  }
};


export const postJob = (jobData: Omit<Job, 'id' | 'jobPostedOn' | 'organizationName' | 'postedBy'>) => 
  async (dispatch: AppDispatch, getState: () => { user: { user: User | null } }) => {
    dispatch(requestForPostJob());
    try {
      const state = getState();
      const user = state.user.user;

      if (!user) {
        throw new Error("User not authenticated");
      }

      const completeJobData: Job = {
        ...jobData,
        id: '',
        jobPostedOn: new Date().toISOString(),
        organizationName: user.name || 'Unknown Organization',
        postedBy: user._id || '',
      };

      const response = await axios.post(
        `${HOSTNAME}/api/v1/job/postjob`,
        completeJobData,
        { 
          withCredentials: true, 
          headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('userToken')}`
           } 
        }
      );
      
      dispatch(successForPostJob(response.data.message));
      
      // Optionally, refresh my jobs after posting
      dispatch(fetchMyJobs());
    } catch (error: any) {
      dispatch(failureForPostJob({ 
        error: error.response?.data?.message || "Failed to post job" 
      }));
    }
  };


export const deleteJob = (jobId: string) => 
  async (dispatch: AppDispatch, getState: () => { user: { user: User | null } }) => {
    dispatch(requestForDeleteJob());
    try {
      const state = getState();
      const user = state.user.user;

      if (!user) {
        throw new Error("User not authenticated");
      }

      const response = await axios.delete(`${HOSTNAME}/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      });

      dispatch(successForDeleteJob(response.data.message));
      
      // Refresh my jobs after deletion
      dispatch(fetchMyJobs());
    } catch (error: any) {
      dispatch(failureForDeleteJob({ 
        error: error.response?.data?.message || "Failed to delete job" 
      }));
    }
  };

export const clearAllJobErrors = () => (dispatch: AppDispatch) => {
  dispatch(clearAllError());
};

export const resetJobSlices = () => (dispatch: AppDispatch) => {
  dispatch(resetJobSlice());
};

export default jobSlice.reducer;
