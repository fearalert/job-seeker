/* eslint-disable no-self-assign */
/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        jobs: [],
        loading: false,
        error: null,
        message: null,
        singlejob: {},
        myjobs: [],
    },
    reducers: {
        getAllJobs(state, action){
        state.loading = true;
        state.error = null;
        },
        requestForAllJobs(state, action){
            state.loading = true;
            state.error = null;
        },
        successForAllJobs(state, action){
            state.loading = false;
            state.jobs = action.payload;
            state.error = null;
        },
        failureForAllJobs(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        clearAllError(state, action){
            state.error = null;
            state.jobs = state.jobs;
        },
        resetJobSlice(state, action){
            state.error = null;
            state.jobs = state.jobs;
            state.loading = false;
            state.myjobs = state.myjobs;
            state.message = null;
            state.singlejob = {};
        }
    },
});


export const fetchJobs = (city, niche, searchKeyword) => async(dispatch)=>{
    try{
        dispatch(jobSlice.actions.requestForAllJobs());
        let link = "http://localhost:4000/api/v1/job/searchalljobs?";
        let queryParams = [];

        if(searchKeyword){
            queryParams.push(`searchKeyword=${searchKeyword}`);
        }
        if(niche){
            queryParams.push(`niche=${niche}`);
        }
        if(city){
            queryParams.push(`city=${city}`);
        }

        link += queryParams.join("&");

        const response = await axios.get(link, {withCredentials: true});
        dispatch(jobSlice.actions.successForAllJobs({
            jobs: response.data.jobs,
            message: response.data.message
        }));
        dispatch(jobSlice.actions.clearAllError());

    } catch(error){
        dispatch(jobSlice.actions.failureForAllJobs({
            error: error.response.data.message,
        }));
}
}


export const clearAllJobsError = () => (dispatch) => {
    dispatch(jobSlice.actions.clearAllError());
}

export const resetJobSlice = () => (dispatch) => {
    dispatch(jobSlice.actions.resetJobSlice());
}

export default  jobSlice.reducer;