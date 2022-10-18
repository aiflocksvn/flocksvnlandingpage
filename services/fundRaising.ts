import axios from "axios";
import axiosInstance from "./axiosWithAuth";
import { apiRoutes, API_KEY, baseURL } from "../utils/constants";

export const getCompanyQuestions = async () => {

    const {data} = await axios.get(`${baseURL}${apiRoutes.companyQuestions}?fields=*,question_set.*,question_set.default_answer_set&expand=question_set,question_set.default_answer_set&page_size=100`, {
        headers: {
            'api-key': API_KEY
        }
    })

    return data;
}

export const createCompanyProfile = async ({companyProfile, companyDetails}:any) => {
    const res = await axiosInstance.post(`${apiRoutes.createCompanyProfile}`, {
        companyProfile,
        companyDetails
    });

    return res;
}