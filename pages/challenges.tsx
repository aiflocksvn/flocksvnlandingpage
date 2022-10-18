import React from "react";
import Head from "next/head";
import { Grid } from "@mui/material";

import { useTranslation } from "../hooks";
import { ChallengeSwiper } from "../components/challenges";

const Challenges = () => {
  const t = useTranslation();

  return (
    <Grid container justifyContent={"center"}>
      <Head>
        <title>
          {t?.title} | {t?.challenges}
        </title>
        <meta name="description" content="Flocks AI challenges" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Grid item md={12} xs={12}>
        <ChallengeSwiper />
      </Grid>
     
    </Grid>
  );
};

export default Challenges;

Challenges.requireAuth = true;
