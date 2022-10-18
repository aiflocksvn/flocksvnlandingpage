import axiosInstance from "./axiosWithoutAuth";
import { apiRoutes } from "../utils/constants";

export const signUpWithEmail = async (values:any) => {
    
    return await axiosInstance.post(apiRoutes.signUpWithEmail, {
        ...values,
        signup_platform:"landing_page"
    })
}

export const signInWithEmail = async (values:any) => {
    return await axiosInstance.post(apiRoutes.signInWithEmail, {
        ...values
    })
}

export const generateSocialUrl = async (provider:any) => {
    return await axiosInstance.get(`${apiRoutes.generateSocialUrl}?provider=${provider}`)
}


export const signInWithSocial = async (values:any) => {
    return await axiosInstance.post(apiRoutes.signInWithSocial, {
        ...values
    })
}

export const verifyEmail = async ({token}:{token:string}) => {
    return await axiosInstance.post(apiRoutes.verifyEmail, {
        token
    })
}

export const resendVerifyEmail = async ({email}:{email:string}) => {
    return await axiosInstance.post(apiRoutes.resendVerifyEmail, {
        email
    })
}


export const refreshToken = async () => {
    return await axiosInstance.get(apiRoutes.refreshToken)
}

export const requestPasswordReset = async ({email}:{email:string}) => {
    return await axiosInstance.post(apiRoutes.passwordResetCode, {
        email,
        signup_platform:"landing_page"
    })
}

export const confirmPasswordReset = async ({password, token}:{password:string, token:string}) => {
    return await axiosInstance.post(apiRoutes.passwordResetConfirm, {
        password,
        token
    })
}