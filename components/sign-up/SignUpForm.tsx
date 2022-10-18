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
import { useMutation, useQueryClient } from "react-query";

import { useAppTheme, useTranslation } from "../../hooks/";
import {
  AppPapper,
  ErrorStack,
  SingleError,
  GoogleLogin,
  FacebookLogin,
  AppleLogin,
} from "../common";
import {
  PersonIcon,
  LockIcon,
  SmsIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "../icons";
import { signUpWithEmail } from "../../services/";
import { VerifyMessageSentBox } from "../verify";

const SignUpForm = () => {
  const theme = useAppTheme();
  const t = useTranslation();
  const router = useRouter();
  const [emailSignUp, setEmailSignUp] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [errStatus, setErrStatus] = React.useState();
  const [errorMsg, setErrorMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const mutation = useMutation(signUpWithEmail, {
    onError: (err: any) => {
      setErrStatus(err.response.status);
      setErrorMsg(err.message);
      setErrors(err.response.data);
    },
    onSuccess: (data) => {
      setOpen(true);
      setIsSuccess(true);
    },
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      showPassword: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, t.first_name_invalid_length_message)
        .required(t.first_name_required_message),
      lastName: Yup.string()
        .min(3, t.last_name_invalid_length_message)
        .required(t.last_name_required_message),
      email: Yup.string()
        .email(t.email_invalid_format_message)
        .required(t.email_required_message),
      password: Yup.string()
        .min(8, t.password_invalid_length_message)
        .required(t.password_required_message),
    }),
    onSubmit: async (values) => {
      const newValues = { ...values, email: values.email.toLowerCase() };
      await mutation.mutate(newValues);
    },
  });

  const handleClickShowPassword = () => {
    formik.setFieldValue("showPassword", !formik.values.showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const openEmailSignUp = () => {
    setEmailSignUp(true);
  };

  React.useEffect(() => {
    setErrors({});
  }, []);

  React.useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [emailSignUp]);

  return (
    <Grid item md={isSuccess ? 6 : 3} xs={12}>
      <Box sx={{ minHeight: "85vh" }}>
        {isSuccess ? (
          <VerifyMessageSentBox email={formik.values.email} />
        ) : (
          <>
            <Typography
              variant="h3"
              textAlign="center"
              color={"#fff"}
              gutterBottom
            >
              {t?.sign_up}
            </Typography>

            <>
              <Backdrop open={mutation.isLoading}>
                <CircularProgress />
              </Backdrop>

              <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={() => setOpen(false)}
              >
                <Alert severity="success" variant="filled" elevation={6}>
                  {t?.sign_up_success}
                </Alert>
              </Snackbar>
              <Grid container spacing={2} py={3} px={1}>
                <Grid item md={12} xs={12}>
                  <Box>
                    <AppleLogin renderedIn="sign-up" />
                  </Box>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Box>
                    <FacebookLogin renderedIn="sign-up" />
                  </Box>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Box>
                    <GoogleLogin renderedIn="sign-up" />
                  </Box>
                </Grid>

                {!emailSignUp && (
                  <Grid item md={12} xs={12}>
                    <Button
                      fullWidth
                      onClick={openEmailSignUp}
                      sx={{
                        py: 1.5,
                        borderRadius: "10px",
                        border: "1px solid #fff",
                        color: "#fff",
                      }}
                    >
                      <SmsIcon color="#fff" />{" "}
                      <Box component="span" sx={{ marginLeft: 2 }}>
                        {t.sign_up_email}
                      </Box>
                    </Button>
                  </Grid>
                )}
                <Grid item md={12} xs={12}>
                  <Typography
                    sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: 11 }}
                  >
                    {t.agree_to_privacy}
                  </Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Typography color="primary" textAlign="center">
                    <Box component="span" color="#fff">
                      {t?.already_have_account}
                    </Box>
                    <Link href="/sign-in">{t.sign_in}</Link>
                  </Typography>
                </Grid>
              </Grid>
              {emailSignUp && (
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
                      {errorMsg && errorMsg == "Network Error" && (
                        <SingleError error={errorMsg} setError={setErrorMsg} />
                      )}
                      {errors && (
                        <ErrorStack
                          errors={errors}
                          setErrors={setErrors}
                          errStatus={errStatus}
                          setErrStatus={setErrStatus}
                        />
                      )}
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <Divider
                        light
                        sx={{ fontSize: 12, color: "#fff", fontWeight: "bold" }}
                      >
                        {t.sign_up_email}
                      </Divider>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="firstName"
                        variant="outlined"
                        placeholder={t.first_name}
                        error={
                          formik.errors.firstName && formik.touched.firstName
                            ? true
                            : false
                        }
                        {...formik.getFieldProps("firstName")}
                        name="firstName"
                        autoFocus
                      />
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <FormHelperText error>
                          {formik.errors.firstName}{" "}
                        </FormHelperText>
                      ) : null}
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="lastName"
                        variant="outlined"
                        placeholder={t.last_name}
                        error={
                          formik.errors.lastName && formik.touched.lastName
                            ? true
                            : false
                        }
                        {...formik.getFieldProps("lastName")}
                        name="lastName"
                      />
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <FormHelperText error>
                          {formik.errors.lastName}{" "}
                        </FormHelperText>
                      ) : null}
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="email"
                        variant="outlined"
                        placeholder={t.email}
                        error={
                          formik.errors.email && formik.touched.email
                            ? true
                            : false
                        }
                        {...formik.getFieldProps("email")}
                        name="email"
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <FormHelperText error>
                          {formik.errors.email}{" "}
                        </FormHelperText>
                      ) : null}
                    </Grid>
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
                    <Grid item md={12} xs={12}>
                      <Button
                        color="primary"
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={mutation.isLoading}
                        sx={{ py: 2, color: "#fff", borderRadius: "10px" }}
                      >
                        {t.sign_up}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </>
          </>
        )}
      </Box>
    </Grid>
  );
};

export default SignUpForm;
