import { theme } from "@/pages/_app";
// import HomeLogoutAppBar from "./appBar/HomeLogoutAppBar";
// import Footer from "./footer/Footer";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme, useMediaQuery, Box, Typography } from "@mui/material";
// import DesktopHomeAppBar from "./appBar/DesktopHomeAppBar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useRouter } from "next/router";
import React from "react";

export default function Layout(props: { children: any }) {
  const [openAbout, setOpenAbout] = React.useState(false);
  const router = useRouter();
  const newTheme = useTheme();
  const mediaQuery = useMediaQuery(newTheme.breakpoints.up("sm"));

  return (
    <Box bgcolor="#F4F5F6" sx={{ color: theme.smnk[1200] }}>
      <ThemeProvider theme={theme}>
        {/* {mediaQuery ? <DesktopHomeAppBar /> : <HomeLogoutAppBar />} */}
        <Box
          sx={{
            maxWidth: "100%",
            mt: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            bgcolor: theme.smnk[1200],
            color: "white",
          }}
        >
          <List
            component="nav"
            aria-label="main mailbox folders"
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <ListItemButton
              sx={{ ml: 0 }}
              onClick={() => {
                setOpenAbout(!openAbout);
              }}
            >
              <ListItemText
                primary={<Typography variant="body2">About Us</Typography>}
              />
              {openAbout ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openAbout} timeout="auto" unmountOnExit>
              <Box
                display={openAbout ? "block" : "none"}
                bgcolor="whitesmoke"
                minWidth={150}
                position={"absolute"}
                left={15}
                top={50}
                zIndex={99}
                color={theme.smnk[1200]}
              >
                <ListItemButton
                  onClick={(event) => {
                    router.push("/about-us");
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">About SMNK</Typography>
                    }
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={(event) => {
                    router.push("/vision");
                  }}
                >
                  <ListItemText
                    primary={<Typography variant="body2">Vision</Typography>}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={(event) => {
                    router.push("/mission");
                  }}
                >
                  <ListItemText
                    primary={<Typography variant="body2">Mission</Typography>}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={(event) => {
                    router.push("/purpose");
                  }}
                >
                  <ListItemText
                    primary={<Typography variant="body2">Purpose</Typography>}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={(event) => {
                    router.push("/team");
                  }}
                >
                  <ListItemText
                    primary={<Typography variant="body2">Our Team</Typography>}
                  />
                </ListItemButton>
              </Box>
            </Collapse>
            <ListItemButton
              sx={{ ml: 0 }}
              onClick={() => {
                router.push("/services");
              }}
            >
              <ListItemText
                primary={<Typography variant="body2">Services</Typography>}
              />
            </ListItemButton>
            <ListItemButton
              sx={{ ml: 0 }}
              onClick={() => {
                router.push("/jobs");
              }}
            >
              <ListItemText
                primary={<Typography variant="body2">Jobs</Typography>}
              />
            </ListItemButton>

            <ListItemButton sx={{ ml: 0 }} onClick={() => {}}>
              <ListItemText
                primary={<Typography variant="body2">Blog</Typography>}
              />
            </ListItemButton>
          </List>
        </Box>
        {props.children}
      </ThemeProvider>
      {/* <Footer /> */}
    </Box>
  );
}
