import axios from 'axios';

import { baseURL } from '../utils/constants';
import { getLanguage } from '../utils/functions';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, removeAccessToken, removeRefreshToken } from '../utils/storage';

const lang = getLanguage();

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers:{
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Accept-Language': lang
    }
});

const axiosInstanceWithOutHeader = axios.create({
    baseURL: baseURL,
    headers:{
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Accept-Language': lang,
    }
});

axiosInstanceWithOutHeader.interceptors.response.use(
    response => response ,
    error => {
        const mainRequest = error.config;
        // console.log("error.response " , error)

        if (error.response?.status === 401 && mainRequest.url === 'auth/token/refresh/') {
            removeAccessToken();
            removeRefreshToken();
            window.location.href = '/sign-in/';
            return Promise.reject(error);
        }
        return Promise.reject(error)
    }
)
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const mainRequest = error.config;
        if (error.response?.status === 401 && mainRequest.url === 'auth/token/refresh/') {
            removeAccessToken();
            removeRefreshToken();
            window.location.href = lang === "en" ? "/" : `/${lang}`;
            return Promise.reject(error);
        }

        if(error.response?.status === 401 && error.response.statusText === 'Unauthorized'){
            const refresh_token = getRefreshToken();
            return axiosInstanceWithOutHeader
                .post('auth/token/refresh/', {
                    'refresh':refresh_token
                })
                .then(response => {
                    setAccessToken(response.data.access);
                    // setRefreshToken(response.data.refresh);
                    if (response.data.refresh){

                        setRefreshToken(response.data.refresh);
                    }
                    (axiosInstance as any).defaults.headers['Authorization'] = "Bearer " + response.data.access;
                    mainRequest.headers['Authorization'] = "Bearer " + response.data.access;

                    return axiosInstance(mainRequest)
                })
                .catch(error => {
                    console.log(error)
                })
        }

        return Promise.reject(error)
    }
)

export default axiosInstance;