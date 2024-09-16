import { useRouter } from "next/router";
import LoginIcon from "@mui/icons-material/Login";
import { object, string } from "yup";
import { login, updateState } from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect, useRef, useState } from "react";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { AlertColor } from "@mui/material";
import { getSWExtra } from "@/store/slices/swExtraSlice";
import { SmnkErrorBoundary } from "@/pages/_app";
import { LoginHeaderTitle } from "./signup";

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const { user, successful, response } = useSelector(
    (state: RootState) => state.users
  );

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  //declare refs
  const snackBarRef = useRef();

  //login submit handler
  const submitHandler = async (values: { email: string; password: string }) => {
    await dispatch(login(values));
  };

  const loginSchema = object({
    email: string().email("invalid email").required("Email is required"),
    password: string().required("Password is required"),
  });

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
    if (user._id) {
      switch (true) {
        case user.type === "skilled worker":
          dispatch(getSWExtra(user._id));
          router.push("/sw-dashboard");
          break;
        case user.type === "client":
          router.push("/c-dashboard");
          break;

        default: {
          router.push("/a-dashboard");
        }
      }
    }
  }, [user, router, successful, response, dispatch]);

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
          setMsg(err.message);
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          setLoading(false);
          res(err);
        });
    });
  };

  const loginFormControls: FormControls[] = [
    { name: "email", label: "Email", control: "input", type: "email" },
    { name: "password", label: "Password", control: "input", type: "password" },
  ];

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      loginSchema,
      initialValues,
      loginFormControls
    ),
    buttonLabel: "Login",
    headerTitle: <LoginHeaderTitle />,
    endIcon: <LoginIcon />,
  };

  return (
    <SmnkErrorBoundary>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} loading={loading} />
    </SmnkErrorBoundary>
  );
}
