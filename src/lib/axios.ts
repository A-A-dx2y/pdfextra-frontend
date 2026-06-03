import axios from 'axios';
console.log("API BASE URL =", process.env.NEXT_PUBLIC_API_BASE_URL);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});