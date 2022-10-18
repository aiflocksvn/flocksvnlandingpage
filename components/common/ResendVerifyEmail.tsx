import React from "react";
import { Button, Alert, Backdrop, CircularProgress } from "@mui/material";
import { useMutation } from "react-query";

import { resendVerifyEmail } from "../../services";
import { useTranslation } from "../../hooks";

const ResendVerifyEmail = ({ email }: { email: string }) => {
  const t = useTranslation();
  const [isSent, setIsSent] = React.useState(false);
  const mutation = useMutation(resendVerifyEmail, {
    onSuccess: (data) => setIsSent(true),
  });

  const handleResendVerifyEmail = () => {
    mutation.mutate({ email });
  };
  return (
    <>
      <Backdrop open={mutation.isLoading}>
        <CircularProgress />
      </Backdrop>
      {isSent ? (
        <Alert
          severity="success"
          variant="outlined"
          onClose={() => setIsSent(false)}
          sx={{ marginBottom: 2 }}
        >
          {t?.verification_link_sent}
        </Alert>
      ) : (
        <Button
          color="primary"
          sx={{ my: 2 }}
          onClick={handleResendVerifyEmail}
        >
          {t?.resend_verification_link}
        </Button>
      )}
    </>
  );
};

export default ResendVerifyEmail;
