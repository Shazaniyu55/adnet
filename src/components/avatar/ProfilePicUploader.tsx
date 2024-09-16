import React, { useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import axios from "axios";
import { updateUser } from "@/store/slices/userSlice";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { LoadingButton } from "@mui/lab";
// import UploadBottomNavigation from "../bottomNavigation/UploadBottomNavigation";
import { SmnkErrorBoundary } from "@/pages/_app";

function ProfilePicUploader() {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const theme = useTheme();
  const [file, setFile] = useState<any>();
  const [displayFile, setDisplayFile] = useState();
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

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
        formData.append("profilePic", file);
        formData.append("userId", _id);

        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}/api/multer/profile-pic`,
          data: formData,
        });
        const data = await res.data;

        setUploading(false);
        setFile("");
        //get user from local storage
        let user = JSON.parse(
          JSON.parse(JSON.stringify(localStorage.getItem("user")))
        );

        //update the dpFileName
        user.dpFileName = data;

        //save the new user details in the localstorage
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(updateUser());
      }
    } catch (err: any) {
      setUploading(false);
      alert("An error occured, please try again");
      console.log(err);
      return false;
    }
  };

  return (
    <SmnkErrorBoundary>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <IconButton type="submit">
          {file && (
            <>
              <Avatar
                src={displayFile}
                alt="image to upload"
                sx={{ width: 80, height: 80 }}
              />
              {uploading ? (
                <LoadingButton
                  loading={uploading}
                  loadingPosition="start"
                ></LoadingButton>
              ) : (
                // <UploadBottomNavigation label="Upload" />
                ""
              )}
            </>
          )}
        </IconButton>
        <IconButton aria-label="upload picture" component="label">
          <input
            name="profilePic"
            onChange={handleChange}
            hidden
            accept="image"
            type="file"
          />
          {!file && <AddAPhotoIcon sx={{ color: theme.smnk[1200] }} />}
        </IconButton>
      </form>
    </SmnkErrorBoundary>
  );
}

export default ProfilePicUploader;
