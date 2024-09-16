import Image from "next/image";
import styles from "../../styles/account/layout.module.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function AccountLayout(props: { children: any }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <div>
        {/* {!matches && (
          <div>
            <Image
              src="/assets/ad2.png"
              alt="layout image"
              width={400}
              height={600}
            />
          </div>
        )} */}

        <div>{props.children}</div>
      </div>
    </div>
  );
}
