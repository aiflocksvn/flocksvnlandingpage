import { Box, Typography } from "@mui/material";

import { useMediaBreakpoints } from "../../hooks";

const ChallengeNumber = ({ challengeNumber }: { challengeNumber: number }) => {
  const { isMobile } = useMediaBreakpoints();

  return (
    <Box
      sx={{
        background: "url(/images/challenge-number.svg) no-repeat",
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // padding: 5,
        position: "relative",
        // top: 180,
      }}
    >
      <Typography
        color="#fff"
        sx={{
          position: "relative",
          top: 0,

          // left: isMobile ? -35 : -30,
          left:"8px"
        }}
      >
        {challengeNumber}
      </Typography>
    </Box>
  );
};

export default ChallengeNumber;
