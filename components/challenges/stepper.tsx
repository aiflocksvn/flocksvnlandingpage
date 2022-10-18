import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { DropzoneUploader, MediaUploader } from "../common";
import { Camera } from "../icons";
import { useMutation } from "react-query";
import { UPDATE_CHALLENGE } from "../../services/challenges";
import { useTranslation } from "../../hooks";
import { useRouter } from "next/router";
import { Backdrop, CircularProgress } from "@mui/material";
import axiosInstance from "../../services/axiosWithAuth";
import { remoteApiRoutes } from "../../utils/constants";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

interface IProps {
  challenges: any[];
  closeModalFunction?: () => void;
  activeStep: number;
}

export default function ChallengeStepper(props: IProps) {
  const t = useTranslation();
  const router = useRouter();
  // const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [answerTextState, setAnswerTextState] = React.useState<any>([]);
  const [challengeQuestion, setChallengeQuestion] = React.useState<any>([]);
  const [backdropState, setBackdropState] = React.useState(false);

  const isStepOptional = (step: any) => {
    return step === 1;
  };
  React.useEffect(() => {
    setChallengeQuestion(props.challenges);
  }, []);

  const isStepSkipped = (step: any) => {
    return skipped.has(step);
  };

  // const handleNext = () => {
  //   // let newSkipped = skipped;
  //   // if (isStepSkipped(activeStep)) {
  //   //   newSkipped = new Set(newSkipped.values());
  //   //   newSkipped.delete(activeStep);
  //   // }
  //   if (activeStep === challengeQuestion?.length - 1) return;
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   // setSkipped(newSkipped);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const handleSelectAnswerQuestion = (event: React.MouseEvent) => {
    const id = event.currentTarget.id;

    const selectAnswer = challengeQuestion?.map((item: any, index: number) => {
      if (index === props?.activeStep) {
        const answers = item?.answerText?.map((items: any) => {
          if (
            challengeQuestion?.[props?.activeStep]?.questionType ===
              "single_choice" ||
            challengeQuestion?.[props?.activeStep]?.questionType === "boolean"
          ) {
            if (items?.value === id) {
              return {
                ...items,
                selected:
                  items?.selected === "undefined" ? true : !items?.selected,
              };
            } else {
              return {
                ...items,
                selected: false,
              };
            }
          } else {
            if (items?.value === id) {
              return {
                ...items,
                selected: true,
              };
            } else return items;
          }
        });
        return {
          ...item,
          answerText: answers,
        };
      } else return item;
    });
    setAnswerTextState(selectAnswer);
    setChallengeQuestion(selectAnswer);
  };

  const handleChangeAnswer = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.currentTarget?.value;

    const addAnswer = challengeQuestion?.map((item: any, index: number) => {
      //@ts-ignore
      if (parseInt(props?.activeStep) === index) {
        return {
          ...item,
          userAnswer: value,
        };
      } else return item;
    });
    setChallengeQuestion(addAnswer);
  };

  // const createMutation = useMutation(UPDATE_CHALLENGE, {
  //   onSuccess: (data) => {
  //     // router.push("/verification");
  //   },
  //   onError: (err: any) => {
  //     setErrors(err.response.data.companyProfile);
  //   },
  // });
  const { mutate: handleUpdateChange } = useMutation(UPDATE_CHALLENGE, {
    onSuccess: (data: any) => {
      if (props?.closeModalFunction) props.closeModalFunction();

      setBackdropState(false);
    },
    onError: (err: any) => {
      setBackdropState(false);
    },
  });
  const handleAnswerChallenge = () => {
    setBackdropState(true);
    const answers = challengeQuestion?.map((item: any) => {
      if (
        item?.questionType === "single_choice" ||
        item?.questionType === "boolean"
      ) {
        const filterAnswer = item?.answerText?.filter((fil: any) => {
          return fil.selected;
        });
        return {
          question: item.id,
          answer: filterAnswer?.[0]?.value,
        };
      } else {
        return {
          ...(item?.useAnswer ? { answer: item?.userAnswer } : {}),
          ...(item?.attachment ? { attachment: item?.attachment } : {}),
          question: item?.id,
        };
      }
    });
    // {
    //   "answers": [
    //     {
    //       "answer": "quis",
    //       "question": 24725944,
    //       "attachment": "urn:uuid:83dd9afa-f8f1-a2d6-8a1a-7177657ba57b"
    //     },
    //     {
    //       "answer": "nostrud ad adipisicing in",
    //       "question": 64926775,
    //       "attachment": "urn:uuid:b2721a2c-eb68-2593-90d6-b0c449022f24"
    //     }
    //   ],
    //   "challenge": 27767540
    // }
    const variables = {
      challenge: challengeQuestion?.[0]?.challenge,
      answers,
    };

    //
    handleUpdateChange(variables);
  };

  const handelGetFile = async (image: any) => {
    // setBackdropState(true);

    console.log("image ffffffffffffff" , image)
    // return 
    // const formData = new FormData();
    // formData.append("file", image);

    // const { data } = await axiosInstance.post(
    //   remoteApiRoutes.mediaUpload,
    //   formData,
    //   {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //     },
    //   }
    // );

    const addAnswer = challengeQuestion?.map((item: any, index: number) => {
      //@ts-ignore
      if (parseInt(props?.activeStep) === index) {
        return {
          ...item,
          attachment: image?.id,
        };
      } else return item;
    });
    setChallengeQuestion(addAnswer);
    // setBackdropState(false);
  };

  return (
    <Box sx={{ width: "100%", paddingTop: "2rem" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropState}
        // onClick={handleClose}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      {challengeQuestion?.length > 1 && (
        <Stepper
          activeStep={props?.activeStep}
          sx={{ justifyContent: "center" }}
        >
          {challengeQuestion?.map((label: any, index: number) => {
            const stepProps = {};
            const labelProps = {};
            //   if (isStepOptional(index)) {
            //     //@ts-ignore
            //     labelProps.optional = (
            //       <Typography variant="caption">Optional</Typography>
            //     );
            //   }
            if (isStepSkipped(index)) {
              //@ts-ignore
              stepProps.completed = false;
            }
            return (
              <Step key={label?.title} {...stepProps}>
                <StepLabel {...labelProps}>{/* {label} */}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}
      {/* {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : ( */}
      <React.Fragment>
        <Box marginTop={"4rem"}>
          <Box
            sx={{
              fontSize: "16px",
              color: "#A3A5B4",
              marginBottom: "0.5rem",
            }}
          >
            {t.question}
          </Box>
          <Box
            sx={{
              backgroundColor: "#040637",
              padding: "0.5rem",
              borderRadius: "5px",
              color: "#FFFFFF",
              marginBottom: "1.5rem",
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html:
                  router.locale === "en"
                    ? challengeQuestion?.[props?.activeStep]?.title
                    : challengeQuestion?.[props?.activeStep]?.titleVi,
              }}
            />
          </Box>
          <Box
            sx={{
              fontSize: "16px",
              color: "#A3A5B4",
              marginBottom: "0.5rem",
              display: "grid",
              gridTemplateColumns: "auto auto",
              justifyContent: "space-between",
            }}
          >
            {t.answer}
            {challengeQuestion?.[props?.activeStep]?.challengeType !==
              "attachment" && (
              <span>
                {challengeQuestion?.[props?.activeStep]?.questionType}
              </span>
            )}
          </Box>
          {challengeQuestion?.[props?.activeStep]?.questionType ===
            "input_text" &&
            challengeQuestion?.[props?.activeStep]?.challengeType !==
              "attachment" && (
              <Box>
                <TextField
                  sx={{
                    backgroundColor: "#040637",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                  }}
                  id="filled-multiline-static"
                  // label="Multiline"
                  multiline
                  rows={4}
                  placeholder={"Write Answer"}
                  variant="standard"
                  onChange={handleChangeAnswer}
                  value={
                    challengeQuestion?.[props?.activeStep]?.userAnswer || ""
                  }
                />
              </Box>
            )}
          {challengeQuestion?.[props?.activeStep]?.questionType === "link" && (
            <Box>
              <TextField
                type="text"
                variant="outlined"
                fullWidth={true}
                onChange={handleChangeAnswer}
                value={challengeQuestion?.[props?.activeStep]?.userAnswer || ""}
              />
            </Box>
          )}
          {challengeQuestion?.[props?.activeStep]?.challengeType ===
            "attachment" && (
            <Box width={"40%"} marginTop="1rem">
              {/* <DropzoneUploader
                Icon={<Camera color={"C4C4C4"} />}
                name={"Upload"}
                getFile={handelGetFile}
                
              /> */}
              {/* <UploadFile
                Icon={<Camera color={"C4C4C4"} />}
                name={"Upload"}
                getFile={handelGetFile}
              /> */}
              <MediaUploader 
              id="registration-doc"
              fileType="image"
              setEntry={handelGetFile}
              />
            </Box>
          )}
          {(challengeQuestion?.[props?.activeStep]?.questionType ===
            "single_choice" ||
            challengeQuestion?.[props?.activeStep]?.questionType ===
              "boolean") && (
            <Box>
              {challengeQuestion?.[props?.activeStep]?.answerText?.map(
                (item: any) => {
                  return (
                    <Box
                      key={item?.value}
                      id={item.value}
                      sx={{
                        background: item.selected ? "#A8C301" : "#FFF",
                        color: item?.selected ? "#FFF" : "#393E65",
                        padding: "0.5rem 1rem",
                        borderRadius: "5px",
                        margin: " 0.5rem 0",
                        cursor: "pointer",
                      }}
                      onClick={handleSelectAnswerQuestion}
                    >
                      {item.value}
                    </Box>
                  );
                }
              )}
            </Box>
          )}
        </Box>
        {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            pt: 2,
            justifyContent: "space-between",
            marginTop: "2rem",
          }}
        >
          {/* <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            {t.back}
          </Button> */}

          {props?.activeStep === challengeQuestion?.length - 1 && (
            <Button
              variant="contained"
              onClick={handleAnswerChallenge}
              disabled={!(props?.activeStep === challengeQuestion?.length - 1)}
              sx={{
                padding: "0.5rem 4rem",
                margin: "0 auto",
                backgroundColor: "#A8C301",
              }}
            >
              {t.save}
            </Button>
          )}

          {/* <Button
              onClick={handleNext}
              disabled={activeStep === challengeQuestion?.length - 1}
            >
              {t.next}
            </Button> */}
        </Box>
      </React.Fragment>
      {/* )} */}
    </Box>
  );
}
