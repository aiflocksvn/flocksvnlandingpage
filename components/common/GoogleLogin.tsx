import React from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { Backdrop, CircularProgress } from "@mui/material";

import { SocialButton } from ".";
import { GoogleLogo } from "../icons";
import { useTranslation, useAppTheme } from "../../hooks";
import { generateSocialUrl } from "../../services";
import {
  googleRedirectUriEn,
  googleRedirectUriVi,
} from "../../utils/constants";

const GoogleLogin = ({ renderedIn = "sign-up" }: { renderedIn: string }) => {
  const t = useTranslation();
  const theme = useAppTheme();
  const router = useRouter();
  const locale = router.locale;
  const [isHover, setIsHover] = React.useState(false);
  const [redirectUrl, setRedirectUrl] = React.useState();
  const mutation = useMutation(generateSocialUrl, {
    onSuccess: (data) => {
      let url = data?.data;
      url += `&redirect_uri=${
        locale == "en-US" ? googleRedirectUriEn : googleRedirectUriVi
      }`;

      window.open(url, "_self");
    },
  });

  const generategoogleUrl = () => {
    mutation.mutate("google");
  };

  return (
    <>
      <Backdrop open={mutation.isLoading}>
        <CircularProgress />
      </Backdrop>
      <SocialButton
        icon={<GoogleLogo />}
        hoverColor="#fff"
        text={renderedIn === "sign-up" ? t.sign_up_google : t.sign_in_google}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        onClick={generategoogleUrl}
      />
    </>
  );
};

export default GoogleLogin;
