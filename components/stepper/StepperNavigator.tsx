import { Button } from "@mui/material";
import { FormikValues } from "formik";

import { useTranslation } from "../../hooks";

interface Props {
  hasPrevious: boolean;
  isLastStep: boolean;
  onBackClick: (values: FormikValues) => void;
}

const StepperNavigator = ({ hasPrevious, isLastStep, onBackClick }: Props) => {
  const t = useTranslation();

  return (
    <>
      <Button type="submit" variant="contained" sx={{ mt: 1, mr: 1 }}>
        {isLastStep ? t.submit : t.next}
      </Button>
      {hasPrevious && (
        <Button onClick={onBackClick} sx={{ mt: 1, mr: 1 }}>
          {t.back}
        </Button>
      )}
    </>
  );
};

export default StepperNavigator;
