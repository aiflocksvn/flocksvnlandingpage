import axiosInstance from "./axiosWithAuth";
import { apiRoutes } from "../utils/constants";

export const getUserProfile = async () => {
    const res = await axiosInstance.get(apiRoutes.userProfile);

    return res;
}

export const editUserProfile = async (values:any) => {
    const res = await axiosInstance.patch(`${apiRoutes.userProfile}`, {
        ...values
    });

    return res;
}