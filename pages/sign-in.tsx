import Head from "next/head";
import { Container, Grid } from "@mui/material";

import { SignInForm } from "../components/sign-in";
import { useTranslation } from "../hooks";

const SignUp = () => {
  const t = useTranslation();

  return (
    <Container maxWidth="xl">
      <Head>
        <title>
          {t?.title} | {t?.sign_in}
        </title>
        <meta name="description" content="Flocks AI sign in" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Grid container spacing={3} py={5} pt={15} justifyContent={"center"}>
        <Grid item md={3} xs={12}>
          <SignInForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;
