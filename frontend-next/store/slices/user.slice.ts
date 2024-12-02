import { HOSTNAME } from "@/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define User and Slice State Types
interface User {
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

export const login =
    (data: { email: string; password: string, role: string }) => async (dispatch: any) => {
        dispatch(userSlice.actions.loginRequest());
        try {
            const response = await axios.post(`${HOSTNAME}/api/v1/user/login`, data, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            localStorage.setItem("userToken", response.data.token);
            dispatch(userSlice.actions.loginSuccess(response.data));
        } catch (error: any) {
            dispatch(userSlice.actions.loginFailed(error.response?.data.message || "Login failed"));
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

export const fetchUser = () => async (dispatch: any) => {
    dispatch(userSlice.actions.fetchUserRequest());
    const token = localStorage.getItem("userToken");
    if (!token) {
        dispatch(userSlice.actions.fetchUserFailed("No token found"));
        return;
    }
    try {
        const response = await axios.post(
            `${HOSTNAME}/api/v1/user/profile`,
            {},
            {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            }
        );
        dispatch(userSlice.actions.fetchUserSuccess(response.data));
    } catch (error: any) {
        if (error.response?.status === 401) {
            dispatch(logout());
        }
        dispatch(userSlice.actions.fetchUserFailed(error.response?.data.message || "Failed to fetch user"));
    }
};

// Export Reducer
export default userSlice.reducer;
