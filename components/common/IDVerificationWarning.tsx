import { useRouter } from "next/router";
import { Alert, Button } from "@mui/material";

import { useTranslation } from "../../hooks";

const IDVerificationWarning = () => {
  const t = useTranslation();
  const router = useRouter();
  const locale = router.locale;

  const hanldeOnClick = () => {
    router.push("/verification");
  };
  return (
    <Alert
      severity="warning"
      variant="outlined"
      sx={{
        border: "1px solid #FFD400",
        borderLeft: "10px solid #FFD400",
        verticalAlign: "center",
        alignItems: "center",
        py: 2,
        mb: 5,
        mx: 2,
      }}
      action={
        <Button
          onClick={hanldeOnClick}
          variant="outlined"
          sx={{
            color: "#FFD400",
            borderColor: "#FFD400",
            width: locale === "vi" ? "95px" : "100%",
            ":hover": {
              backgroundColor: "#FFD400",
              borderColor: "#FFD400",
            },
          }}
        >
          {t.verify}
        </Button>
      }
    >
      {t.id_verification_warning}
    </Alert>
  );
};

export default IDVerificationWarning;
