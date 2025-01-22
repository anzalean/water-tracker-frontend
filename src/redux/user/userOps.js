import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an Axios instance with a base URL for API requests
export const axiosInstance = axios.create({
  baseURL: "https://water-tracker-backend-guwj.onrender.com",
  withCredentials: true,
});

// Utility to set the Authorization header with the JWT token
export const setAuthHeader = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove the Authorization header
const clearAuthHeader = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

// Set up Axios interceptors to handle token refresh on 401 errors
export const setupAxiosInterceptors = (store) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        error.response?.status === 401 &&
        !error.config._retry &&
        !error.config.url.includes("auth/refresh")
      ) {
        error.config._retry = true;
        try {
          const data = await store.dispatch(refresh());
          setAuthHeader(data.payload.accessToken);
          error.config.headers.Authorization = `Bearer ${data.payload.accessToken}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};

// Thunk for user registration
export const signUp = createAsyncThunk(
  "user/signup",
  async (signUpData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/register", signUpData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Thunk for user login
export const signIn = createAsyncThunk(
  "user/signin",
  async (signInData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/login", signInData);
      setAuthHeader(response.data.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Thunk for user logout
export const signOut = createAsyncThunk("user/signout", async (_, thunkAPI) => {
  try {
    await axiosInstance.post("/auth/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

// Thunk for fetching the current user
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(reduxState.auth.accessToken);
      // console.log(reduxState.auth.accessToken);
      const response = await axiosInstance.get("/auth/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const savedToken = state.auth.accessToken;
      // console.log(savedToken);
      return savedToken !== null;
    },
  }
);

// Thunk for updating user details
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (data, thunkAPI) => {
    try {
      let response = "";
      if ("avatar" in data) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
          formData.append(key, value);
        }
        response = await axiosInstance.patch("/auth/update-user", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await axiosInstance.patch("/auth/update-user", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      return response.data.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState, rejectWithValue }) => {
      const state = getState();
      const savedToken = state.auth.accessToken;
      if (!savedToken) {
        rejectWithValue("Unauthorized");
        return false;
      }
      return true;
    },
  }
);

// Thunk for sending a password reset email
export const sendResetEmail = createAsyncThunk(
  "user/sendResetEmail",
  async (emailData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/auth/send-reset-email",
        emailData
      );
      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Thunk for validating a password reset token
export const validateResetToken = createAsyncThunk(
  "user/validateResetToken",
  async (token, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/auth/reset-password?token=${token}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Thunk for resetting the password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (resetData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/reset-pwd", {
        token: resetData.resetToken,
        password: resetData.password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Thunk for fetching the OAuth URL for Google login
export const fetchOAuthUrl = createAsyncThunk(
  "user/fetchOAuthUrl",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/auth/get-oauth-url");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Thunk for handling Google login
export const googleLogin = createAsyncThunk(
  "user/googleLogin",
  async (googleData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/auth/google-login",
        googleData
      );
      // console.log("googleLogin", response.data.data.accessToken);
      setAuthHeader(response.data.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getUserCount = createAsyncThunk(
  "user/getUserCount",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/auth/count");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkApi) => {
  const savedToken = thunkApi.getState().auth.accessToken;

  if (!savedToken) {
    return thunkApi.rejectWithValue("Token does not exist!");
  }
  setAuthHeader(savedToken);
  try {
    const { data } = await axiosInstance.post("/auth/refresh");
    // console.log("Response from refresh endpoint:", data);
    if (!data.data || !data.data.accessToken) {
      throw new Error("No accessToken in server response");
    }
    return data.data;
  } catch (error) {
    console.error("Error in refresh token:", error);
    return thunkApi.rejectWithValue(error.message);
  }
});
