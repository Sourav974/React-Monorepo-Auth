import * as requestFromServer from "./authCrud";
import authSlice from "./authSlice";

const { actions } = authSlice;

/* ========= Login ========= */
export const loginAction = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    requestFromServer
      .login(data)
      .then(({ data }) => {
        const { accessToken, refreshToken } = data;
        dispatch(actions.getAccessToken({ accessToken }));
        dispatch(actions.getRefreshToken({ refreshToken }));
        dispatch(actions.isAuthenticated());
        getProfile();
        resolve(accessToken);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/* ========= GetUser ========= */
export const getProfile = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    requestFromServer
      .userProfile()
      .then((response) => {
        dispatch(actions.getUser({ response }));
        resolve(response);
      })
      .catch((error) => {
        error.message = "No User found";
        reject(error);
      });
  });
};

/* =========Logout ========= */
export const logoutUser = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem("isAuthenticated", false);
    dispatch(actions.removeAccess());
    resolve();
  });
};

/* ========= Signup ========= */
export const registerAction = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    requestFromServer
      .register(data)
      .then(({ data }) => {
        const { accessToken } = data;
        console.log("accessToken of register: ", accessToken);
        dispatch(actions.register({ accessToken }));
        resolve(accessToken);
      })
      .catch((error) => {
        error.message = "Invalid credentials";
        dispatch(actions.catchError({ error }));
        reject(error);
      });
  });
};

export const ForgotPassword = (data) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    const authToken = localStorage.getItem("access_token");

    requestFromServer
      .PasswordChange(data, authToken)
      .then((response) => {
        dispatch(
          actions.catchSuccessMessage({
            success: "Password Changed successfully",
          })
        );
        const passwordResponse = response.data;
        dispatch(actions.passwordData({ passwordResponse }));
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const ResetPassword = (username, password) => (dispatch, getState) => {
  return new Promise(function (resolve, reject) {
    const authToken = localStorage.getItem("access_token");
    requestFromServer
      .PasswordReset(authToken, username, password)
      .then((response) => {
        console.log("response", response);
        dispatch(
          actions.catchSuccessMessage({
            success: "Password Changed successfully",
          })
        );
        const resetPasswordResponse = response.data;
        dispatch(actions.resetPasswordData({ resetPasswordResponse }));
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};



