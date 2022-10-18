import axiosInstance from "./axiosWithAuth";
import { apiRoutes } from "../utils/constants";

export const checkUserVerificationStatus = async () => {
    const res = await axiosInstance.get(apiRoutes.checkUserVerificationStatus);

    return res;
}

export const uploadVerificationId = async (values:any) => {
    const { livenessImg, capturedLivenessImg, frontImg, backImg} = values;
    let liveness = capturedLivenessImg === null ? livenessImg : capturedLivenessImg;
    const formData = new FormData();
    formData.append("liveness_img", liveness);
    formData.append("front_img", frontImg);
    formData.append("back_img", backImg);
    const res = await axiosInstance.post(`${apiRoutes.uploadVerificationId}`, formData);

    return res;
}