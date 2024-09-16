import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProfilePicUploader from "./ProfilePicUploader";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { SmnkErrorBoundary } from "@/pages/_app";
import { BlackAvatar } from "./DashboardDp";

export default function ProfilePic() {
  const { dpFileName, type } = useSelector(
    (state: RootState) => state.users.user
  );
  const router = useRouter();

  const [imgLoadComplete, setImgLoadComplete] = useState(false);
  return (
    <SmnkErrorBoundary>
      <Stack direction="row">
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={<ProfilePicUploader />}
        >
          {dpFileName ? (
            <IconButton
              sx={{ mt: 1, mr: 2 }}
              onClick={() => {
                if (type === "skilled worker") {
                  router.push("/sw-dashboard");
                } else if (type === "client") {
                  router.push("/c-dashboard");
                } else {
                  router.push("/a-dashboard");
                }
              }}
            >
              <BlackAvatar
                width={80}
                height={80}
                alt="Profile picture"
                src={`/api/multer/profile-pic/${dpFileName}`}
              />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                if (type === "skilled worker") {
                  router.push("/sw-dashboard");
                } else if (type === "client") {
                  router.push("/c-dashboard");
                } else {
                  router.push("/a-dashboard");
                }
              }}
            >
              <Avatar sx={{ width: 80, height: 80 }} />
            </IconButton>
          )}
        </Badge>
      </Stack>
    </SmnkErrorBoundary>
  );
}
