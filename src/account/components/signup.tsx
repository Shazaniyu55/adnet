import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useRouter } from "next/router";
import { boolean, object, ref, string } from "yup";
import { signUpDetails } from "@/lib/types/signUp";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { signUp, updateState } from "@/store/slices/userSlice";
import { useEffect, useRef, useState } from "react";
import FormikContainer from "@/components/form/formikContainer";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import { AlertColor, Box } from "@mui/material";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { getSWExtra } from "@/store/slices/swExtraSlice";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { SmnkErrorBoundary } from "@/pages/_app";

// program to generate random strings

// declare all characters
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length: number) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
const getSignUpDetails = () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const valuesStr = localStorage.getItem("values");
    if (valuesStr) {
      const values = JSON.parse(JSON.stringify(valuesStr));
      if (values !== "undefined") {
        return JSON.parse(values) as signUpDetails;
      }
    }
  }
};
export default function SignUp() {
  const [verificationCode, setverificationCode] = useState("");

  const router = useRouter();

  const { user, response, successful } = useSelector(
    (state: RootState) => state.users
  );
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  //declare refs
  const snackBarRef = useRef();

  const [initialValues, setInitiaValues] = useState<signUpDetails>(
    getSignUpDetails() ?? {
      email: "",
      emailVerificationCode: "",
      phone: "",
      password: "",
      confirmPassword: "",
      type: "Skilled Worker",
      typeClass: "Individual",
      tc: false,
    }
  );

  useEffect(() => {
    setverificationCode(generateString(10));
  }, []);

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
  const submitHandler = async (values: signUpDetails) => {
    await dispatch(signUp(values));
  };

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    setLoading(true);
    return new Promise((res) => {
      formikHelpers
        .validateForm()
        .then(async (data: any) => {
          if (values.tc) {
            //if (values.emailVerificationCode === verificationCode) {
            const msg = await submitHandler(values);

            setLoading(false);
            res(msg);
            // } else {
            //   setMsg("Invalid email verification code");
            //   setColor("error");
            //   const refState = snackBarRef.current as any;
            //   refState.handleClick();
            //   res("");
            //}
          } else {
            setMsg("Please agree to terms and conditions");
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
            dispatch(updateState());
            setLoading(false);
            res(msg);
          }
        })
        .catch((err: any) => {
          setLoading(false);
          res(err);
        });
    });
  };

  const signupSchema = object({
    email: string().email("invalid email").required("Email is required"),
    // emailVerificationCode: string().required(
    //   "Email verification code is required"
    // ),
    phone: string()
      .min(11, "Phone can not be less than 11 digits")
      .max(11, "Phone can not be more than 11 digits")
      .required("Phone is required"),
    password: string().required("Password is required"),
    confirmPassword: string()
      .oneOf([ref("password"), ""], "Both Passwords must match")
      .required("Confirm Password is required"),
  });

  const signUpFormControls: FormControls[] = [
    {
      name: "email",
      label: "Email",
      control: "input",
      emailVerificationCode: verificationCode,
    },
    // {
    //   name: "emailVerificationCode",
    //   label: "Email Verification Code",
    //   control: "input",
    // },
    {
      name: "phone",
      label: "Phone Number",
      control: "verifyPhone",
      type: "phone",
    },
    { name: "password", label: "Password", control: "input", type: "password" },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      control: "input",
      type: "password",
    },
    {
      name: "type",
      label: "Are you a Skilled Worker Or a Client",
      control: "radio",
      options: [
        { label: "Skilled Worker", value: "Skilled Worker" },
        { label: "Client", value: "Client" },
      ],
    },
    {
      name: "typeClass",
      label: "Are you an Individual Or a Company",
      control: "radio",
      options: [
        { label: "Individual", value: "Individual" },
        { label: "Company", value: "Company" },
      ],
    },
    {
      name: "tc",
      label: (
        <>
          <Typography component={"span"}>
            By signing up, you agree to our{" "}
          </Typography>
          <Link href="/t&c">terms and conditions</Link>{" "}
          <Typography component={"span"}>and </Typography>{" "}
          <Link href="/privacy-policy">privacy policy</Link>
        </>
      ),
      control: "switch",
    },
  ];

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      signupSchema,
      initialValues,
      signUpFormControls
    ),
    buttonLabel: "SignUp",
    headerTitle: <LoginHeaderTitle />,
    endIcon: <AccountBoxIcon />,
  };

  return (
    <SmnkErrorBoundary>
      <FormikContainer formParams={formParams} loading={loading} />
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
    </SmnkErrorBoundary>
  );
}
export function LoginHeaderTitle() {
  return (
    <Box ml={3}>
      <Typography color={"white"} fontSize={{ xs: 20, sm: 30, md: 50 }}>
        Everything you need
      </Typography>
      <Typography
        color={"white"}
        fontSize={{ xs: 20, sm: 30, md: 50 }}
        fontWeight={"bold"}
      >
        at your doorstep
      </Typography>
    </Box>
  );
}
