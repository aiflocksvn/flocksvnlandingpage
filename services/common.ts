import axiosInstance from "./axiosWithAuth";
import { apiRoutes } from "../utils/constants";

export const uploadMediaFile = async ({file, onUploadProgress}:any) => {

    let formData = new FormData();
    formData.append('file',file)
    const res = await axiosInstance.post(`${apiRoutes.mediaUpload}`, formData, {
        headers:{
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress:onUploadProgress
    });

    return res;
}

