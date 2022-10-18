import React from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { Backdrop, CircularProgress } from "@mui/material";

import { SocialButton } from ".";
import { FacebookLogo } from "../icons";
import { useTranslation, useAppTheme } from "../../hooks";
import { generateSocialUrl } from "../../services";
import {
  facebookRedirectUriEn,
  facebookRedirectUriVi,
} from "../../utils/constants";

const FacebookLogin = ({ renderedIn = "sign-up" }: { renderedIn: string }) => {
  const t = useTranslation();
  const theme = useAppTheme();
  const router = useRouter();
  const locale = router.locale;
  const [isHover, setIsHover] = React.useState(false);
  const mutation = useMutation(generateSocialUrl, {
    onSuccess: (data) => {
      let url = data?.data;
      url += `&redirect_uri=${
        locale == "en-US" ? facebookRedirectUriEn : facebookRedirectUriVi
      }`;
      // let url = data?.data + "&redirect_uri=https://ffc7-103-53-24-10.ngrok.io/social/facebook" 
      window.open(url, "_self");
    },
  });

  const generateFacebookUrl = () => {
    mutation.mutate("facebook");
  };

  return (
    <>
      <Backdrop open={mutation.isLoading}>
        <CircularProgress />
      </Backdrop>
      <SocialButton
        icon={<FacebookLogo />}
        color="#fff"
        hoverColor="#1877F2"
        text={
          renderedIn === "sign-up" ? t.sign_up_facebook : t.sign_in_facebook
        }
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        onClick={generateFacebookUrl}
      />
    </>
  );
};

export default FacebookLogin;
