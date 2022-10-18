import axiosInstance from "./axiosWithoutAuth";
import { apiRoutes } from "../utils/constants";


export const sendContactForm = async (values:any) => {
    const res = await axiosInstance.post(`${apiRoutes.contactForm}`, {
        ...values
    });

    return res;
}