import * as yup from "yup";

export const InvestorSchema = yup.object({
    investmentProfile:yup.object(
        {
          investorName: yup.string()
          .min(3, "Investor Name must be more than 2 characters")
          .required('Investor Name is required!'),
          investorEmail: yup.string()
          .email("Invalid email format")
          .required('Investor Email is required!'),
          investorPhone: yup.string()
          .min(3, "Investor phone must be at least 10 characters")
          .required('Investor Phone is required!'),
          investorAddress: yup.string()
          .min(3, "Investor Address must be more than 2 characters")
          .required('Investor Address is required!'),
          investorIdNumber: yup.string()
          .min(3, "Investor ID number must be more than 2 characters")
          .required('Investor ID number is required!')
        }
      )
})

export const areasOfInteresSchema = yup.object({
    "1":yup.string().required("This field is required")
})