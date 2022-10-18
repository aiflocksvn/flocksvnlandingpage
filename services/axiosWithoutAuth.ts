import axios from 'axios';

import { baseURL } from '../utils/constants';
import { getLanguage } from '../utils/functions';

const lang = getLanguage();
const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 15000,
    headers:{
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Accept-Language': lang
    }
});


export default axiosInstance;