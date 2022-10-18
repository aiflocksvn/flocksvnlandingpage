import Link from "next/link";
import { Typography, Button, Grid, Box, Paper } from "@mui/material";
import Lottie from "react-lottie";

import { LinkSent } from "../../lotties";
import { useMediaBreakpoints, useTranslation } from "../../hooks";
import { ResendVerifyEmail } from "../common";

const defaultOption = {
  autoPlay: true,
  loop: true,
  animationData: LinkSent,
};
const VerifyMessageSentBox = ({ email }: { email: string }) => {
  const { isMobile } = useMediaBreakpoints();
  const t = useTranslation();
  return (
    <Box py={5}>
      <Paper>
        <Lottie options={defaultOption} height={200} width={200} />
        <Typography variant="h5" gutterBottom textAlign="center">
          {t.verify_your_email}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          textAlign="center"
          mb={2}
          px={5}
        >
          {t?.verify_email_sent}
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="center" px={5}>
          {t?.click_on_verify_link}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ResendVerifyEmail email={email} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }} pb={3}>
          <Typography color="primary.main">
            <Link href="/sign-in">{t.sign_in}</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default VerifyMessageSentBox;
