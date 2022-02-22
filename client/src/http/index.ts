import axios, {AxiosRequestConfig} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
     if (!config?.headers) {
        throw new Error(`axios interceptors Expected 'config' and 'config.headers' not to be undefined`);
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    if (!config?.headers) {
        throw new Error(`axios interceptors Expected 'config' and 'config.headers' not to be undefined`);
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/user/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.AccessToken);
            return $api.request(originalRequest);
        } catch (e: any) {
            console.log(e);
        }
    }
    throw error;
});

export default $api;