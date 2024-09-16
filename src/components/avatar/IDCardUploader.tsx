import { useRef, useEffect, useState } from "react";
import { IconButton, Box, Typography, Container } from "@mui/material";
import Image from "next/image";
import UploadIcon from "@mui/icons-material/Upload";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import axios from "axios";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { LoadingButton } from "@mui/lab";
import { User } from "@/lib/types/userInfo";
import SnackbarComponent from "../snackbar/SnackBar";
import { AlertColor } from "@mui/material";
import { updateUser } from "@/store/slices/userSlice";
import InfoAlert from "../alerts/Info";
import SuccessAlert from "../alerts/Success";
import { useRouter } from "next/router";
import { BlackImage } from "./DashboardDp";
import { SmnkErrorBoundary } from "@/pages/_app";
import { isUserVerified } from "@/lib/utils/user";

function IDCardUploader() {
  const { _id, verification } = useSelector(
    (state: RootState) => state.users.user
  );
  const [file, setFile] = useState<any>();
  const [displayFile, setDisplayFile] = useState("");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const [verified, setVerified] = useState(false);
  //declare refs
  const snackBarRef = useRef();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await isUserVerified(_id);
      setVerified(res.data);
    })();
  });

  let idCardUrl, kycVerified;
  if (verification) {
    idCardUrl = verification.idCardUrl;
    kycVerified = verification.kycVerified;
  }

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      setDisplayFile(e.target.result);
    };

    file && fileReader.readAsDataURL(file);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setUploading(true);
    try {
      if (_id && file) {
        const formData = new FormData();
        formData.append("idCard", file);
        formData.append("userId", _id);

        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}/api/multer/id-card`,
          data: formData,
        });
        const data = await res.data;
        if (data) {
          setMsg("Id Card uploaded successfully");
          setColor("success");

          const refState = snackBarRef.current as any;
          refState.handleClick();
          //get user from local storage
          let user: User = JSON.parse(
            JSON.parse(JSON.stringify(localStorage.getItem("user")))
          );

          //update the verification
          user.verification = { ...user.verification, idCardUrl: data };

          //save the new user details in the localstorage
          localStorage.setItem("user", JSON.stringify(user));
          setUploading(false);
          setFile("");
          dispatch(updateUser());
          setTimeout(() => {
            router.push("/sw-dashboard/verification/capture");
          }, 6000);
        } else {
          setUploading(false);
          setMsg("An Error occurred. Id Card not uploaded. Please try again");
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
        }
      }
    } catch (err: any) {
      setUploading(false);
      setMsg("An Error occurred. Id Card not uploaded. Please try again");
      setColor("error");
      const refState = snackBarRef.current as any;
      refState.handleClick();
      console.log(err);
      return false;
    }
  };

  return (
    <SmnkErrorBoundary>
      <Container sx={{ mt: 10 }}>
        <InfoAlert message="Only government issued IDENTIFICATIONS would be accepted eg: Drivers license, Voters card, NIMC and National passport" />
        <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />

        {verified ? (
          <SuccessAlert message="Your ID Card is verified" />
        ) : (
          <>
            {idCardUrl && (
              <Box
                mb={2}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                <BlackImage
                  src={`/api/multer/id-card/${idCardUrl}`}
                  width={250}
                  height={250}
                  alt="ID Card Upload"
                />

                <InfoAlert message="ID Card is being verified...." />
              </Box>
            )}
          </>
        )}
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <IconButton type="submit" color="primary">
            {file && (
              <Box
                mt={"2rem"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Image
                  src={displayFile}
                  alt="image to upload"
                  width={200}
                  height={200}
                />
                {uploading ? (
                  <LoadingButton
                    loading={uploading}
                    loadingPosition="start"
                  ></LoadingButton>
                ) : (
                  <Box
                    ml={1}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                  >
                    <UploadIcon />
                    <Typography variant="caption">Upload</Typography>
                  </Box>
                )}
              </Box>
            )}
          </IconButton>
          <IconButton
            aria-label="upload picture"
            component="label"
            color="primary"
          >
            <input
              name="idCard"
              onChange={handleChange}
              hidden
              accept="image"
              type="file"
            />
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <AddAPhotoIcon />
              <Typography variant="caption">
                {idCardUrl ? "Change ID Card" : "Select Your ID card"}
              </Typography>
            </Box>
          </IconButton>
        </form>
      </Container>
    </SmnkErrorBoundary>
  );
}

export default IDCardUploader;
