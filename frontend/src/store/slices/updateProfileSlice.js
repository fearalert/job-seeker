import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { hostname } from "../../hostname";

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: {
    loading: false,
    error: null,
    isUpdated: false,
  },
  reducers: {
    updateProfileRequest(state) {
      state.loading = true;
    },
    updateProfileSuccess(state) {
      state.error = null;
      state.loading = false;
      state.isUpdated = true;
    },
    updateProfileFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUpdated = false;
    },
    updatePasswordRequest(state) {
      state.loading = true;
    },
    updatePasswordSuccess(state) {
      state.error = null;
      state.loading = false;
      state.isUpdated = true;
    },
    updatePasswordFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUpdated = false;
    },
    profileResetAfterUpdate(state) {
      state.error = null;
      state.isUpdated = false;
      state.loading = false;
    },
  },
});

export const updateProfile = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updateProfileRequest());
  try {
    const response = await axios.put(
      `${hostname}/api/v1/user/update/profile`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(updateProfileSlice.actions.updateProfileSuccess());
    console.log(response);
  } catch (error) {
    dispatch(
      updateProfileSlice.actions.updateProfileFailed(
        error.response.data.message || "Failed to update profile."
      )
    );
  }
};
export const updatePassword = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updatePasswordRequest());
  try {
    const response = await axios.put(
        `${hostname}/api/v1/user/update/password`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(updateProfileSlice.actions.updatePasswordSuccess());
    console.log(response);
  } catch (error) {
    dispatch(
      updateProfileSlice.actions.updatePasswordFailed(
        error.response.data.message || "Failed to update password."
      )
    );
  }
};

export const clearAllUpdateProfileErrors = () => (dispatch) => {
  dispatch(updateProfileSlice.actions.profileResetAfterUpdate());
};

export default updateProfileSlice.reducer;