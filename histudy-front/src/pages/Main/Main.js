import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  isLoginState,
  isRegisterModalState,
  userLoginInfo,
} from "../../store/atom";
import { TextField, Typography } from "@mui/material";
import "./css/Textfield.css";
import { userSignup } from "../../apis/users";
import GoogleButton from "../../auth/GoogleButton";
import ImportCSV from "../../components/scv/ImportCSV";
import NavGrid from "../../components/Main/NavGrid";
import MainTest from "../../components/Main/MainTest";
import RegisterModal from "../../components/Main/RegisterModal";

export default function Main() {
  const [sid, setSid] = useState("");

  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [isRegisterModal, setIsRegisterModal] =
    useRecoilState(isRegisterModalState);
  const [userLoginInfoState, setUserLoginInfoState] =
    useRecoilState(userLoginInfo);
  console.log(userLoginInfoState);

  const nameConverter = (name) => {
    if (name.slice(-3) === "학부생") return name.slice(0, -3);
    return name;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const newUser = {
      sub: userLoginInfoState.sub,
      email: userLoginInfoState.email,
      name: nameConverter(userLoginInfoState.name),
      sid: sid,
    };
    if (sid.length === 0) {
      alert("학번을 입력해주세요");
      return;
    }
    if (sid.length !== 8) {
      alert("학번을 정확히 입력해주세요.");
      return;
    }
    const response = await userSignup(newUser);
    console.log(response);

    alert("회원가입이 완료되었습니다.");
    localStorage.setItem("accessToken", response.tokens.accessToken);
    localStorage.setItem("refreshToken", response.tokens.refreshToken);
    setIsRegisterModal(false);
    setUserLoginInfoState(null);
    setIsLogin(true);
    // window.location.reload();
  };

  useEffect(() => {
    window.scrollTo(0, 80);
  }, []);
  // console.log(isLogin);
  return (
    <Box>
      {/* <NavGrid /> */}
      <MainTest />
      {!isLogin && <GoogleButton />}
      {isRegisterModal && (
        <RegisterModal handleClick={handleClick} sid={sid} setSid={setSid} />
      )}
    </Box>
  );
}
