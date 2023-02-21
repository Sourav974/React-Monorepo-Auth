import { createSlice } from "@reduxjs/toolkit";

const auth = !!localStorage.getItem("isAuthenticated");

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: auth,
  user: null,
  loading: false,
  success: "",
  error: null,
  resetPasswordData: null,
  confirmPasswordData: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    getAccessToken(state, action) {
      localStorage.setItem("access_token", action.payload.accessToken);
      console.log("access_token", action.payload.accessToken);
      state.accessToken = action.payload.accessToken;
    },
    getRefreshToken(state, action) {
      localStorage.setItem("refresh_token", action.payload.refreshToken);
      state.refreshToken = action.payload.refreshToken;
    },
    getUser(state, action) {
      state.user = action.payload;
    },
    isAuthenticated(state, action) {
      localStorage.setItem("isAuthenticated", true);
      state.isAuthenticated = true;
    },
    removeAccess(state, action) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("isAuthenticated");
    },
    passwordData: (state, action) => {
      console.log("action payload", action.payload);
      state.loading = false;
      state.success = action.payload.success;
      state.resetPasswordData = action.payload.passwordResponse;
      state.error = null;
    },
    resetPasswordData: (state, action) => {
      console.log("action payload", action.payload);
      state.loading = false;
      state.success = action.payload.success;
      state.resetPasswordData = action.payload.resetPasswordResponse;
      state.error = null;
    },
    confirmPasswordData: (state, action) => {
      console.log("action payload", action.payload);
      state.loading = false;
      state.success = action.payload.success;
      state.confirmPasswordData = action.payload.confirmPasswordData;
      state.error = null;
    },
  },
});

export default authSlice;
