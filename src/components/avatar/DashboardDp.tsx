import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { SmnkErrorBoundary } from "@/pages/_app";

export default function DashboardDp() {
  const { dpFileName, type } = useSelector(
    (state: RootState) => state.users.user
  );
  const router = useRouter();

  return (
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
      {dpFileName ? (
        <BlackAvatar
          src={`/api/multer/profile-pic/${dpFileName}`}
          width={50}
          height={50}
          alt="profile pic"
        />
      ) : (
        <Avatar />
      )}
    </IconButton>
  );
}
export function BlackImage({
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) {
  return (
    <SmnkErrorBoundary>
      <Image width={width} height={height} alt={alt} src={src} />
    </SmnkErrorBoundary>
  );
}
export function BlackAvatar({
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) {
  return (
    <SmnkErrorBoundary>
      <Image
        width={width}
        height={height}
        alt={alt}
        src={src}
        style={{ borderRadius: "50%" }}
      />
    </SmnkErrorBoundary>
  );
}
export function BlackImageFrame({
  src,
  width,
  height,
  borderColor,
  alt,
}: {
  src: string;
  borderColor: string;
  width: number;
  height: number;
  alt: string;
}) {
  return (
    <SmnkErrorBoundary>
      <Image
        style={{
          borderRadius: "10%",
          border: `1px solid ${borderColor}`,
        }}
        width={width}
        height={height}
        alt={alt}
        src={src}
      />
    </SmnkErrorBoundary>
  );
}
