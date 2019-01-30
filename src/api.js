import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const base_axios = axios.create({
  baseURL: BASE_URL
});

export const auth_axios = axios.create({
  baseURL: BASE_URL
});