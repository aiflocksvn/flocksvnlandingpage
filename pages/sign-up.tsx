import Head from "next/head";
import { Container, Grid } from "@mui/material";

import { SignUpForm } from "../components/sign-up";
import { useTranslation } from "../hooks";

const SignUp = () => {
  const t = useTranslation();

  return (
    <Container maxWidth="xl">
      <Head>
        <title>
          {t?.title} | {t?.sign_up}
        </title>
        <meta name="description" content="Flocks AI sign up" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Grid container spacing={3} py={5} pt={15} justifyContent={"center"}>
        <SignUpForm />
      </Grid>
    </Container>
  );
};

export default SignUp;
