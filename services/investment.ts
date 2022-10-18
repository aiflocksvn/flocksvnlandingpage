import axios from "axios";

import axiosInstance from "./axiosWithAuth";
import { apiRoutes } from "../utils/constants";
import { API_KEY, baseURL } from "../utils/constants";

export const getInvestmentQuestions = async () => {

    const {data} = await axios.get(`${baseURL}${apiRoutes.investmentQuestions}?fields=*,question_set.*,question_set.default_answer_set&expand=question_set,question_set.default_answer_set&page_size=100`, {
        headers: {
            'api-key': API_KEY
        }
    })

    return data;
}

export const createInvestmentProfile = async ({investmentProfile, investmentDetails}:any) => {
    const res = await axiosInstance.post(`${apiRoutes.createInvestmentProfile}`, {
        investmentProfile,
        investmentDetails
    });

    return res;
}