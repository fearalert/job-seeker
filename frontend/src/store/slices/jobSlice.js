import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { hostname } from "../../hostname";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    message: null,
    singlejob: {},
    myjobs: [],
    searchTriggered: false,
  },
  reducers: {
    requestForAllJobs(state, action) {
      state.loading = true;
      state.error = null;
      state.searchTriggered = action.payload.isSearch;
    },
    successForAllJobs(state, action) {
      state.loading = true;
      state.jobs = action.payload.jobs;
      state.error = null;
      state.message = action.payload.message || null;
    },
    failureForAllJobs(state, action) {
      state.loading = true;
      state.error = action.payload.error;
    },
    requestForSingleJob(state) {
      state.loading = true;
      state.error = null;
    },
    successForSingleJob(state, action) {
      state.loading = false;
      state.singlejob = action.payload;
      state.error = null;
    },
    failureForSingleJob(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    clearAllError(state) {
      state.error = null;
    },
    resetJobSlice(state) {
      state.error = null;
      state.jobs = [];
      state.loading = false;
      state.myjobs = [];
      state.message = null;
      state.singlejob = {};
      state.searchTriggered = false;
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

export const fetchJobs = (filters) => async (dispatch) => {
  try {
    const { city, niche, searchKeyword, minSalary, maxSalary } = filters;
    const isSearch = !!(city || niche || searchKeyword || minSalary || maxSalary);
    dispatch(jobSlice.actions.requestForAllJobs({ isSearch }));

    let link = `${hostname}/api/v1/job/`;

    if (isSearch) {
      link += "searchalljobs?";
      const queryParams = [];

      if (searchKeyword) queryParams.push(`searchKeyword=${encodeURIComponent(searchKeyword)}`);
      if (niche) queryParams.push(`niche=${encodeURIComponent(niche)}`);
      if (city) queryParams.push(`city=${encodeURIComponent(city)}`);
      if (minSalary) queryParams.push(`minSalary=${encodeURIComponent(minSalary)}`);
      if (maxSalary) queryParams.push(`maxSalary=${encodeURIComponent(maxSalary)}`);

      link += queryParams.join("&");
    } else {
      link += "getalljobs";
    }

    const response = await axios.get(link, { withCredentials: true });
    dispatch(successForAllJobs({
      jobs: response.data.jobs,
      message: response.data.message,
    }));
  } catch (error) {
    dispatch(failureForAllJobs({
      error: error.response?.data?.message || "Failed to fetch jobs",
    }));
  }
};

export const fetchSingleJob = (jobId) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForSingleJob());
  try {
    const response = await axios.get(
      `${hostname}/api/v1/job/getsinglejob/${jobId}`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForSingleJob(response.data.job));
    dispatch(jobSlice.actions.clearAllError());
  } catch (error) {
    dispatch(jobSlice.actions.failureForSingleJob({
      error: error.response?.data?.message || "Failed to fetch single job",
    }));
  }
};

export const postJob = (data) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForPostJob());
  try {
    const response = await axios.post(
      `${hostname}/api/v1/job/post`,
      data,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(jobSlice.actions.successForPostJob(response.data.message));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForPostJob(error.response.data.message));
  }
};

export const getMyJobs = () => async (dispatch) => {
  dispatch(jobSlice.actions.requestForMyJobs());
  try {
    const response = await axios.get(
      `${hostname}/api/v1/job/getmyjobs`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForMyJobs(response.data.myJobs));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForMyJobs(error.response.data.message));
  }
};

export const deleteJob = (id) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForDeleteJob());
  try {
    const response = await axios.delete(
      `${hostname}/api/v1/job/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForDeleteJob(response.data.message));
    dispatch(clearAllJobErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForDeleteJob(error.response.data.message));
  }
};

export const clearAllJobErrors = () => (dispatch) => {
  dispatch(jobSlice.actions.clearAllError());
};

export const resetJobSlices = () => (dispatch) => {
  dispatch(jobSlice.actions.resetJobSlice());
};

export default jobSlice.reducer;
