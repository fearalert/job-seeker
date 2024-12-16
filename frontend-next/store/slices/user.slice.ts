import { HOSTNAME } from "@/constants";
import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Resume } from "./application.slice";
import { RootState } from "../store";
import updateProfileSlice from "./update-profile.slice";

// Define User and Slice State Types
export interface User {
    _id?: string;
    name?: string;
    email?: string;
    phone?: number;
    address?: string;
    password?: string;
    coverLetter?: string;
    role?: string;
    createdAt?: string;
    __v?: number;
    resume?: Resume;
    niches?: {
        firstNiche?: string;
        secondNiche?: string;
        thirdNiche?: string;
        fourthNiche?: string;
    };
}

interface UserState {
    loading: boolean;
    isAuthenticated: boolean;
    user: User | null;
    error: string | null;
    message: string | null;
}

// Initial State
const initialState: UserState = {
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
    message: null,
};

// Create Slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registerRequest(state) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.message = null;
        },
        registerSuccess(state, action: PayloadAction<{ user: User; message: string }>) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null;
            state.message = action.payload.message;
        },
        registerFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
            state.message = null;
        },
        loginRequest(state) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.message = null;
        },
        loginSuccess(state, action: PayloadAction<{ user: User; message: string }>) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null;
            state.message = action.payload.message;
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
            state.message = null;
        },
        fetchUserRequest(state) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
        fetchUserSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        fetchUserFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        logoutSuccess(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
        logoutFailed(state, action: PayloadAction<string>) {
            state.isAuthenticated = true;
            state.error = action.payload;
        },
        forgotPasswordRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        forgotPasswordSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        forgotPasswordFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        clearAllErrors(state) {
            state.error = null;
        },
    },
});

// Action Creators
export const register =
    (data: FormData) => async (dispatch: any) => {
        dispatch(userSlice.actions.registerRequest());
        try {
            const response = await axios.post(`${HOSTNAME}/api/v1/user/register`, data, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });
            dispatch(userSlice.actions.registerSuccess(response.data));
        } catch (error: any) {
            dispatch(userSlice.actions.registerFailed(error.response?.data.message || "Registration failed"));
        }
    };

export const fetchUser = () => async (dispatch: any) => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            dispatch(userSlice.actions.fetchUserFailed("No token found"));
            throw new Error("No token found");
        }
        
        try {
            const response = await axios.post(
                `${HOSTNAME}/api/v1/user/profile`,
                {},
                {
                    withCredentials: true,
                    headers: { 
                        Authorization: `Bearer ${token}`, 
                        "Content-Type": "application/json" 
                    },
                }
            );
            
            // Extract the user from the nested response
            const userData = response.data.user;
            
            dispatch(userSlice.actions.fetchUserSuccess(userData));
            return userData;
        } catch (error: any) {
            localStorage.removeItem("userToken");
            
            if (error.response?.status === 401) {
                dispatch(logout());
            }
            
            dispatch(userSlice.actions.fetchUserFailed(error.response?.data.message || "Failed to fetch user"));
            throw error;
        }
    };
    
export const login =
        (data: { email: string; password: string, role: string }) => async (dispatch: any) => {
            dispatch(userSlice.actions.loginRequest());
            try {
                const response = await axios.post(`${HOSTNAME}/api/v1/user/login`, data, {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                });
                
                // Ensure token is always set
                const token = response.data.token;
                if (token) {
                    localStorage.setItem("userToken", token);
                }
                
                // Extract the user from the nested response
                const userData = response.data.user;
                
                dispatch(userSlice.actions.loginSuccess({
                    user: userData, 
                    message: response.data.message
                }));
                return response.data;
            } catch (error: any) {
                dispatch(userSlice.actions.loginFailed(error.response?.data.message || "Login failed"));
                throw error;
            }
        };
    
export const logout = () => async (dispatch: any) => {
    try {
        const response = await axios.get(`${HOSTNAME}/api/v1/user/logout`, {
            withCredentials: true,
        });
        localStorage.removeItem("userToken");
        dispatch(userSlice.actions.logoutSuccess());
    } catch (error: any) {
        localStorage.removeItem("userToken");
        dispatch(userSlice.actions.logoutFailed(error.response?.data.message || "Logout failed"));
    }
};

export const forgotPassword = (email: string) => async (dispatch: any) => {
    dispatch(userSlice.actions.forgotPasswordRequest());
    try {
        const response = await axios.post(`${HOSTNAME}/api/v1/user/forgotpassword`, { email }, {
            headers: { "Content-Type": "application/json" },
        });
        dispatch(userSlice.actions.forgotPasswordSuccess(response.data.message));
    } catch (error: any) {
        dispatch(userSlice.actions.forgotPasswordFailed(error.response?.data.message || "Password reset failed"));
    }
};

export const clearAllUserErrors = (): ThunkAction<void, RootState, unknown, PayloadAction<void>> => 
    (dispatch) => {
      dispatch(userSlice.actions.clearAllErrors());
    };

export default userSlice.reducer;
