import React, { useState } from "react";
import { Box, Typography, styled, Backdrop, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide } from "@mui/material";

import { ChallengeLock, ChallengePending, Close, Field, Passed } from "../icons";
import ChallengeNumber from "./ChallengeNumber";
import { useMediaBreakpoints, useTranslation } from "../../hooks";
import axiosInstance from "../../services/axiosWithAuth";
import { apiRoutes } from "../../utils/constants";
import ChallengeStepper from "./stepper";

const Transition = React.forwardRef(function Transition(props, ref) {
  //@ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});
const ChallengeContainer = styled(Box)(({ theme }) => ({
  padding: 10,
  borderRadius: 10,
}));
const ChallengeItem = ({
  challengeNumber,
  imgSrc,
  text,
  isLocked,
  day,
  dayStatus
}: {
  challengeNumber: number;
  imgSrc: string;
  text: string;
  isLocked: boolean;
  day:any,
  dayStatus:any
}) => {
  const { isMobile } = useMediaBreakpoints();
  const t = useTranslation();
  const [isClicked, setIsClicked] = React.useState(false);
  const [startChallenge, setStartChallenge] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [challengeQuestionState, setChallengeQuestionState] = useState<any[]>(
    []
  );
  const [challengeData, setChallengeData] = useState<any>(null);
  const [backdropState, setBackdropState] = useState(false);
  const [activeStep , setActiveStep] = useState(0)

  const getChallengeFunction = async () => {
    const { data } = await axiosInstance.get(
      apiRoutes.challengeList +
        `${day}/challenge_options/?expand=challenge_question`
    );

    return data;
  };

  const handleClick = async () => {
    setIsClicked(true);
    if (dayStatus !== "OPEN") return
    // if (isLocked) return;
    // if (
    //   dayStatus === "pending" ||
    //   dayStatus === "passed" ||
    //   dayStatus === "failed"
    // )
    //   return;

    setBackdropState(true);
    const challengeQuestion = await getChallengeFunction();
    setChallengeData(challengeQuestion);
    //@ts-ignore
    setChallengeQuestionState(challengeQuestion?.challengeQuestion);
    setOpenDialog(true);
    setBackdropState(false);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  }, [isClicked]);

  
  const handleClose = () => {
    
    setOpenDialog(!openDialog);
  };

  return (
    <Box height={isMobile ? "13rem" : "18rem"}>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: "fixed",
          top: 0,
          bottom: 0,
          // right: isMobile ? 75 : -50,
        }}
        open={backdropState}
        // onClick={handleClose}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      
      <Dialog
        open={openDialog}
        //@ts-ignore
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth={"md"}
      //  sx={{width:"800px"}}
        // sx={{width:isMobile ? "300px":"500px"}}
      >
        <DialogTitle
          sx={{
            display: "grid",
            gridTemplateColumns: challengeData?.title ? "auto auto auto" :"auto auto",
            justifyContent: "space-between",
            // marginTop: "1rem",
            gap: isMobile ? "2rem" : "10rem",
            borderBottom: "1px solid #ffffff2e"
          }}
        >
          {" "}
          <Box fontWeight={"normal"} fontSize="12px" color={"#AFAFAF"}>
            Day {day}
          </Box>
         { challengeData?.title && <Box>{challengeData?.title}</Box>}
          <span onClick={handleClose}>
            <Close />
          </span>
        </DialogTitle>
        <DialogContent sx={{ width:"100%",  marginTop:"1rem"}}>
          {startChallenge === false ? (
            <ChallengeStepper
              challenges={challengeQuestionState}
              closeModalFunction={handleClose}
              activeStep={activeStep}
            />
          ) : (
            <Box>
              <Box display="grid" justifyContent={"center"}>
                <img src={imgSrc} style={{ width: "100px" }} />
              </Box>
              <Box display="grid" justifyContent={"center"} marginTop="2rem">
                <Typography variant="body1" color={"#A3A5B4"}>
                  {t?.description}
                </Typography>
              </Box>

              <DialogContentText
                id="alert-dialog-slide-description"
                sx={{
                  fontWidth: "400",
                  fontSize: "14px",
                  color: "#FFFFFF",
                  fontFamily: "biennaleSemibold",
                  background: "#040637",
                  padding: "1.5rem",
                  borderRadius: "10px",
                  lineHeight: "23px",
                }}
              >
                {challengeData?.description?.length === 0 ?"No description added to this day!." :challengeData?.description}
              </DialogContentText>
            </Box>
          )}

          {/* {  startChallenge === false && <ChallengeStepper />} */}
        </DialogContent>
        {/* { startChallenge === false &&<DialogContent>
        <ChallengeStepper />
        </DialogContent>} */}
        <DialogActions
          sx={{
            // display: "grid",
            // justifyContent: "center",
            // paddingBottom: "5rem",
          }}
        >
          {startChallenge ? (
            <Button
              onClick={() => {
                setStartChallenge(!startChallenge);
              }}
              variant="contained"
              sx={{ backgroundColor: "#A8C301", padding: "0.5rem 4rem"  ,margin:"0 auto"}}
              disabled={!(challengeQuestionState?.length > 0)}
            >
              {t.start}
            </Button>
          ) : <div style={{display:"grid" , gridTemplateColumns:"auto auto" , justifyContent:"space-between" , width:"100%"}}>
            <Button onClick={() => setActiveStep(activeStep - 1)} disabled={ activeStep === 0  }>{t?.previous}</Button>
            <Button onClick={() => setActiveStep(activeStep + 1)} disabled={challengeQuestionState?.length - 1 === activeStep}>{t?.next}</Button>
            </div>}
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          background: `url(${imgSrc})`,
          // width: isMobile ? "200px" : "264px",
          // height: isMobile ? "200px" : "264px",
          width:"100%", 
          height:"100%",
          borderRadius: "10px",
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
          cursor: "pointer",
          // textAlign: "center",
          backgroundPosition:"center",
          backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    // display:"grid",
    // justifyItems:"center"

        }}
        onClick={handleClick}
      >
        {dayStatus === "LOCK" && <span style={{
              position: "absolute",
              background: "#2323239c",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              zIndex: 1
        }}>

        </span>}
        <ChallengeNumber challengeNumber={challengeNumber} />
        <Box display={"grid"} justifyItems="center" height="fit-content">
        {isClicked && dayStatus === "LOCK" && (
          <Typography color="#fff" textAlign="center" mt={"40%"}>
            {t?.check_back_challenge}
          </Typography>
        )}
        

        { dayStatus !== "OPEN" && <span
          style={{
            backgroundColor: "#ffffff",
            width: "3rem",
            height: "3rem",
            display: "flex",
            /* justify-self: center; */
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "45%",
            marginTop: (isMobile && dayStatus === "LOCK") ? "0%" : (dayStatus === "LOCK" && isClicked === true) ? "0%" : "50%"
          }}
        >
          {dayStatus === "LOCK" && <ChallengeLock />}
          {dayStatus === "pending" && <ChallengePending />}
          {dayStatus === "failed" && <Field color={"#FF4040"}/>}
          {dayStatus === "passed" && <Passed  color={"#A8C301"}/>}
          
        </span>}

        </Box>

        {/* {dayStatus === "passed" && ""} */}
        {/* {dayStatus === "rejected" &&} */}
        <Box
          sx={{
            position: "absolute",
            backgroundColor:
              dayStatus === "passed"
                ? "#F1FF9A"
                : dayStatus === "failed"
                ? "#FFBABA"
                : "#FFCFA1",
            color:
              dayStatus === "passed"
                ? "#A8C301"
                : dayStatus === "failed"
                ? "#FF4040"
                : "#F29339",
            top: 10,
            right: 10,
            padding: "5px 10px",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "gilory-semibold",
            borderRadius: "5px",
          }}
        >
          {dayStatus}
        </Box>
      </Box>
    </Box>
  );
};

export default ChallengeItem;
