import { createSlice } from '@reduxjs/toolkit';
import {
  signIn,
  signOut,
  signUp,
  updateUser,
  sendResetEmail,
  validateResetToken,
  resetPassword,
  fetchOAuthUrl,
  googleLogin,
} from './userOps';
import toast from 'react-hot-toast';

const initialState = {
  user: {
    _id: null,
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
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    refreshTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        toast.success('Check your email. Verification link has been sent!', {
          duration: 5000,
          position: 'top-center',
        });
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || 'Failed to sign up.', {
          duration: 5000,
          position: 'top-center',
        });
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.loading = false;
        toast.success('Logged in successfully!', {
          duration: 5000,
          position: 'top-center',
        });
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        if (action.payload === 'Please verify your email') {
          state.isResendVerify = true;
        }
        toast.error(action.payload || 'Failed to log in.', {
          duration: 5000,
          position: 'top-center',
        });
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.loading = false;
        toast.success('Logged out successfully!', {
          duration: 5000,
          position: 'top-center',
        });
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        toast.success('Profile updated successfully!', {
          duration: 5000,
          position: 'top-center',
        });
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || 'Failed to update profile.', {
          duration: 5000,
          position: 'top-center',
        });
      })
      .addCase(sendResetEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendResetEmail.fulfilled, (state) => {
        state.loading = false;
        toast.success('Reset email sent successfully!', {
          duration: 5000,
          position: 'top-center',
        });
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || 'Failed to send reset email.', {
          duration: 5000,
          position: 'top-center',
        });
      })
      .addCase(validateResetToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateResetToken.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(validateResetToken.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || 'Invalid reset token.', {
          duration: 5000,
          position: 'top-center',
        });
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        toast.success('Password reset successfully! You can log in now.', {
          duration: 5000,
          position: 'top-center',
        });
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || 'Failed to reset password.', {
          duration: 5000,
          position: 'top-center',
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
        toast.error(action.payload || 'Failed to fetch OAuth URL.', {
          duration: 5000,
          position: 'top-center',
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
        toast.success('Logged in successfully with Google!', {
          duration: 5000,
          position: 'top-center',
        });
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || 'Failed to log in with Google.', {
          duration: 5000,
          position: 'top-center',
        });
      });
  },
});

export const { refreshTokens } = userSlice.actions;
export const userReducer = userSlice.reducer;
