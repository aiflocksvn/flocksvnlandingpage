import React from "react";
import { Box, Typography, alpha } from "@mui/material";

const SocialButton = (props: any) => {
  return (
    <Box
      sx={{
        padding: 1.5,
        borderRadius: 3,
        cursor: "pointer",
        border: "none",
        width: "100%",
        backgroundColor: props.hoverColor,
        ":hover": {
          backgroundColor: props.hoverColor,
          outline: `3px solid ${alpha(props.hoverColor, 0.4)}`,
        },
      }}
      component="button"
      onClick={props.onClick}
      type="submit"
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
    >
      <Typography
        color={props?.color || "#000"}
        textAlign="center"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.icon}
        <Box
          component="span"
          sx={{ marginLeft: 2 }}
          fontFamily="titilliumweb-semibold"
          fontWeight="bold"
        >
          {props.text}
        </Box>
      </Typography>
    </Box>
  );
};

export default SocialButton;
