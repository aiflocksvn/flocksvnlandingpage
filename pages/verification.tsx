import React from "react";
import Head from "next/head";
import { Container, Grid } from "@mui/material";

import { useTranslation } from "../hooks";
import { VerificationStepper } from "../components/verification";

const Verification = () => {
  const t = useTranslation();

  return (
    <Container maxWidth="xl">
      <Head>
        <title>
          {t?.title} | {t?.id_verification}
        </title>
        <meta name="description" content="Flocks AI ID verification" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Grid container spacing={3} py={5} pt={15} justifyContent={"center"}>
        <Grid item md={10} xs={12}>
          <VerificationStepper />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Verification;

Verification.requireAuth = true;
