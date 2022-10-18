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
  Typography,
} from "@mui/material";
import { Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

import { createInvestmentProfile } from "../../services";
import { useTranslation, useMediaBreakpoints } from "../../hooks";
import { MultiStepForm, FormStep, TextInput } from "../stepper";
import { InvestorSchema, areasOfInteresSchema } from "./ValidationSchema";

const InvestorProfile = (props: any) => {
  const t = useTranslation();
  const { isMobile } = useMediaBreakpoints();
  const router = useRouter();
  const locale = router.locale;
  const queryClient = useQueryClient();
  const createMutation = useMutation(createInvestmentProfile, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("userProfile");
      router.push("/verification");
    },
    onError: (err) => {},
  });

  const steps = [
    {
      name: "Investor Information",
      nameVi: "Investor Information",
    },
    ...props.questions,
  ];

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  let investmentDetails: any = {};
  const investmentDetailsInitial = (props.questions as any)?.map(
    (questionClass: any) =>
      questionClass?.questionSet?.map((question: any) => {
        if (
          question.defaultAnswerSet &&
          question.widgetType === "single_choice"
        ) {
          return (investmentDetails[question.id] =
            question?.defaultAnswerSet[0]?.answerText);
        } else if (question.widgetType === "slider") {
          return (investmentDetails[question.id] = [3000, 5000]);
        } else {
          return (investmentDetails[question.id] = "");
        }
      })
  );

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
        {t.investor_profile_creation}
      </Typography>
      <MultiStepForm
        initialValues={{
          investmentProfile: {
            investorName: "",
            investorEmail: "",
            investorPhone: "",
            investorAddress: "",
            investorIdNumber: "",
          },
          ...investmentDetails,
        }}
        initialTouched={{
          investmentProfile: {
            investorName: true,
          },
          "1": true,
          "3": true,
        }}
        onSubmit={(values) => {
          const { investmentProfile, ...other } = values;

          // Format the questions required for backend
          const investmentDetails = Object.keys(other)
            .filter((item) => other[item] != "")
            .map((item) => {
              if (Array.isArray(other[item])) {
                return { question: item, answerText: other[item] };
              } else {
                return { question: item, answerText: [other[item]] };
              }
            });

          createMutation.mutate({ investmentProfile, investmentDetails });
        }}
      >
        {steps.map((step, index) =>
          index === 0 ? (
            <FormStep
              stepName={locale === "en-US" ? step.name : step.nameVi}
              validationSchema={InvestorSchema}
            >
              <TextInput
                label={t?.investor_name}
                name="investmentProfile.investorName"
                placeholder={t?.investor_name}
                autoFocus={true}
              />
              <TextInput
                label={t?.email}
                name="investmentProfile.investorEmail"
                placeholder={t?.email}
              />
              <TextInput
                label={t?.phone_number}
                name="investmentProfile.investorPhone"
                placeholder={t?.phone_number}
              />
              <TextInput
                label={t?.address}
                name="investmentProfile.investorAddress"
                placeholder={t?.address}
              />
              <TextInput
                label={t?.id_number}
                name="investmentProfile.investorIdNumber"
                placeholder={t?.address}
              />
            </FormStep>
          ) : (
            <FormStep
              stepName={locale === "en-US" ? step.name : step.nameVi}
              validationSchema={index === 1 && areasOfInteresSchema}
            >
              {(step as any).questionSet?.map((question: any) => (
                <Grid item md={12} xs={12} my={3} key={question.questionCode}>
                  {/* <InputLabel
                    htmlFor={question.id}
                    shrink
                    sx={{ mb: question.widgetType === "slider" ? 2 : 0 }}
                  >
                    {locale === "en-US" ? question.text : question.textVi}
                  </InputLabel> */}
                  <Box fontSize={14} lineHeight={2} color="#bbc0c8">
                    {locale === "en-US" ? question.text : question.textVi}
                  </Box>
                  {question.widgetType === "input_text" ? (
                    <Field name={question.id} id={question.id} as={TextField} />
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
                  <FormHelperText error>
                    <ErrorMessage name={question.id} />
                  </FormHelperText>
                </Grid>
              ))}
            </FormStep>
          )
        )}
      </MultiStepForm>
    </Box>
  );
};

export default InvestorProfile;
