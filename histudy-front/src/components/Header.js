import { Box, Button, Paper, Switch, ToggleButton } from "@mui/material";
import { Link, useMatch } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import GoogleButton from "../auth/GoogleButton";
import { darkModeState, isLoginState } from "../store/atom";
import DarkModeToggle from "./DarkModeToggle";
import HeaderButton from "./HeaderButton";
import LoginButton from "./LoginButton";
import ExportCSV from "./scv/ExportCSV";
import { useRef } from "react";

export default function Header() {
  const homeMatch = useMatch("/");
  const groupMatch = useMatch("/group");
  const reportMatch = useMatch("/report");
  const rankMatch = useMatch("/rank");
  const enrollMatch = useMatch("/enroll");
  const managerMatch = useMatch("/manageClass");
  console.log(rankMatch);

  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const handleLogOut = () => {
    alert("로그아웃 되었습니다.");
    setIsLogin(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <Box
      sx={{
        // border: 1,
        backgroundColor: "",
        display: "flex",
        justifyContent: "space-between",
        paddingX: "40px",
        paddingY: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "620px",
        }}
      >
        <HeaderButton
          link="/"
          name={<img src="./img/logo_histudy.png" width={130} />}
          match={homeMatch}
        />
        {/* <img src="./img/logo_histudy.png" width={130} /> */}
        <HeaderButton link="/group" name="My Group" match={groupMatch} />
        <HeaderButton link="/report" name="Report" match={reportMatch} />
        <HeaderButton link="/rank" name="Rank" match={rankMatch} />
        <HeaderButton
          link="/enroll"
          name="Sign Up for HISTUDY"
          color="text.header"
          match={enrollMatch}
        />
        <HeaderButton link="/manageClass" name="MANAGER" match={managerMatch} />
      </Box>

      <Box>
        {isLogin && (
          <Button sx={{ color: "text.header" }} onClick={handleLogOut}>
            Log out
          </Button>
        )}

        <Button>My Account</Button>
        <DarkModeToggle />
      </Box>
    </Box>
  );
}
