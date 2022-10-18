import React from "react";
import Head from "next/head";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

import { VerifySuccessMessageBox } from "../components/verify";
import { verifyEmail } from "../services";
import { useTranslation } from "../hooks";

const Verify = () => {
  const router = useRouter();
  const token: any = router.query.token;
  const mutation = useMutation(verifyEmail);
  const t = useTranslation();

  React.useEffect(() => {
    if (token) {
      mutation.mutate({ token });
    }
  }, [token]);

  return (
    <>
      <Head>
        <title>
          {t?.title} | {t?.verify_email}
        </title>
        <meta name="description" content="Flocks AI verify email" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <VerifySuccessMessageBox loading={mutation.isLoading} />
    </>
  );
};
export default Verify;
