import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { hostname } from "../../hostname";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
    fetchUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    logoutFailed(state, action) {
      state.isAuthenticated = true;
      state.error = action.payload;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(`${hostname}/api/v1/user/register`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Registration response:", response);
    dispatch(userSlice.actions.registerSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed(error.response.data.message));
  }
};

export const clearAllUserError = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      `${hostname}/api/v1/user/login`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    localStorage.setItem("userToken", response.data.token);
    dispatch(userSlice.actions.loginSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(`${hostname}/api/v1/user/logout`, {
      withCredentials: true,
    });
    console.log(response.data);

    localStorage.removeItem("userToken");
    dispatch(userSlice.actions.logoutSuccess());
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    localStorage.removeItem("userToken");
    dispatch(userSlice.actions.logoutFailed(error.response?.data.message || "Logout failed"));
    dispatch(userSlice.actions.clearAllErrors());
  }
};

// export const fetchUser = () => async (dispatch) => {
//   dispatch(userSlice.actions.fetchUserRequest());

//   const token = localStorage.getItem("userToken");
//   if (!token) {
//     dispatch(userSlice.actions.fetchUserFailed("No token found"));
//     return;
//   }

//   try {
//     const response = await axios.post(
//       `${hostname}/api/v1/user/profile`,
//       {},
//       {
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log("DATA", response.data);

//     dispatch(userSlice.actions.fetchUserSuccess(response.data));
//   } catch (error) {
//     dispatch(userSlice.actions.fetchUserFailed(error.response?.data.message || "Failed to fetch user"));
//     dispatch(logout());
//   }
// };

export const fetchUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());

  const token = localStorage.getItem("userToken");
  if (!token) {
    dispatch(userSlice.actions.fetchUserFailed("No token found"));
    return;
  }

  try {
    const response = await axios.post(
      `${hostname}/api/v1/user/profile`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"  // Add this line
        },
      }
    );
    console.log("User Profile Data", response.data);

    dispatch(userSlice.actions.fetchUserSuccess(response.data));
  } catch (error) {
    console.error("Fetch User Error:", error);
    dispatch(userSlice.actions.fetchUserFailed(error.response?.data.message || "Failed to fetch user"));
    
    // Only dispatch logout if the error is specifically about token/authentication
    if (error.response?.status === 401) {
      dispatch(logout());
    }
  }
};


export default userSlice.reducer;