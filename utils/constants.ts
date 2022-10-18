// export const baseURL = 'http://localhost:8000/api/v1/';
// export const baseURL = 'http://192.168.2.226:8000/api/v1/';
// export const baseURL = 'http://5.189.148.68:8000/api/v1/';
// export const baseURL = 'http://vmi520323.contaboserver.net/api/v1/';
//export const baseURL = 'https://api.flocks.vn/api/v1/';
export const baseURL = 'http://172.31.115.129:8000/api/v1/';

// export const remoteBaseURL = 'https://www.anarsupermarket.website/api/v1/';
export const mediaBaseURL = baseURL.replace("/api/v1/", "");

export const mediaChallengesImage ="https://uploads.flocks.vn"
export const API_KEY = 'vaiDTsb0.S7XRhUacCPkyXaBGPt0vUA5QLddEBmn8';
const frontendDomain = "https://flocks.vn/";
// const frontendDomain = "http://localhost:3000/";
export const nextJsBaseURL = `${frontendDomain}api/`;

export const googleRedirectUriEn = `${frontendDomain}social/google`;
export const googleRedirectUriVi = `${frontendDomain}vi/social/google`;
export const facebookRedirectUriEn = `${frontendDomain}social/facebook`;
export const facebookRedirectUriVi = `${frontendDomain}vi/social/facebook`;
export const appleRedirectUriEn = `${frontendDomain}social/apple`;
export const appleRedirectUriVi = `${frontendDomain}vi/social/apple`;

export const apiRoutes = {
    signUpWithEmail: "auth/email/sign_up/",
    signInWithEmail: "auth/email/sing_in/",
    refreshToken: "auth/token/refresh/",
    generateSocialUrl: "auth/social/oauth_uri/",
    signInWithSocial: "auth/social/",
    verifyEmail: "auth/email/sign_up/verify/",
    resendVerifyEmail: "auth/email/sign_up/resend_verify/",
    userProfile: "auth/profile/me/",
    passwordResetCode: "auth/password/reset/email/send_code/",
    passwordResetConfirm: "auth/password/reset/email/confirm_code/",
    checkUserVerificationStatus: "verification/id/me",
    uploadVerificationId: "verification/id/",

    challengeUpdate:"/challenge/challenge_answer/",
    challengeList:"/challenge/challenge_day/",

    investmentQuestions: "investment/investment_info_question/",
    createInvestmentProfile: "investment/add_more_info/",

    companyQuestions: "company/company_info_question/",
    createCompanyProfile: "company/add_more_info/",

    mediaUpload: "media/upload_media_file/",

    contactForm: "contact_form/",


}

export const remoteApiRoutes = {
    signUpWithEmail: "auth/sign_up/email/",
    signInWithEmail: "auth/sign_in/email/",
    refreshToken: "auth/tokens/refresh/",
    generateSocialUrl: "auth/social/oauth_uri/",
    signInWithSocial: "auth/social/",
    verifyEmail: "auth/sign_up/email/verify/",
    resendVerifyEmail: "auth/sign_up/email/resend_varify/",
    userProfile: "auth/profile/me/",
    passwordResetCode: "auth/password/reset/email/send_code/",
    passwordResetConfirm: "auth/password/reset/email/",

    investmentQuestions: "investment/investment_info_question/",
    createInvestmentProfile: "investment/add_more_info/",

    companyQuestions: "company/company_info_question/",
    createCompanyProfile: "company/add_more_info/",

    mediaUpload: "media/upload_media_file/",

    contactForm: "contact_form/",


}

const nextjsApiRoutes = {
    signInWithEmail: "auth/login",
    refreshToken: "auth/refresh",
}