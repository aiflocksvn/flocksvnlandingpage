import {
  StepConnector,
  StepIconProps,
  stepConnectorClasses,
  StepLabel,
  StepLabelClasses,
  styled,
} from "@mui/material";

import { Camera, IdCard, Confirm } from "../icons";
import { useAppTheme } from "../../hooks";

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 1,
    margin: "0px 5px",
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: "transparent",
  border: `1px solid #b1b1b1`,
  zIndex: 1,
  color: theme.palette.primary.main,
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    background: "transparent",
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
  }),
  ...(ownerState.completed && {
    background: "transparent",
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
  }),
}));

export const ColorlibStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;
  const theme = useAppTheme();

  const icons: { [index: string]: React.ReactElement } = {
    1: <Camera color={active ? theme.palette.primary.main : "#C4C4C4"} />,
    2: <IdCard color={active ? theme.palette.primary.main : "#B1B1B1"} />,
    3: <Confirm color={active ? theme.palette.primary.main : "#B1B1B1"} />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
};
