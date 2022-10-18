import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  TextField,
  FormHelperText,
  Box,
  Grid,
  Button,
  InputAdornment,
  Typography,
  Divider,
  IconButton,
  Alert,
  Stack,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";

import { useTranslation, useAuth } from "../../hooks/";
import {
  ErrorStack,
  SingleError,
  GoogleLogin,
  FacebookLogin,
  AppleLogin,
  ResendVerifyEmail,
} from "../common";
import { SmsIcon, VisibilityIcon, VisibilityOffIcon } from "../icons";
import { requestPasswordReset } from "../../services";

const SignInForm = () => {
  const t = useTranslation();
  const auth: any = useAuth();
  const [emailSignIn, setEmailSignIn] = React.useState(false);
  const [isForgot, setIsForgot] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [errorMsg, setErrorMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const passwordResetMutation = useMutation(requestPasswordReset, {
    onSuccess: (data) => {
      setOpen(true);
    },
  });
  // console.log("passwordResetMutation" , passwordResetMutation)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      showPassword: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t.email_invalid_format_message)
        .required(t.email_required_message),
      password: isForgot
        ? Yup.string()
        : Yup.string()
            .min(7, t.password_invalid_length_message)
            .required(t.password_required_message),
    }),
    onSubmit: async (values) => {
      if (isForgot) {
        passwordResetMutation.mutate({ email: values.email.toLowerCase() });
      } else {
        await auth.login(values.email.toLowerCase(), values.password);
      }
    },
  });

  const toggleForgot = () => {
    setIsForgot((isForgot) => !isForgot);
  };

  const handleClickShowPassword = () => {
    formik.setFieldValue("showPassword", !formik.values.showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const openEmailSignIn = () => {
    setEmailSignIn(true);
  };

  React.useEffect(() => {
    auth.setErrors({});
  }, [isForgot]);

  React.useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [emailSignIn]);

  return (
    <Box sx={{ minHeight: "85vh" }}>
      <Typography variant="h3" textAlign="center" color={"#fff"} gutterBottom>
        {t?.sign_in}
      </Typography>
      {auth.errorMsg && auth.errorMsg == "Network Error" && (
        <SingleError error={auth.errorMsg} setError={auth.setErrorMsg} />
      )}

      <>
        <Backdrop open={auth.isLoading || passwordResetMutation.isLoading}>
          <CircularProgress />
        </Backdrop>

        <Grid container spacing={2} py={3} px={1}>
          <Grid item md={12} xs={12}>
            <Box>
              <AppleLogin renderedIn="sign-in" />
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box>
              <FacebookLogin renderedIn="sign-in" />
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box>
              <GoogleLogin renderedIn="sign-in" />
            </Box>
          </Grid>

          {!emailSignIn && (
            <Grid item md={12} xs={12}>
              <Button
                fullWidth
                onClick={openEmailSignIn}
                sx={{
                  py: 1.5,
                  borderRadius: "10px",
                  border: "1px solid #fff",
                  color: "#fff",
                }}
              >
                <SmsIcon color="#fff" />{" "}
                <Box component="span" sx={{ marginLeft: 2 }}>
                  {t.sign_in_email}
                </Box>
              </Button>
            </Grid>
          )}
          <Grid item md={12} xs={12}></Grid>
          <Grid item md={12} xs={12}>
            <Typography color="primary" textAlign="center">
              <Box component="span" color="#fff">
                {t?.dont_have_account}
              </Box>
              <Link href="/sign-up">{t.sign_up}</Link>
            </Typography>
          </Grid>
        </Grid>
        {emailSignIn && (
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            autoComplete="off"
            px={1}
            mt={5}
          >
            <Grid container spacing={2} pb={5}>
              <Grid item md={12} xs={12}>
                {open && (
                  <Alert
                    severity="success"
                    onClose={() => setOpen(false)}
                    variant="filled"
                    elevation={6}
                  >
                    {t?.password_reset_link_sent}
                  </Alert>
                )}
                {auth.errors && (
                  <ErrorStack errors={auth.errors} setErrors={auth.setErrors} />
                )}
                {auth.errors &&
                  (auth.errors as any).code == "verification_failed" && (
                    <ResendVerifyEmail email={formik.values.email} />
                  )}
              </Grid>
              <Grid item md={12} xs={12}>
                <Divider
                  light
                  sx={{ fontSize: 12, color: "#fff", fontWeight: "bold" }}
                >
                  {t.sign_in_email}
                </Divider>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  id="email"
                  variant="outlined"
                  placeholder={t.email}
                  error={
                    formik.errors.email && formik.touched.email ? true : false
                  }
                  {...formik.getFieldProps("email")}
                  name="email"
                />
                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText error>{formik.errors.email} </FormHelperText>
                ) : null}
              </Grid>
              {!isForgot && (
                <Grid item md={12} xs={12} textAlign="center">
                  <TextField
                    id="password"
                    variant="outlined"
                    placeholder={t.password}
                    error={
                      formik.errors.password && formik.touched.password
                        ? true
                        : false
                    }
                    {...formik.getFieldProps("password")}
                    name="password"
                    type={formik.values.showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {formik.values.showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <FormHelperText error>
                      {formik.errors.password}{" "}
                    </FormHelperText>
                  ) : null}
                </Grid>
              )}
              <Grid item md={12} xs={12}>
                <Button
                  color="primary"
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{ py: 2, color: "#fff", borderRadius: "10px" }}
                >
                  {isForgot ? t.reset_password : t.sign_in}
                </Button>
                <Box textAlign="center">
                  <Button
                    onClick={toggleForgot}
                    sx={{
                      ":hover": {
                        background: "none",
                      },
                    }}
                  >
                    {!isForgot ? t?.forgot_password : t?.sign_in}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </>
    </Box>
  );
};

export default SignInForm;
