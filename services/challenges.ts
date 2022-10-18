import { apiRoutes } from "../utils/constants"
import axiosInstance from "./axiosWithAuth"

const UPDATE_CHALLENGE = async (value:any) =>{
    const {data} = await axiosInstance.post(apiRoutes?.challengeUpdate , value )
    return data
}
export {
    UPDATE_CHALLENGE
}