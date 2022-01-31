import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short!")
    .max(20, "Too long! 20 characters max")
    .required("Required"),
  email: Yup.string().email("Invalid email!").required("Required"),
  password: Yup.string()
    .min(6, "Too short! 6 letters min")
    .required("Required"),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match!"
  ),
});

export const signinSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});
