import { Paper, Container } from "@mui/material";

const AppPapper = (props: any) => {
  return (
    <Paper
      sx={{
        borderRadius: 5,
        boxShadow: "0 0 20px 0px rgb(0 0 0 / 6%);",
        "&:hover": {
          boxShadow: `0 0 20px 0px #9e9e9e80;`,
        },
      }}
    >
      <Container maxWidth="md">{props.children}</Container>
    </Paper>
  );
};

export default AppPapper;
