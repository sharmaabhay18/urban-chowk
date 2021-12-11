import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, "Email address is too short!")
    .max(255, "Email address is too long!")
    .email("Please enter valid email address")
    .required("Email address is required"),
  password: Yup.string().required("Password is required"),
});

export const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, "Email address is too short!")
    .max(255, "Email address is too long!")
    .email("Please enter valid email address")
    .required("Email address is required"),
});

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Must contain 8 to 20 letters, including at least one uppercase letter (i.e. A-Z), one lowercase letter (i.e a-z), one numeric character (i.e. 0-9) and one special character (eg.  !,?)"
    ),
  password: Yup.string()
    .required("Confirm password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Must contain 8 to 20 letters, including at least one uppercase letter (i.e. A-Z), one lowercase letter (i.e a-z), one numeric character (i.e. 0-9) and one special character (eg.  !,?)"
    ),
});

export const EditProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short!")
    .max(50, "Name is too long!")
    .required("Name is required"),
  mobile: Yup.string()
    .min(10, "Phone number is too short!")
    .required("Phone number is required"),
});

export const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short!")
    .max(50, "Name is too long!")
    .required("Name is required"),
  email: Yup.string()
    .min(3, "Email address is too short!")
    .max(255, "Email address is too long!")
    .email("Please enter valid email address")
    .required("Email address is required"),
  mobile: Yup.string()
    .min(10, "Phone number is too short!")
    .required("Phone number is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Must contain 8 to 20 letters, including at least one uppercase letter (i.e. A-Z), one lowercase letter (i.e a-z), one numeric character (i.e. 0-9) and one special character (eg.  !,?)"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Must contain 8 to 20 letters, including at least one uppercase letter (i.e. A-Z), one lowercase letter (i.e a-z), one numeric character (i.e. 0-9) and one special character (eg.  !,?)"
    )
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const AddTestimonialScehma = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short!")
    .max(50, "Name is too long!")
    .required("Name is required"),
  icon: Yup.string().min(2, "Icon is too short!").required("Icon is required"),
  description: Yup.string()
    .min(2, "Description is too short!")
    .required("Description is required"),
  image_url: Yup.string()
    .min(2, "Image url is too short!")
    .required("Image url is required"),
});

export const AddCouponScehma = Yup.object().shape({
  code: Yup.string()
    .min(2, "Code is too short!")
    .max(50, "Code is too long!")
    .required("Code is required"),
  discount: Yup.string()
    .min(1, "Discount is too short!")
    .required("Discount is required"),
});

export const AddressSchema = Yup.object().shape({
  address: Yup.string()
    .min(2, "Address is too short!")
    .max(250, "Address is too long!")
    .required("Address is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string().required("Pin Code is required"),
  landmark: Yup.string(),
});
