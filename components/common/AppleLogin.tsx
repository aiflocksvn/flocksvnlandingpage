import React from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { Backdrop, CircularProgress } from "@mui/material";

import { SocialButton } from ".";
import { AppleLogo } from "../icons";
import { useTranslation, useAppTheme } from "../../hooks";
import { generateSocialUrl } from "../../services";
import { appleRedirectUriEn, appleRedirectUriVi } from "../../utils/constants";

const AppleLogin = ({ renderedIn = "sign-up" }: { renderedIn: string }) => {
  const t = useTranslation();
  const theme = useAppTheme();
  const router = useRouter();
  const locale = router.locale;
  const [isHover, setIsHover] = React.useState(false);
  const mutation = useMutation(generateSocialUrl, {
    onSuccess: (data) => {
      let url = data?.data;
      url += `&redirect_uri=${
        locale == "en-US" ? appleRedirectUriEn : appleRedirectUriVi
      }`;
      window.open(url, "_self");
    },
  });

  const generateAppleUrl = () => {
    // mutation.mutate("facebook");
  };

  return (
    <>
      <Backdrop open={mutation.isLoading}>
        <CircularProgress />
      </Backdrop>
      <SocialButton
        icon={<AppleLogo />}
        hoverColor="#fff"
        text={renderedIn === "sign-up" ? t.sign_up_apple : t.sign_in_apple}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        onClick={generateAppleUrl}
      />
    </>
  );
};

export default AppleLogin;
