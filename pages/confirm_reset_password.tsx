import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container, Grid } from "@mui/material";

import { ResetPasswordForm } from "../components/reset-password";
import { useTranslation } from "../hooks";

const ResetPassword = () => {
  const router = useRouter();
  const t = useTranslation();

  return (
    <Container maxWidth="xl">
      <Head>
        <title>
          {t?.title} | {t?.reset_password}
        </title>
        <meta name="description" content="Flocks AI sign in" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Grid container spacing={3} pt={15} pb={2} justifyContent={"center"}>
        <Grid item md={3} xs={12}>
          <ResetPasswordForm />
        </Grid>
      </Grid>
    </Container>
  );
};
export default ResetPassword;
