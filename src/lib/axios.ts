import Axios from "axios";

// import { getCookie } from 'cookies-next';
// const token = getCookie('jwt');

// import Cookies from "js-cookie";
// const token = Cookies.get("jwt");

// Axios.interceptors.request.use(
//     (config) => {
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         Promise.reject(error);
//     }
// );

const axios = Axios.create({
    baseURL: process.env.BACKEND_URL,
    headers:{
        'X-Requested-With':'XMLHttpRequest',
        'Content-Type':"application/json",
        // 'Content-Type': 'multipart/form-data',
        'Accept': "application/json",
    },
    withCredentials:true
})

// axios.interceptors.request.use((config) => {
//     if (localStorage.getItem("user")) {
//         config.headers.Authorization = `Bearer ${
//             JSON.parse(localStorage.getItem("user")).token
//         }`;
//     }
//     return config;
// });

axios.interceptors.request.use(function (config){
    // const token = localStorage.getItem('auth_token');
    const token = '4|me9L7o8tWGPSbFSYSWUHBbWGWNvsQzQJAbC6TEiD4f879df0';
    config.headers.Authorization = token ? `Bearer ${token}`:'';
    return config;
})

export default axios;