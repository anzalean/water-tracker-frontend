import { createSlice } from "@reduxjs/toolkit";
import {
  signIn,
  signOut,
  signUp,
  fetchCurrentUser,
  updateUser,
  sendResetEmail,
  validateResetToken,
  resetPassword,
  fetchOAuthUrl,
  googleLogin,
  getUserCount,
} from "./userOps";
import toast from "react-hot-toast";

const initialState = {
  user: {
    userId: null,
    name: null,
    email: null,
    avatarURL: null,
    gender: null,
    weight: null,
    activityTime: null,
    desiredVolume: null,
    createdAt: null,
    updatedAt: null,
  },
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  isResendVerify: false,
  error: null,
  userCount: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshTokens: (state, action) => {
      console.log(action.payload);
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user.userId = action.payload.data.userId;
        state.user.email = action.payload.data.email;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An unknown error.";
        }
      })

      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
        state.user = { ...action.payload.data.user };
        state.accessToken = action.payload.data.accessToken;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during sign ip.";
        }
      })

      .addCase(signOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;

        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during sign out.";
        }
      })

      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = { ...action.payload.user };
        state.isLoggedIn = true;
       
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during fetching user";
        }
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = { ...action.payload.user };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;

        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during update.";
        }
      })

      .addCase(sendResetEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendResetEmail.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        toast.success("Reset email sent successfully!", {
          duration: 5000,
          position: "top-center",
        });
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "Failed to send reset email.";
        }
      })
      .addCase(validateResetToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateResetToken.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(validateResetToken.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || "Invalid reset token.", {
          duration: 5000,
          position: "top-center",
        });
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        toast.success("Password reset successfully! You can log in now.", {
          duration: 5000,
          position: "top-center",
        });
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || "Failed to reset password.", {
          duration: 5000,
          position: "top-center",
        });
      })
      .addCase(fetchOAuthUrl.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOAuthUrl.fulfilled, (state, action) => {
        state.oAuthUrl = action.payload;
        state.loading = false;
      })
      .addCase(fetchOAuthUrl.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || "Failed to fetch OAuth URL.", {
          duration: 5000,
          position: "top-center",
        });
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.loading = false;
        toast.success("Logged in successfully with Google!", {
          duration: 5000,
          position: "top-center",
        });
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || "Failed to log in with Google.", {
          duration: 5000,
          position: "top-center",
        });
      })
      .addCase(getUserCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserCount.fulfilled, (state, action) => {
        state.loading = false;
        state.userCount = action.payload.data.users;
      })
      .addCase(getUserCount.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || "Unable to retrieve user count.", {
          duration: 5000,
          position: "top-center",
        });
      });
  },
});

export const { refreshTokens } = userSlice.actions;
export const userReducer = userSlice.reducer;
