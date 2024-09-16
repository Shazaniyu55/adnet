import { useRouter } from "next/router";
import { object, ref, string } from "yup";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { useEffect, useRef, useState } from "react";
import { AlertColor } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { changePasswordWithPhone, updateState } from "@/store/slices/userSlice";
import { getSWExtra } from "@/store/slices/swExtraSlice";
import { SmnkErrorBoundary } from "@/pages/_app";
import { LoginHeaderTitle } from "./signup";

const initialValues = {
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function ChangePassword() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const { user, response, successful } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  //declare refs
  const snackBarRef = useRef();

  useEffect(() => {
    if (response) {
      if (successful) {
        setMsg(response);
        setColor("success");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        dispatch(updateState());
      } else {
        setMsg(response);
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        dispatch(updateState());
      }
    }
    if (user) {
      switch (true) {
        case user.type === "skilled worker":
          dispatch(getSWExtra(user._id));
          router.push("/sw-dashboard");
          break;
        case user.type === "client":
          router.push("/c-dashboard");
          break;
        case user.type === "admin":
          router.push("/a-dashboard");
          break;
      }
    }
  }, [user, router, successful, response, dispatch]);

  //sign up submit handler
  const submitHandler = async (values: {
    email: string;
    password: string;
    phone: string;
  }) => {
    dispatch(changePasswordWithPhone(values));
  };

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    setLoading(true);
    return new Promise((res) => {
      formikHelpers
        .validateForm()
        .then(async (data: any) => {
          const msg = await submitHandler(values);
          setLoading(false);
          res(msg);
        })
        .catch((err: any) => {
          setMsg("An error occurred while filling the form. Try again");
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          setLoading(false);
          res(err);
        });
    });
  };

  const changePasswordSchema = object({
    email: string().email("invalid email").required("Email is required"),
    phone: string().required("Phone is required"),
    password: string().required("New Password is required"),
    confirmPassword: string()
      .oneOf([ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const forgotPasswordFormControls: FormControls[] = [
    { name: "email", label: "Email", control: "input", type: "email" },
    { name: "phone", label: "Phone Number", control: "input", type: "phone" },
    { name: "password", label: "Password", control: "input", type: "password" },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      control: "input",
      type: "password",
    },
  ];

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      changePasswordSchema,
      initialValues,
      forgotPasswordFormControls
    ),
    buttonLabel: "Change Password",
    headerTitle: <LoginHeaderTitle />,
  };

  return (
    <SmnkErrorBoundary>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} loading={loading} />
    </SmnkErrorBoundary>
  );
}
