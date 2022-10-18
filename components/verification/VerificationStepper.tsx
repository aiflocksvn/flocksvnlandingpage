import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Container,
  Typography,
  Button,
  StepContent,
  Grid,
  styled,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import Webcam from "react-webcam";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { useTranslation, useAppTheme, useMediaBreakpoints } from "../../hooks";
import { ColorlibConnector, ColorlibStepIcon } from "./ColorlibStep";
import { DropzoneUploader, ErrorStack } from "../../components/common";
import { SelfieImage, FrontImage, BackImage, Confirmed } from "../icons";
import {
  checkUserVerificationStatus,
  uploadVerificationId,
} from "../../services";
import { b64toBlob, dataURLtoFile } from "../../utils/functions";
import { getUserType } from "../../utils/storage";

const ImageCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  border: "1px dashed #fff",
  padding: "100px 20px",
  margin: 10,
  borderRadius: 10,
  textAlign: "center",
}));

const VerificationStepper = () => {
  const t = useTranslation();
  const theme = useAppTheme();
  const router = useRouter();
  const userType = getUserType();
  const { isMobile } = useMediaBreakpoints();
  const webcamRef = React.useRef(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isFailed, setIsFailed] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [verificationImages, setVerificationImages] = React.useState({
    livenessImg: null,
    capturedLivenessImg: null,
    frontImg: null,
    backImg: null,
  });
  const [errors, setErrors] = React.useState<any>({
    livenessImg: null,
    frontImg: null,
  });
  const [serverErrors, setServerErrors] = React.useState({});
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery(
    "userVerificationStatus",
    checkUserVerificationStatus
  );
  const mutation = useMutation(uploadVerificationId, {
    onSuccess: (data) => {
      const verificationStatus = data.data.verificationStatus;
      if (verificationStatus === "failed") {
        setIsFailed(true);
      }
      queryClient.invalidateQueries("userVerificationStatus");
      setActiveStep(2);
    },
    onError: (err: any) => {
      setServerErrors(err.response.data);
    },
  });

  const steps = [
    {
      label: t?.selfie_photo,
      icon: "icon",
    },
    {
      label: t?.id_photo,
      icon: "icon",
    },
    {
      label: t?.confirm,
      icon: "icon",
    },
  ];

  React.useEffect(() => {
    setTimeout(() => {
      setErrors({ livenessImg: null, frontImg: null });
    }, 5000);
  }, [errors]);

  const handleNext = () => {
    if (activeStep === 0 && verificationImages.livenessImg === null) {
      setErrors((prev: any) => ({
        ...prev,
        livenessImg: t.liveness_img_required_message,
      }));
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setVerificationImages((prev) => ({ ...prev }));
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    router.push("/challenges");
  };

  const handleCaptureOpen = () => {
    setOpen(true);
  };

  const handleCapture = React.useCallback(async () => {
    let imgSrc = (webcamRef as any).current.getScreenshot();
    // console.log(imgSrc);
    const binary = dataURLtoFile(imgSrc);
    setVerificationImages((prev: any) => ({
      ...prev,
      livenessImg: imgSrc,
      capturedLivenessImg: binary,
    }));
    setOpen(false);
  }, [webcamRef, setVerificationImages]);

  const handleCaptureCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (verificationImages.frontImg === null) {
      setErrors((prev: any) => ({
        ...prev,
        FrontImage: t.front_img_required_message,
      }));
      return;
    }
    await mutation.mutate(verificationImages);
  };

  const handleRetry = () => {
    setActiveStep(0);
    setIsFailed(false);
    setVerificationImages({
      livenessImg: null,
      capturedLivenessImg: null,
      frontImg: null,
      backImg: null,
    });
  };

  if (isLoading) {
    return (
      <Grid container textAlign="center" sx={{ minHeight: "85vh" }}>
        <Grid item md={3} xs={0}></Grid>
        <Grid item md={6} xs={12}>
          <Paper>
            <Backdrop open>
              <CircularProgress />
            </Backdrop>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  if (data?.data.verificationStatus === "done") {
    return (
      <Grid container textAlign="center" sx={{ minHeight: "85vh" }} py={5}>
        <Grid item md={3} xs={0}></Grid>
        <Grid item md={6} xs={12}>
          <Paper>
            <Box py={5}>
              <Confirmed />
              <Typography py={2} color="gray.main">
                {t?.passport_verified_success}
              </Typography>
              <Link href="/challenges" passHref>
                <Button variant="contained">{t?.continue}</Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  return (
    <Box sx={{ minHeight: "85vh" }}>
      <Typography textAlign="center" variant="h3" color="#fff">
        {t?.id_verification}
      </Typography>
      <Backdrop open={mutation.isLoading}>
        <CircularProgress
          sx={{
            position: "absolute",
            bottom: "50%",
            my: 10,
          }}
        />
        <Typography py={5} px={1} variant="h6" color="#fff" textAlign="center">
          {t?.passport_patient_text1}
          <br /> {t?.passport_patient_text2}
        </Typography>
      </Backdrop>

      {serverErrors && (
        <ErrorStack errors={serverErrors} setErrors={setServerErrors} />
      )}

      <Container maxWidth="md">
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ py: 5 }}
          connector={<ColorlibConnector />}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={ColorlibStepIcon}
                sx={{
                  background: "transparent",
                  color: "green",
                }}
              >
                <Box>{step.label}</Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        {errors && <ErrorStack errors={errors} setErrors={setErrors} />}
      </Container>
      {activeStep === 0 ? (
        <>
          <Typography pb={2} color="gray.main" textAlign="center">
            {t.choose_photo}
          </Typography>
          <Grid container textAlign="center" spacing={2} pb={10}>
            <Grid item md={4.5} xs={3}></Grid>
            <Grid item md={3} xs={6}>
              <DropzoneUploader
                name="livenessImg"
                icon={SelfieImage}
                file={verificationImages.livenessImg}
                setFile={(file: any) =>
                  setVerificationImages((prev) => ({
                    ...prev,
                    livenessImg: file,
                  }))
                }
                height={250}
              />
              {!isMobile && (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleCaptureOpen}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.gray.main,
                    mt: 3,
                    border: `1px solid ${theme.palette.gray.main}`,
                    ":hover": {
                      backgroundColor: theme.palette.secondary.main,
                    },
                  }}
                >
                  {t.capture}
                </Button>
              )}
            </Grid>
            <Dialog open={open}>
              <DialogContent>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={300}
                  height={300}
                  style={{ borderRadius: 10 }}
                />
              </DialogContent>
              <DialogActions
                sx={{
                  dispaly: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 0,
                  marignTop: 0,
                }}
              >
                <Button onClick={handleCaptureCancel} fullWidth>
                  {t.cancel}
                </Button>
                <Button onClick={handleCapture} fullWidth variant="contained">
                  {t.capture}
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </>
      ) : activeStep === 1 ? (
        <>
          <Typography pb={2} color="gray.main" textAlign="center">
            {t.choose_photo}
          </Typography>
          <Grid container textAlign="center" spacing={2} pb={10}>
            <Grid item md={4} xs={12}>
              <Typography py={1} color="gray.main">
                {t?.front}
              </Typography>
              <DropzoneUploader
                name="frontImg"
                icon={FrontImage}
                file={verificationImages.frontImg}
                setFile={(file: any) =>
                  setVerificationImages((prev) => ({
                    ...prev,
                    frontImg: file,
                  }))
                }
              />
            </Grid>
            <Grid item md={4}></Grid>
            <Grid item md={4} xs={12}>
              <Typography py={1} color="gray.main">
                {t?.back}
              </Typography>
              <DropzoneUploader
                name="backImg"
                icon={BackImage}
                file={verificationImages.backImg}
                setFile={(file: any) =>
                  setVerificationImages((prev) => ({ ...prev, backImg: file }))
                }
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid container textAlign="center" pb={10}>
          <Grid item md={3} xs={0}></Grid>
          <Grid item md={6} xs={12}>
            {isFailed ? (
              <Paper>
                <Box py={5}>
                  <Typography
                    variant={isMobile ? "h6" : "h4"}
                    py={2}
                    color="gray.main"
                  >
                    {t?.passport_verification_failed}
                  </Typography>
                  <Button variant="contained" onClick={handleRetry}>
                    {t?.retry}
                  </Button>
                </Box>
              </Paper>
            ) : (
              <Paper>
                <Box py={5}>
                  <Confirmed />
                  <Typography py={2} color="gray.main">
                    {t?.passport_verified_success}
                  </Typography>
                  <Link href={"/challenges"} passHref>
                    <Button variant="contained">{t?.continue}</Button>
                  </Link>
                </Box>
              </Paper>
            )}
          </Grid>
        </Grid>
      )}
      {activeStep < 2 && (
        <Grid container>
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="outlined"
              disabled={activeStep === 0 || mutation.isLoading}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              {t.previous}
            </Button>
          </Grid>
          <Grid item xs={4} md={5}></Grid>
          <Grid item xs={2} md={1}>
            <Button onClick={handleSkip} sx={{ mr: 1 }}>
              {t.skip}
            </Button>
          </Grid>
          <Grid item xs={3}>
            {activeStep === steps.length - 2 ? (
              <Button
                onClick={handleSubmit}
                variant="contained"
                fullWidth
                disabled={mutation.isLoading}
                sx={{ color: "#000" }}
              >
                {t.confirm}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                variant="contained"
                fullWidth
                sx={{ color: "#000" }}
              >
                {t.next}
              </Button>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default VerificationStepper;
