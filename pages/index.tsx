import React, { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import {
  Container,
  Box,
  Grid,
  Button,
  Typography,
  styled,
} from "@mui/material";
import { useQuery } from "react-query";

import {
  useTranslation,
  useMediaBreakpoints,
  useAppTheme,
  useAuth,
} from "../hooks";
import { setUserType, getUserType } from "../utils/storage";
import { IDVerificationWarning } from "../components/common";
import { checkUserVerificationStatus } from "../services";

const Cover = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: theme.spacing(1),
}));

const Home: NextPage = () => {
  const t = useTranslation();
  const theme = useAppTheme();
  const auth: any = useAuth();
  const router = useRouter();
  const locale = router.locale;
  const userType = getUserType();
  const [isMore, setIsMore] = React.useState(false);
  const moreRef = React.useRef(null);
  const { isMobile, isDesktop, isTablet, isLargeDesktop } =
    useMediaBreakpoints();
  const { isLoading, data } = useQuery(
    "userVerificationStatus",
    checkUserVerificationStatus
  );

  const renderMore = () => {
    return (
      <Box>
        <Grid container pb={2} mt={isMobile ? 0 : -8}>
          <Grid item xs={12} md={12}>
            <Typography
              color="#fff"
              gutterBottom
              lineHeight={1.5}
              my={3}
              dangerouslySetInnerHTML={{ __html: t?.more_text_p1 }}
            />

            <Typography
              variant="h5"
              gutterBottom
              color="primary"
              fontWeight="bold"
              dangerouslySetInnerHTML={{ __html: t?.more_text_p2 }}
            />
            <Typography color="#fff" mb={3} gutterBottom>
              <Box component="ol">
                <Box component="li">{t?.more_text_p3}</Box>
                <Box component="li">{t?.more_text_p4}</Box>
                <Box component="li">{t?.more_text_p5}</Box>
              </Box>
            </Typography>
            <Typography
              color="#fff"
              gutterBottom
              mb={2}
              dangerouslySetInnerHTML={{ __html: t?.more_text_p6 }}
            />
            <Typography
              color="#fff"
              gutterBottom
              mb={2}
              dangerouslySetInnerHTML={{ __html: t?.more_text_p7 }}
            />
            <Typography
              color="#fff"
              gutterBottom
              mb={2}
              dangerouslySetInnerHTML={{ __html: t?.more_text_p8 }}
            />
            <Typography
              color="#fff"
              gutterBottom
              mb={2}
              dangerouslySetInnerHTML={{ __html: t?.more_text_p9 }}
            />
            <Typography
              color="#fff"
              gutterBottom
              mb={2}
              dangerouslySetInnerHTML={{ __html: t?.more_text_p10 }}
            />
            <Typography color={"#fff"} gutterBottom mb={2}>
              {t?.more_text_p11}
            </Typography>
            {isMore && (
              <Button variant="outlined" onClick={handleOnLess}>
                {t?.less}
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    );
  };

  const handleOnMore = () => {
    setIsMore(true);
    scrollToMore(moreRef);
  };

  const handleOnLess = () => {
    setIsMore(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOnRenderClick = () => {
    setIsMore((isMore) => !isMore);
  };

  const handleScroll = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const scrollToMore = (ref: any) =>
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });

  const handleInvestorClick = () => {
    setUserType("investor");
    if (auth.token == null) {
      router.push("/sign-in");
    } else if (userType === "investor") {
      router.push(userType);
    } else {
      router.push("/investor");
    }
  };

  const handleFundRaiserClick = () => {
    setUserType("company");
    if (auth.token == null) {
      router.push("/sign-in");
    } else if (userType === "company") {
      router.push(userType);
    } else {
      router.push("/company");
    }
  };

  // useEffect(() => {
    
  //   if (auth?.user && auth.challengePage){
  //      if (auth?.user?.hasCompanyProfile || auth?.user?.hasInvestmentProfile){
  //       router.push(`/${locale}/challenges`)
  //      }
  //   }
  // },[auth.user])

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {t?.title} | {t?.home}
        </title>
        <meta
          name="description"
          content="Vietnam’s first AI Investment platform"
        />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <main>
        <Cover>
          <Container maxWidth="lg">
            <Grid container pt={isMobile ? 18 : 22}>
              <Grid item xs={12} md={7}>
                <Typography variant="h4">{t?.title}</Typography>
                <Typography variant="h5" gutterBottom mb={3}>
                  {t?.sub_title}
                </Typography>
                <Typography color={"#fff"} gutterBottom lineHeight={1.5} mb={3}>
                  {t?.cover_p1}
                </Typography>
                <Typography
                  color={"#fff"}
                  gutterBottom
                  lineHeight={1.5}
                  mb={3}
                  dangerouslySetInnerHTML={{ __html: t?.cover_p2 }}
                />
                {/* {isMobile && isMore && renderMore()} */}
                {!isMore && (
                  <Button variant="outlined" onClick={handleOnMore}>
                    {t?.more}
                  </Button>
                )}
              </Grid>
              <Grid item xs={12} md={5}>
                <Box className={styles.parot_img_container} pl={5}>
                  <Image
                    src="/images/parot.svg"
                    alt="parot"
                    objectFit="cover"
                    width={500}
                    height={500}
                  />
                </Box>
              </Grid>
            </Grid>

            <Box>
              <Grid container>
                <Grid item xs={12} md={8} textAlign="right"></Grid>
                <Grid item xs={12} md={4} textAlign="right">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleInvestorClick}
                      sx={{
                        mr: 2,
                        color: "secondary.main",
                      }}
                    >
                      {t.sign_up}
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleFundRaiserClick}
                      sx={{
                        color: "secondary.main",
                      }}
                    >
                      {t.raise} {locale === "en-US" && t.capital}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container>
                <Grid item md={1} xs={0}></Grid>
                <Grid
                  item
                  xs={auth.token != null ? 12 : 6}
                  md={8}
                  pb={5}
                  mb={2}
                  mt={6}
                >
                  <Typography
                    textAlign={"center"}
                    color="#fff"
                    fontWeight="bold"
                  >
                    {t.backed_by}
                  </Typography>

                  <Box className={styles.backed_container}>
                    <Grid
                      container
                      px={isMobile ? 0 : 3}
                      mt={1}
                      pb={1}
                      justifyContent="center"
                      alignItems={"center"}
                      textAlign="center"
                    >
                      <Grid item xs={auth.token != null ? 6 : 12} md={3} textAlign="center" pt={1}>
                        <Link href={"https://www.binance.com/en"}>
                        <Image
                          src="/images/Binance_logo.png"
                          width={90}
                          height={60}
                          alt="Binance"
                          style={{
                            cursor:"pointer"
                          }}
                        />
                        </Link>
                      </Grid>
                      <Grid item xs={auth.token != null ? 6 : 12} md={3} textAlign={"center"} pt={2}>
                        <Link href={"https://momo.vn/"}>
                        <Image
                          src="/images/momo_icon_square_pinkbg.svg"
                          width={82}
                          height={58}
                          alt="MOMO"
                          style={{
                            cursor:"pointer"
                          }}
                        />
                        </Link>
                      </Grid>
                      {/* <Grid item xs={auth.token != null ? 6 : 12} md={3}>
                        <Image
                          src="/images/3.svg"
                          width={82}
                          height={58}
                          alt="brand"
                        />
                      </Grid>
                      <Grid item xs={auth.token != null ? 6 : 12} md={3}>
                        <Image
                          src="/images/4.svg"
                          width={82}
                          height={58}
                          alt="brand"
                        />
                      </Grid> */}
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={1} md={1}></Grid>
                {auth.token == null && (
                  <Grid item md={2} xs={5}>
                    <Box
                      // className={styles.spinning_container}
                      // sx={{
                      //   top: isLargeDesktop
                      //     ? "70%"
                      //     : isMobile
                      //     ? "120%"
                      //     : "100%",
                      // }}
                      sx={{
                        mt: isMobile ? 20 : 5,
                      }}
                    >
                      <Link href="sign-up" passHref>
                        <Box
                          sx={{
                            cursor: "pointer",
                            // marginLeft: isMobile ? 0 : 6,
                          }}
                        >
                          <Image
                            src="/images/join-us-spinner.svg"
                            width={isMobile ? 120 : 160}
                            height={isMobile ? 120 : 160}
                            alt="join us spinner"
                            className={styles.rotate}
                          />
                          <Box className={styles.rotation_img}>
                            <Image
                              src="/images/flocksLogoSpinner.png"
                              width={isMobile ? 75 : 100}
                              height={isMobile ? 95 : 120}
                              alt="logo2"
                            />
                          </Box>
                        </Box>
                      </Link>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
            <Box pb={5} className={styles.rounded_container}>
              {/* <Box className={styles.round_box} onClick={handleScroll}>
                <Box className={styles.straight_line}></Box>
              </Box> */}
            </Box>
          </Container>
        </Cover>
        {auth.token != null &&
          data?.data?.verificationStatus !== "done" &&
          (auth?.userProfileQuery?.data?.data?.hasInvestmentProfile ||
            auth?.userProfileQuery?.data?.data?.hasCompanyProfile) && (
            <Grid container alignItems="center">
              <Grid item xl={3} lg={4} md={4} xs={12}>
                <IDVerificationWarning />
              </Grid>
            </Grid>
          )}
        <Box mt={5}>
          <Container maxWidth="lg">
            <Box ref={moreRef}>{isMore && renderMore()}</Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} textAlign="center">
                <Typography
                  variant={isMobile ? "h4" : "h2"}
                  mt={isMobile ? 0 : 0}
                  sx={{
                    color: "primary.main",
                    textAlign: "center",
                    fontFamily: "gilory-semibold",
                    // textShadow: ` 0 0 25px ${theme.palette.primary.main}, 0 0 10px ${theme.palette.primary.main}, 0 0 20px ${theme.palette.primary.main}, 0 0 40px ${theme.palette.primary.main}`,
                  }}
                  py={5}
                >
                  {t.which_way_flying}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} textAlign="left">
                <Box onClick={handleInvestorClick}>
                  <Image
                    src={"/images/triangle.svg"}
                    width={450}
                    height={400}
                    alt="invest"
                    className={styles.flying_link}
                  />
                </Box>
                <Box
                  onClick={handleInvestorClick}
                  sx={{
                    position: "relative",
                    bottom: isMobile ? 150 : 170,
                    right: isMobile ? 0 : 55,
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="h4"
                    color="#fff"
                    textAlign="center"
                    fontSize={locale === "en-US" ? "34px" : "28px"}
                  >
                    {t.sign_up.toUpperCase()}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} textAlign="right">
                <Box onClick={handleFundRaiserClick}>
                  <Image
                    src={"/images/triangle.svg"}
                    width={450}
                    height={400}
                    alt="raise"
                    className={styles.flying_link}
                  />
                </Box>
                <Box
                  onClick={handleFundRaiserClick}
                  sx={{
                    position: "relative",
                    bottom: isMobile ? 170 : 190,
                    left: isMobile ? 0 : 55,
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="h4"
                    color="#fff"
                    textAlign="center"
                    fontSize={locale === "en-US" ? "34px" : "28px"}
                  >
                    {locale === "en-US"
                      ? t.raise.toUpperCase()
                      : t.raise.toUpperCase().substring(0, 8)}{" "}
                    <br />{" "}
                    {locale === "en-US"
                      ? t.capital.toUpperCase()
                      : t.raise.toUpperCase().substring(9, 12)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
    </div>
  );
};

export default Home;
