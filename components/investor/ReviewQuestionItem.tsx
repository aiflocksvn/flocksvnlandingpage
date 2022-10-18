import {
  Typography,
  Box,
  Grid,
  Divider,
  FormControlLabel,
  Switch,
  Checkbox,
} from "@mui/material";

const ReviewQuestionItem = ({
  title,
  body,
  labelText,
  name,
  checked,
  onChange,
}: any) => {
  return (
    <>
      <Grid item md={12} xs={12} my={2}>
        <Typography variant="h5" color="#fff" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="#fff" gutterBottom>
          {body}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox name={name} checked={checked} onChange={onChange} />
          }
          label={
            <Box component="span" sx={{ fontWeight: "bold", color: "#fff" }}>
              {labelText}
            </Box>
          }
          sx={{ marginTop: 2 }}
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <Divider />
      </Grid>
    </>
  );
};

export default ReviewQuestionItem;
