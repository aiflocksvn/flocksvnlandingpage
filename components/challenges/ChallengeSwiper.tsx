import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useRouter } from "next/router";
import challenges from "./challenges.json";
import ChallengeItem from "./ChallengeItem";
import {
  useMediaBreakpoints,
  useAppTheme,
  useTranslation,
  useAuth,
} from "../../hooks";
import axiosInstance from "../../services/axiosWithAuth";
import {
  apiRoutes,
  mediaBaseURL,
  mediaChallengesImage,
} from "../../utils/constants";
import { useQuery } from "react-query";

const ChallengeSwiper = () => {
  const theme = useAppTheme();
  const t = useTranslation();
  const router = useRouter();
  const auth: any = useAuth();
  const { isMobile } = useMediaBreakpoints();
  const getChallengeList = async () => {
    const { data } = await axiosInstance.get(
      apiRoutes.challengeList + "?page=1&page_size=50"
    );
    return data;
  };
  const { isLoading, isError, data } = useQuery(
    "getChallengeList",
    getChallengeList
  );

  return (
    <Box sx={{ minHeight: "85vh" }} py={isMobile ? 12 : 10}>
      <Box textAlign="center" mb={10}>
        {isMobile ? (
          <img src="/images/30day-challenge.svg" style={{ width: "100%" }} />
        ) : (
          <img
            src="/images/30day-challenge.svg"
            style={{ marginTop: "3rem" }}
          />
        )}
      </Box>
      <Box sx={{ py: 4, pl: 2, backgroundColor: "rgba(0,0,0,0.4)" }}>
        <Swiper
          slidesPerView={isMobile ? 2 : 5}
          spaceBetween={40}
          slidesPerGroup={isMobile ? 1 : 5}
          loop={false}
          loopFillGroupWithBlank={false}
          pagination={{
            clickable: true,
          }}
          navigation={isMobile ? false : true}
          modules={[Navigation]}
          slidesOffsetAfter={isMobile ? 80 : 100}
          slidesOffsetBefore={isMobile ? 20 : 60}
        >
          {data?.results?.map((challenge: any) => (
            <SwiperSlide key={challenge.id}>
              <ChallengeItem
                challengeNumber={challenge?.dayNumber}
                imgSrc={mediaChallengesImage + challenge?.challengeIcon}
                text={challenge.text}
                isLocked={challenge?.dayStatus || true}
                day={challenge?.id}
                dayStatus={challenge.dayStatus}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      {/* <Box display="grid" justifyContent={"center"} marginTop="1rem">
        <Button onClick={() => {
          auth.setChallengePage(false)
          router.push(`/${router.locale}/`)
        }}>{t.back_to_home}</Button>
      </Box> */}
      {isMobile ? (
        <Typography
          sx={{
            color: "primary.main",
            fontFamily: "bungee-regular !important",
            fontWeight: 400,
            textAlign: "center",
            textShadow: ` 0 0 15px ${theme.palette.primary.main}, 0 0 20px ${theme.palette.primary.main}, 0 0 40px ${theme.palette.primary.main}, 0 0 60px ${theme.palette.primary.main}`,
          }}
          py={5}
          px={1}
        >
          {t?.challenge_message_1}
          <br /> {t?.challenge_message_2}
        </Typography>
      ) : (
        <Typography
          sx={{
            color: "primary.main",
            fontSize: 25,
            fontFamily: "bungee-regular",
            fontWeight: 400,
            textAlign: "center",
            textShadow: ` 0 0 15px ${theme.palette.primary.main}, 0 0 20px ${theme.palette.primary.main}, 0 0 40px ${theme.palette.primary.main}, 0 0 60px ${theme.palette.primary.main}`,
          }}
          py={4}
        >
          {t?.challenge_message_1}
          <br /> {t?.challenge_message_2}
        </Typography>
      )}
      <Box textAlign="center">
        {isMobile ? (
          <img src="/images/coming-soon.svg" style={{ width: "80%" }} />
        ) : (
          <img src="/images/coming-soon.svg" />
        )}
      </Box>
    </Box>
  );
};

export default ChallengeSwiper;
