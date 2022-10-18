import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Grid, Typography, Button } from "@mui/material";

import { useTranslation, useMediaBreakpoints } from "../../hooks";
import ReviewQuestionItem from "./ReviewQuestionItem";

const Review = ({ onBtnClick }: any) => {
  const t = useTranslation();
  const { isMobile } = useMediaBreakpoints();

  const [questions, setQuestions] = React.useState({
    q1: false,
    q2: false,
    q3: false,
    q4: false,
  });

  const handleChange = (event: any) => {
    setQuestions({ ...questions, [event.target.name]: event.target.checked });
  };

  return (
    <Container maxWidth="md">
      <Grid item md={12} xs={12} mb={isMobile ? 5 : 10}>
        <Typography
          variant={isMobile ? "h5" : "h3"}
          textAlign="center"
          color="#fff"
          gutterBottom
        >
          {t.risk_approval}
        </Typography>
      </Grid>
      <ReviewQuestionItem
        title={`1. ${t.risk_title}`}
        body={t.risk_subtitle}
        labelText={t.approval_text}
        name="q1"
        checked={questions.q1}
        onChange={handleChange}
      />
      <ReviewQuestionItem
        title={`2. ${t.limited_transfer_title}`}
        body={t.limited_transfer_subtitle}
        labelText={t.approval_text}
        name="q2"
        checked={questions.q2}
        onChange={handleChange}
      />
      <ReviewQuestionItem
        title={`3. ${t.risk_title}`}
        body={t.risk_subtitle}
        labelText={t.approval_text}
        name="q3"
        checked={questions.q3}
        onChange={handleChange}
      />
      <ReviewQuestionItem
        title={`4. ${t.limited_transfer_title}`}
        body={t.limited_transfer_subtitle}
        labelText={t?.understand_lose_money}
        name="q4"
        checked={questions.q4}
        onChange={handleChange}
      />
      <Grid container my={5} justifyContent="center">
        <Grid item md={8} xs={12}>
          <Button
            color="primary"
            fullWidth
            variant="contained"
            onClick={onBtnClick}
            disabled={
              !Object.keys(questions).every(
                (question) => (questions as any)[question] === true
              )
            }
          >
            {t.start_investing}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Review;
