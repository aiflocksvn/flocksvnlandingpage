import Link from "next/link";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";

import { useMediaBreakpoints, useTranslation } from "../../hooks";

const InvestmentProfileCompleted = () => {
  const t = useTranslation();
  const { isMobile } = useMediaBreakpoints();
  return (
    <Grid container justifyContent="center" sx={{ minHeight: "80vh" }}>
      <Grid item md={6} xs={12}>
        <Paper>
          <Box py={5}>
            <Typography
              variant={isMobile ? "h6" : "h4"}
              gutterBottom
              textAlign="center"
            >
              {t?.investor_profile_completed}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              mb={2}
              px={5}
              textAlign="center"
            >
              {t?.investor_profile_success_message}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Link href="/" passHref>
                <Button variant="contained">{t?.back_to_home}</Button>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default InvestmentProfileCompleted;
