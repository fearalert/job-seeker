import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";
import { HOSTNAME } from "@/constants";

export interface Resume {
  public_id: string;
  url: string;
}

interface JobSeekerInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  resume: Resume;
  coverLetter: string;
  role: "Job Seeker";
}

interface EmployerInfo {
  id: string;
  role: "Employer";
  name: string;
  validThrough: string;
}

interface JobInfo {
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  jobNiche: string;
  jobQualifications: string;
  jobResponsibilities: string;
  salary: number;
}

export interface Application {
  _id: string;
  jobSeekerInfo: JobSeekerInfo;
  employerInfo: EmployerInfo;
  jobInfo: JobInfo;
  deletedBy: {
    jobSeeker: boolean;
    employer: boolean;
  };
}

interface ApplicationState {
  applications: Application[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: ApplicationState = {
  applications: [],
  loading: false,
  error: null,
  message: null,
};

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    requestForAllApplications(state) {
      state.loading = true;
      state.error = null;
    },
    successForAllApplications(state, action: PayloadAction<Application[]>) {
      state.loading = false;
      state.error = null;
      state.applications = action.payload;
    },
    failureForAllApplications(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForPostApplication(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForPostApplication(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForPostApplication(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    requestForDeleteApplication(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForDeleteApplication(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForDeleteApplication(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    },
    resetApplicationSlice(state) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
  },
});

export const fetchEmployerApplications = () => async (dispatch: AppDispatch) => {
  dispatch(applicationSlice.actions.requestForAllApplications());
  try {
    const response = await axios.get(
      `${HOSTNAME}/api/v1/application/employer/applications`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      applicationSlice.actions.successForAllApplications(
        response.data.applications
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error: any) {
    dispatch(
      applicationSlice.actions.failureForAllApplications(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const fetchJobSeekerApplications = () => async (dispatch: AppDispatch) => {
  dispatch(applicationSlice.actions.requestForAllApplications());
  try {
    const response = await axios.get(
      `${HOSTNAME}/api/v1/application/jobseeker/applications`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      applicationSlice.actions.successForAllApplications(
        response.data.applications
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error: any) {
    dispatch(
      applicationSlice.actions.failureForAllApplications(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const postApplication = (data: FormData, jobId: string) => async (dispatch: AppDispatch) => {
  dispatch(applicationSlice.actions.requestForPostApplication());
  try {
    const response = await axios.post(
      `${HOSTNAME}/api/v1/application/post/${jobId}`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(
      applicationSlice.actions.successForPostApplication(response.data.message)
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error: any) {
    dispatch(
      applicationSlice.actions.failureForPostApplication(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const deleteApplication = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(applicationSlice.actions.requestForDeleteApplication());
  try {
    const response = await axios.delete(
      `${HOSTNAME}/api/v1/application/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(
      applicationSlice.actions.successForDeleteApplication(
        response.data.message
      )
    );
    dispatch(clearAllApplicationErrors());
  } catch (error: any) {
    dispatch(
      applicationSlice.actions.failureForDeleteApplication(
        error.response?.data?.message || "An error occurred"
      )
    );
  }
};

export const clearAllApplicationErrors = () => (dispatch: AppDispatch) => {
  dispatch(applicationSlice.actions.clearAllErrors());
};

export const resetApplicationSlice = () => (dispatch: AppDispatch) => {
  dispatch(applicationSlice.actions.resetApplicationSlice());
};

export default applicationSlice.reducer;