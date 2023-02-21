import axios from "axios";
import env from "../../../env/index";

const api_url = `{env.dataApi}`;

let headers = {
  "content-type": "application/json",
};

export const LOGIN_URL =
  "https://8ff7-2401-4900-1f33-ff25-b925-5c38-845e-738b.in.ngrok.io/api/users/sign-in";
export const REGISTER_URL =
  "https://8ff7-2401-4900-1f33-ff25-b925-5c38-845e-738b.in.ngrok.io/api/users/sign-up";
// export const REQUEST_PASSWORD_URL = "auth/resetPassword";
export const ME_URL = "profile";

/* ========= Login ========= */
export function login(formData) {
  console.log("login", formData);
  return axios.post(LOGIN_URL, formData);
}

/* ========= Getuser ========= */
export function userProfile() {
  try {
    const token = localStorage.getItem("access_token");
    console.log("access_token", token);
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      return axios.get(`${api_url}/user`, { headers });
    }
  } catch (error) {
    console.log(error);
  }
}

/* ========= Signup ========= */
export function register(formData) {
  return axios.post(REGISTER_URL, formData, headers);
  // // try {
  // //   const token = localStorage.getItem("access_token");
  // //   if (token) {
  // //     return axios.post(REGISTER_URL, formData);
  // //   }
  // // } catch (err) {
  //   console.log(err);
  // }
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}

export function PasswordChange(formData, authToken) {
  return axios.post(
    `${"https://8ff7-2401-4900-1f33-ff25-b925-5c38-845e-738b.in.ngrok.io/api/users/ResetPassword"}`,
    formData,
    { headers: { Authorization: `Bearer ${authToken || ""}` } }
  );
}

export function PasswordReset(authToken, username, password) {
  console.log("token: " + authToken);
  return axios.post(
    `https://8ff7-2401-4900-1f33-ff25-b925-5c38-845e-738b.in.ngrok.io/api/users/password?password=${password}&username=${username}`,
    {},

    { headers: { Authorization: `Bearer ${authToken || ""}` } }
  );
}


