const accessTokenName = '9acJU94k';
const refreshTokenName = '8acEF94j';
const userTypeName = "uj788787";

export const setAccessToken = (token:string) => (
    typeof window !== "undefined" && localStorage.setItem(accessTokenName, token)
);

export const getAccessToken = () => (
    typeof window !== "undefined" && localStorage.getItem(accessTokenName)
)

export const removeAccessToken = () => (
    typeof window !== "undefined" && localStorage.removeItem(accessTokenName)
)

export const setRefreshToken = (token:string) => (
    typeof window !== "undefined" && localStorage.setItem(refreshTokenName, token)
);

export const getRefreshToken = () => (
    typeof window !== "undefined" && localStorage.getItem(refreshTokenName)
)

export const removeRefreshToken = () => (
    typeof window !== "undefined" && localStorage.removeItem(refreshTokenName)
)

export const setUserType = (userType:string) => (
    typeof window !== "undefined" && localStorage.setItem(userTypeName, userType)
);

export const getUserType = () => (
    typeof window !== "undefined" && localStorage.getItem(userTypeName)
)

export const removeUserType = () => (
    typeof window !== "undefined" && localStorage.removeItem(userTypeName)
)