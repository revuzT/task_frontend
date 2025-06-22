/* eslint-disable @typescript-eslint/no-explicit-any */
// https://taskbackend-production-44c7.up.railway.app/

import axios from "axios";
import toast from "react-hot-toast";
// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "https://taskbackend-production-44c7.up.railway.app";

axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  const encryptedEmail = sessionStorage.getItem("encryptedEmail");

  if (encryptedEmail) {
    config.headers["x-user"] = encryptedEmail;
  }

  return config;
});

export async function getRequest(api: string, queryString: string = "") {
  try {
    const url = queryString ? `${api}?${queryString}` : api;
    const response = await axios.get(url);
    return response.data;
  } catch (err: any) {
    throw err.response?.data || err.message;
  }
}

export async function postRequest(api: string, data: any) {
  try {
    const response = await axios.post(api, data);
    return response.data;
  } catch (err: any) {
    console.error("Error in API call:", err.response?.data || err.message);
    toast(err?.response?.data?.message || err?.respinse?.data?.[0]?.message);
    throw err.response?.data || err.message;
  }
}

export async function deleteRequest(api: string, data: any = {}) {
  try {
    const response = await axios.delete(api, { data });
    return response.data;
  } catch (err: any) {
    console.error("Error in API call:", err.response?.data || err.message);
    throw err.response?.data || err.message;
  }
}

export async function putRequest(api: string, data: any) {
  try {
    const response = await axios.put(api, data);
    return response.data;
  } catch (err: any) {
    console.error("Error in API call:", err.response?.data || err.message);
    throw err.response?.data || err.message;
  }
}
