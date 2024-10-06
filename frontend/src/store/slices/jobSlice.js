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
      state.loading = false;
      state.jobs = action.payload.jobs;
      state.error = null;
      state.message = action.payload.message || null;
    },
    failureForAllJobs(state, action) {
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
  clearAllError,
  resetJobSlice,
} = jobSlice.actions;

export const fetchJobs = (filters) => async (dispatch) => {
  try {
    const { city, niche, searchKeyword, minSalary, maxSalary } = filters;
    const isSearch = !!(city || niche || searchKeyword || minSalary || maxSalary);
    dispatch(requestForAllJobs({ isSearch }));

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

export const clearAllJobsError = () => (dispatch) => {
  dispatch(clearAllError());
};

export const resetJobs = () => (dispatch) => {
  dispatch(resetJobSlice());
};

export default jobSlice.reducer;
