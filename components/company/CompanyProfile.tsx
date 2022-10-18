import React from "react";
import {
  Box,
  Grid,
  InputLabel,
  TextField,
  FormHelperText,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Radio,
  Slider,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { Field, ErrorMessage } from "formik";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import * as yup from "yup";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

import { createCompanyProfile } from "../../services";
import { useTranslation, useMediaBreakpoints } from "../../hooks";
import { MultiStepForm, FormStep, TextInput } from "../stepper";
import { MediaUploader, ErrorStack } from "../common";

const CompanyProfile = (props: any) => {
  const t = useTranslation();
  const { isMobile } = useMediaBreakpoints();
  const router = useRouter();
  const locale = router.locale;
  const [open, setOpen] = React.useState(false);
  const [entrepreneurName, setEntreprenureName] = React.useState([]);
  const [registrationDoc, setRegistrationDoc] = React.useState();
  const [taxReceipt, setTaxReceipt] = React.useState();
  const [introVideo, setIntroVideo] = React.useState();
  const [errors, setErrors] = React.useState(null);
  const createMutation = useMutation(createCompanyProfile, {
    onSuccess: (data) => {
      router.push("/verification");
    },
    onError: (err: any) => {
      setErrors(err.response.data.companyProfile);
    },
  });

  const steps = [
    {
      name: "Company Information",
      nameVi: "Company Information",
    },
    ...props.questions,
  ];

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const companySchema = yup.object({
    companyProfile: yup.object({
      companyName: yup
        .string()
        .min(3, t?.comapany_name_invalid_length)
        .required(t?.company_name_required_message),
      email: yup
        .string()
        .email(t?.email_invalid_format_message)
        .required(t?.email_required_message),
      phoneNumber: yup
        .string()
        .min(3, t?.phone_number_invalid_length)
        .required(t?.phone_number_required_message),
      address: yup
        .string()
        .min(3, t?.address_invalid_length)
        .required(t?.address_required_message),
      website: yup.string().required(t?.website_required_message),
    }),
  });

  const teamSchema = yup.object({
    "15": yup.string().required(t?.required_message),
    "16": yup.string().required(t?.required_message),
    "17": yup.string().required(t?.required_message),
    "18": yup.string().required(t?.required_message),
    "19": yup.string().required(t?.required_message),
    "20": yup.string().required(t?.required_message),
    "21": yup.string().required(t?.required_message),
    "22": yup.string().required(t?.required_message),
    "23": yup.string().required(t?.required_message),
    "24": yup.string().required(t?.required_message),
  });

  let companyDetails: any = {};
  const companyDetailsInitial = (props.questions as any)?.map(
    (questionClass: any) =>
      questionClass?.questionSet?.map((question: any) => {
        if (
          question.defaultAnswerSet &&
          question.widgetType === "single_choice"
        ) {
          return (companyDetails[question.id] =
            question?.defaultAnswerSet[0]?.answerText);
        } else if (question.widgetType === "slider") {
          return (companyDetails[question.id] = [3000, 5000]);
        } else {
          return (companyDetails[question.id] = "");
        }
      })
  );

  const handleEnterpreneurChange = (tags: any) => {
    setEntreprenureName(tags);
  };

  return (
    <Box sx={{ minHeight: "85vh" }}>
      <Backdrop open={createMutation.isLoading}>
        <CircularProgress />
      </Backdrop>
      <Typography
        variant={isMobile ? "h5" : "h3"}
        textAlign="center"
        color="#fff"
        gutterBottom
      >
        {t.company_profile_creation}
      </Typography>
      {errors && <ErrorStack errors={errors} setErrors={setErrors} />}
      <Snackbar open={open} onClose={() => setOpen(false)}>
        <Alert severity="success">{t?.company_profile_completed}</Alert>
      </Snackbar>
      <MultiStepForm
        initialValues={{
          companyProfile: {
            companyName: "",
            website: "",
            email: "",
            address: "",
            phoneNumber: "",
            github: "",
            registrationDocs: (registrationDoc as any)?.id,
            taxReceipt: (taxReceipt as any)?.id,
            introVideo: (introVideo as any)?.id,
          },
          ...companyDetails,
        }}
        initialTouched={{
          investmentProfile: {
            investorName: true,
          },
          "15": true,
          "3": true,
        }}
        onSubmit={(values) => {
          let { companyProfile, ...other } = values;

          companyProfile = {
            ...companyProfile,
            entrepreneurName:
              entrepreneurName.length > 0 ? entrepreneurName : ["none", "none"],
            registrationDocs: (registrationDoc as any)?.id,
            taxReceipt: (taxReceipt as any)?.id,
            introVideo: (introVideo as any)?.id,
          };
          // Format the questions required for backend
          const companyDetails = Object.keys(other)
            .filter((item) => other[item] != "")
            .map((item) => {
              if (Array.isArray(other[item])) {
                return { question: item, answerText: other[item] };
              } else {
                return { question: item, answerText: [other[item]] };
              }
            });

          createMutation.mutate({ companyProfile, companyDetails });
        }}
      >
        {steps.map((step, index) =>
          index === 0 ? (
            <FormStep
              stepName={locale === "en-US" ? step.name : step.nameVi}
              validationSchema={companySchema}
            >
              <TextInput
                label={t?.company_name}
                name="companyProfile.companyName"
                placeholder={t?.company_name}
                autoFocus={true}
              />
              <Grid item md={12} xs={12} mb={3}>
                <InputLabel htmlFor="companyName" shrink>
                  {t?.enterprenure_label}
                </InputLabel>
                <TagsInput
                  value={entrepreneurName}
                  onChange={(tags: any) => handleEnterpreneurChange(tags)}
                  addKeys={[9, 13]}
                  className="tagsinput"
                  inputProps={{
                    placeholder: "",
                    name: "companyProfile.entrepreneurName",
                  }}
                  maxTags={3}
                  tagProps={{
                    className: "tagsinput_tag",
                    classNameRemove: "tagsinput_tag_remove",
                  }}
                />
                <FormHelperText error>
                  <ErrorMessage name="companyProfile.entrepreneurName" />
                </FormHelperText>
              </Grid>
              <TextInput
                label={t?.website}
                name="companyProfile.website"
                placeholder={t?.website}
              />
              <TextInput
                label={t?.email}
                name="companyProfile.email"
                placeholder={t?.email}
              />
              <TextInput
                label={t?.address}
                name="companyProfile.address"
                placeholder={t?.address}
              />
              <TextInput
                label={t?.phone_number}
                name="companyProfile.phoneNumber"
                placeholder={t?.phone_number}
              />
              <TextInput
                label={t?.github}
                name="companyProfile.github"
                placeholder={t?.github}
              />
              <Grid item md={12} xs={12} my={3}>
                <InputLabel htmlFor="registration-doc" shrink>
                  {t?.upload_registration_doc}
                </InputLabel>
                <MediaUploader
                  id="registration-doc"
                  fileType="image"
                  setEntry={setRegistrationDoc}
                />
              </Grid>
              <Grid item md={12} xs={12} my={3}>
                <InputLabel htmlFor="companyName" shrink>
                  {t?.upload_tax_receipt}
                </InputLabel>
                <MediaUploader
                  id="tax-receipt"
                  fileType="image"
                  setEntry={setTaxReceipt}
                />
              </Grid>
              <Grid item md={12} xs={12} my={3}>
                <InputLabel htmlFor="introduction-video" shrink>
                  {t?.upload_into_vedio}
                </InputLabel>
                <MediaUploader
                  id="introduction-video"
                  fileType="video"
                  setEntry={setIntroVideo}
                />
              </Grid>
            </FormStep>
          ) : (
            <FormStep
              stepName={locale === "en-US" ? step.name : step.nameVi}
              validationSchema={index === 1 && teamSchema}
            >
              {(step as any).questionSet?.map((question: any) => (
                <Grid
                  item
                  md={12}
                  xs={12}
                  my={question.widgetType === "input_text" ? 0 : 3}
                  key={question.questionCode}
                >
                  {/* <InputLabel htmlFor={question.id} shrink>
                    {locale === "en-US" ? question.text : question.textVi}
                  </InputLabel> */}
                  <Box fontSize={14} lineHeight={2} color="#bbc0c8">
                    {locale === "en-US" ? question.text : question.textVi}
                  </Box>
                  {question.widgetType === "input_text" ? (
                    <TextInput name={question.id} />
                  ) : question.widgetType === "multiple_choice" ? (
                    <FormGroup id={question.questionCode}>
                      {question.defaultAnswerSet.map((answer: any) => (
                        <FormControlLabel
                          key={answer.answerText}
                          control={
                            <Field
                              name={question.id}
                              value={
                                locale === "en-US"
                                  ? answer.answerText
                                  : answer.answerTextVi
                              }
                              type="checkbox"
                              as={Checkbox}
                            />
                          }
                          label={
                            locale === "en-US"
                              ? answer.answerText
                              : answer.answerTextVi
                          }
                        />
                      ))}
                    </FormGroup>
                  ) : question.widgetType === "single_choice" ? (
                    <FormGroup id={question.questionCode}>
                      {question.defaultAnswerSet.map((answer: any) => (
                        <FormControlLabel
                          key={answer.answerText}
                          control={
                            <Field
                              name={question.id}
                              value={
                                locale === "en-US"
                                  ? answer.answerText
                                  : answer.answerTextVi
                              }
                              type="radio"
                              as={Radio}
                            />
                          }
                          label={
                            locale === "en-US"
                              ? answer.answerText
                              : answer.answerTextVi
                          }
                        />
                      ))}
                    </FormGroup>
                  ) : question.widgetType === "slider" ? (
                    <Field
                      name={question.id}
                      id={question.questionCode}
                      as={Slider}
                      disableSwap
                      valueLabelDisplay="on"
                      max={10000}
                      min={0}
                      valueLabelFormat={(value: any) => `$ ${value}`}
                      step={1000}
                      sx={{ m: 2 }}
                    />
                  ) : null}
                </Grid>
              ))}
            </FormStep>
          )
        )}
      </MultiStepForm>
    </Box>
  );
};

export default CompanyProfile;
