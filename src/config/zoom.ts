import axios, { AxiosRequestConfig } from "axios";
import dotenv from "dotenv"
dotenv.config()

// Zoom uchun axios instance yaratish
const zoomAPI = axios.create({
  baseURL: process.env.ZOOM_BASE_URL, // Bitta joyda baseURL
  headers: {
    "Content-Type": "application/json",
  },
});


export const zoomBuilder = (token: string) => {
  return {
    get: (url: string, config: AxiosRequestConfig = {}) => zoomAPI.get(url, { ...config, headers: { Authorization: `Bearer ${token}`, ...config.headers } }),
    post: (url: string, data: any = {}, config: AxiosRequestConfig = {}) => zoomAPI.post(url, data, { ...config, headers: { Authorization: `Bearer ${token}`, ...config.headers } }),
    put: (url: string, data: any, config: AxiosRequestConfig = {}) => zoomAPI.put(url, data, { ...config, headers: { Authorization: `Bearer ${token}`, ...config.headers } }),
    patch: (url: string, data: any, config: AxiosRequestConfig = {}) => zoomAPI.patch(url, data, { ...config, headers: { Authorization: `Bearer ${token}`, ...config.headers } }), // PATCH so'rov
    delete: (url: string, config: AxiosRequestConfig = {}) => zoomAPI.delete(url, { ...config, headers: { Authorization: `Bearer ${token}`, ...config.headers } }),
  };
};
