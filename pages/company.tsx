import React from "react";
import Head from "next/head";
import { Container, Grid } from "@mui/material";

import { useTranslation, useAppTheme } from "../hooks";
import { CompanyProfile } from "../components/company";

import { getCompanyQuestions } from "../services";

const Company = (props: any) => {
  const t = useTranslation();

  return (
    <Container maxWidth="xl">
      <Head>
        <title>
          {t?.title} | {t?.company}
        </title>
        <meta name="description" content="Flocks AI company profile creation" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Grid container spacing={3} py={5} pt={15} justifyContent={"center"}>
        <Grid item md={6} xs={12}>
          <CompanyProfile questions={props.questions} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Company;

Company.requireAuth = true;

export async function getStaticProps(context: any) {
  const questions = await getCompanyQuestions();

  return {
    props: {
      questions,
    },
    revalidate: 60,
  };
}
