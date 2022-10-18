import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import { useTranslation, useAuth, useMediaBreakpoints } from "../../hooks";

const Header = () => {
  const t = useTranslation();
  const auth: any = useAuth();
  const { isMobile } = useMediaBreakpoints();
  const router = useRouter();
  const locale = router.locale;
  const [open, setOpen] = React.useState(false);
  const [lang, setLang] = React.useState<string | null>("en");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLangChange = (
    event: React.MouseEvent<HTMLElement>,
    newLang: string | null
  ) => {
    setLang(newLang);
  };

  const handleLogout = () => {
    auth.logout();
    setOpen(false);
  };
  
  return (
    <Box sx={{ position: "absolute", top: 10, width: "100%" }}>
      <Container maxWidth="lg">
        <Grid container py={1} alignItems="center">
          <Grid item xs={2} md={6}>
            <Link href="/" passHref>
              <Image
                src={"/images/logo.png"}
                height={145}
                width={130}
                alt="logo"
              />
            </Link>
          </Grid>
          {/* <Grid item xs="auto" textAlign={"right"}> </Grid> */}
          <Grid item xs={10} md={5} textAlign="right">
         { auth?.token && (auth?.user?.hasCompanyProfile || auth?.user?.hasInvestmentProfile) && <Link href={router?.pathname === "/" ? "/challenges" : "/"} passHref locale="en-US">
              <ToggleButton
                value="en"
                size="small"
                selected={false}
                sx={{
                  borderRadius: "4px 4px 4px 4px",
                  px: 1,
                  py: 0.82,
                  textTransform: "capitalize",
                  borderColor: "rgba(217, 253, 0, 0.5)",
                  color: "primary.main",
                  borderWidth: 0.1,
                  marginRight:'15px'
                }}
              >
                {router?.pathname === "/" ? t?.challenges : t?.home}
              </ToggleButton>
            </Link>}
            <Link href={router.asPath} passHref locale="en-US">
              <ToggleButton
                value="en"
                size="small"
                selected={locale === "en-US" ? true : false}
                sx={{
                  borderRadius: "4px 0px 0px 4px",
                  px: 1,
                  py: 0.82,
                  textTransform: "capitalize",
                  borderColor: "rgba(217, 253, 0, 0.5)",
                  color: "primary.main",
                  borderWidth: 0.1,
                }}
              >
                en
              </ToggleButton>
            </Link>
            <Link href={router.asPath} passHref locale="vi">
              <ToggleButton
                value="vi"
                size="small"
                selected={locale === "vi" ? true : false}
                sx={{
                  mr: 2,
                  borderRadius: "0px 4px 4px 0px",
                  px: 1.2,
                  py: 0.82,
                  textTransform: "capitalize",
                  borderColor: "rgba(217, 253, 0, 0.5)",
                  color: "primary.main",
                  borderWidth: 0.1,
                }}
              >
                vi
              </ToggleButton>
            </Link>
            {auth.token != null ? (
              <Button
                variant="outlined"
                sx={{ fontSize: isMobile ? 11 : 14 }}
                onClick={handleOpen}
              >
                {t?.sign_out}
              </Button>
            ) : (
              <Link
                href={router.pathname === "/sign-up" ? "/" : "/sign-up"}
                passHref
              >
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: isMobile ? 10 : 14,
                  }}
                >
                  {router.pathname === "/sign-up" ? t?.back : t?.join_us}
                </Button>
              </Link>
            )}
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose} maxWidth="xl">
          <DialogContent>{t.sure_to_logout}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t.no}</Button>
            <Button onClick={handleLogout}>{t.yes}</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Header;
