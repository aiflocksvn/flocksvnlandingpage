import { Stack, Alert } from "@mui/material";

const ErrorStack = (props: any) => {
  return (
    <Stack spacing={2} mb={2}>
      {props.errStatus && props.errStatus >= 500 ? (
        <Alert
          severity="error"
          variant="outlined"
          onClose={() => {
            props.setErrStatus();
            props.setErrors();
          }}
        >
          Server Error: something went wrong. But it is not your fault, we will
          fix that very soon.
        </Alert>
      ) : (
        Object.keys(props.errors).map(
          (key) =>
            key != "code" &&
            props.errors[key] != null && (
              <Alert
                onClose={() => {
                  const newErrors = { ...props.errors };
                  newErrors[key] = null;
                  props.setErrors(newErrors);
                }}
                key={key}
                severity="error"
                variant="outlined"
              >
                {props.errors[key]}
              </Alert>
            )
        )
      )}
    </Stack>
  );
};

export default ErrorStack;
