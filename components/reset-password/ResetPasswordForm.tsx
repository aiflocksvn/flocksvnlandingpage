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
import { ErrorStack, SingleError } from "../common";
import { VisibilityIcon, VisibilityOffIcon } from "../icons";
import { confirmPasswordReset } from "../../services";

const ResetPasswordForm = () => {
  const t = useTranslation();
  const auth: any = useAuth();
  const router = useRouter();
  const token: any = router.query.token;
  const [errors, setErrors] = React.useState({});
  const [errorMsg, setErrorMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const confirmPassworMutation = useMutation(confirmPasswordReset, {
    onError: (err: any) => {
      setErrorMsg(err.message);
      setErrors(err.response.data);
    },
    onSuccess: (data) => {
      setOpen(true);
      router.push("/sign-in");
    },
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      showPassword: false,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(7, t.new_password_invalid_length_message)
        .required(t.new_password_required_message),
    }),
    onSubmit: async (values) => {
      confirmPassworMutation.mutate({
        password: values.password,
        token: token,
      });
    },
  });

  const handleClickShowPassword = () => {
    formik.setFieldValue("showPassword", !formik.values.showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    setErrors({});
  }, []);

  return (
    <Box sx={{ height: "85vh" }} pt={10}>
      <Typography variant="h4" textAlign="center" color={"#fff"} gutterBottom>
        {t?.reset_password}
      </Typography>
      {auth.errorMsg && auth.errorMsg == "Network Error" && (
        <SingleError error={auth.errorMsg} setError={auth.setErrorMsg} />
      )}

      <>
        <Backdrop open={confirmPassworMutation.isLoading}>
          <CircularProgress />
        </Backdrop>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="success" variant="filled" elevation={6}>
            {t?.password_reset_success}
          </Alert>
        </Snackbar>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          autoComplete="off"
          px={1}
          mt={3}
        >
          <Grid container spacing={2} pb={5}>
            <Grid item md={12} xs={12}>
              {errors && <ErrorStack errors={errors} setErrors={setErrors} />}
            </Grid>
            <Grid item md={12} xs={12} textAlign="center">
              <TextField
                id="password"
                variant="outlined"
                placeholder={t.new_password}
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
                <FormHelperText error>{formik.errors.password} </FormHelperText>
              ) : null}
            </Grid>
            <Grid item md={12} xs={12}>
              <Button
                color="primary"
                fullWidth
                variant="contained"
                type="submit"
                sx={{ py: 2, color: "#fff", borderRadius: "10px" }}
              >
                {t?.submit}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </>
    </Box>
  );
};

export default ResetPasswordForm;
