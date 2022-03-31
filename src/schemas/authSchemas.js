import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short!")
    .max(20, "Too long! 20 characters max")
    .required("What is your name?"),
  email: Yup.string().email("Invalid email!").required("Email is required"),
  password: Yup.string()
    .min(6, "Too short! 6 letters min")
    .required("Pick a password. At least six letters long"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match!")
    .required("Confirm password"),
});

export const signinSchema = Yup.object().shape({
  email: Yup.string().required("Enter your email"),
  password: Yup.string().required("Enter your password"),
});
