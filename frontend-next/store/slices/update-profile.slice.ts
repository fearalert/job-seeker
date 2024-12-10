import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { HOSTNAME } from "@/constants";

// Types for Niches
interface Niches {
  firstNiche?: string;
  secondNiche?: string;
  thirdNiche?: string;
  fourthNiche?: string;
}

// Types for Profile Update Data
export interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: number;
  address?: string;
  niches?: Niches;
  coverLetter?: string;
  resume?: File;
}

// Types for Password Update Data
interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// State Interface
interface UpdateProfileState {
  loading: boolean;
  error: string | null;
  isUpdated: boolean;
}

// Initial State
const initialState: UpdateProfileState = {
  loading: false,
  error: null,
  isUpdated: false,
};

// Slice
const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    updateProfileRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess(state) {
      state.error = null;
      state.loading = false;
      state.isUpdated = true;
    },
    updateProfileFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.isUpdated = false;
    },
    updatePasswordRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updatePasswordSuccess(state) {
      state.error = null;
      state.loading = false;
      state.isUpdated = true;
    },
    updatePasswordFailed(state, action: PayloadAction<string>) {
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

export const updateProfile = (
  data: UpdateProfileData
): ThunkAction<void, RootState, unknown, PayloadAction<string | void>> => 
  async (dispatch) => {
    try {
      dispatch(updateProfileSlice.actions.updateProfileRequest());
      
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === 'niches') {
            Object.entries(value as Niches).forEach(([nicheKey, nicheValue]) => {
              if (nicheValue) {
                formData.append(nicheKey, nicheValue);
              }
            });
          } else {
            formData.append(key, value);
          }
        }
      });

      const response = await axios.put(
        `${HOSTNAME}/api/v1/user/update/profile`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      
      dispatch(updateProfileSlice.actions.updateProfileSuccess());
      console.log(response);
    } catch (error: any) {
      dispatch(
        updateProfileSlice.actions.updateProfileFailed(
          error.response?.data?.message || "Failed to update profile."
        )
      );
    }
  };

export const updatePassword = (
  data: UpdatePasswordData
): ThunkAction<void, RootState, unknown, PayloadAction<string | void>> => 
  async (dispatch) => {
    try {
      dispatch(updateProfileSlice.actions.updatePasswordRequest());
      
      const response = await axios.put(
        `${HOSTNAME}/api/v1/user/update/password`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      
      dispatch(updateProfileSlice.actions.updatePasswordSuccess());
      console.log(response);
    } catch (error: any) {
      dispatch(
        updateProfileSlice.actions.updatePasswordFailed(
          error.response?.data?.message || "Failed to update password."
        )
      );
    }
  };

// Action to clear errors
export const clearAllUpdateProfileErrors = (): ThunkAction<void, RootState, unknown, PayloadAction<void>> => 
  (dispatch) => {
    dispatch(updateProfileSlice.actions.profileResetAfterUpdate());
  };

export const { 
  updateProfileRequest, 
  updateProfileSuccess, 
  updateProfileFailed,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailed,
  profileResetAfterUpdate
} = updateProfileSlice.actions;

export default updateProfileSlice.reducer;