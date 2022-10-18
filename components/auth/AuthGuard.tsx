import React from "react";
import { useRouter } from "next/router";
import { Backdrop, CircularProgress } from "@mui/material";

import { useAuth } from "../../hooks";
import { getAccessToken } from "../../utils/storage";

const AuthGruard = ({ children }: any) => {
  const router = useRouter();
  const auth: any = useAuth();

  React.useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.push("/sign-in");
    }
  }, [getAccessToken]);

  if (auth.init) {
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  }

  return <>{children}</>;
};

export default AuthGruard;
