import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";

import {
  signInWithEmail,
  checkUserVerificationStatus,
  getUserProfile,
  refreshToken,
} from "../services";
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
  getUserType,
  removeUserType,
} from "../utils/storage";
import { getUrlAfterLogin } from "../utils/functions";

export const AuthContext: any = React.createContext(null);

const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const locale: any = router.locale;
  const userType: any = getUserType();
  const [user, setUser] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [init, setInit] = React.useState(true);
  const [token, setToken] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [errorMsg, setErrorMsg] = React.useState("");
  const [challengePage , setChallengePage] = React.useState(true)
  const userProfileQuery = useQuery("userProfile", getUserProfile, {
    enabled: getAccessToken() !== null ? true : false,
    onSuccess: (data) => {
      setUser(data?.data);
      setIsAuthenticated(true);
    },
  });
  const verificationStatusQuery: any = useQuery(
    "userVerificationStatus",
    checkUserVerificationStatus,
    {
      enabled: getAccessToken() !== null ? true : false,
    }
  );

  React.useEffect(() => {
    const getToken = async () => {
      const token = await getAccessToken();
      return token;
    };

    getToken()
      .then((token: any) => setToken(token))
      .then(() => setInit(false));
  }, [token]);

  const mutation = useMutation(signInWithEmail, {
    onSuccess: async (data: any) => {
      console.log("data login" , data)
      setIsAuthenticated(true);
      setAccessToken(data.data.accessToken);
      setRefreshToken(data.data.refreshToken);
      setToken(data.data.accessToken);
      setUser(data.data.userDetails);
      const redirectAfterLogin = getUrlAfterLogin(userType, locale);
      if (data?.data?.hasCompanyProfile || data?.data?.hasInvestmentProfile){
        return router.push(`/${locale}/challenges`)
      }
      router.push(redirectAfterLogin);
    },
    onError: (err) => {
      setIsAuthenticated(false);
      setErrorMsg((err as any).message);
      setErrors((err as any).response?.data);
    },
  });

  const isLoading = mutation.isLoading;
  const isError = mutation.isError;

  const login = async (email: string, password: string) => {
    return mutation.mutate({ email, password });
  };

  const logout = () => {
    removeAccessToken();
    removeRefreshToken();
    removeUserType();
    setUser(null);
    setToken(null);
    router.push("/sign-in");
  };
  const value: any = {
    init,
    token,
    user,
    isAuthenticated,
    userProfileQuery,
    verificationStatusQuery,
    setUser,
    setToken,
    isError,
    isLoading,
    errors,
    setErrors,
    errorMsg,
    setErrorMsg,
    login,
    logout,
    challengePage , 
    setChallengePage
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
