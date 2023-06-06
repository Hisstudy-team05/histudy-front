import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import GrayBorderBox from "../../components/GrayBorderBox";
import LongButton from "../../components/LongButton";
import { getMyGroup } from "../../apis/study";
import { Link } from "react-router-dom";

export default function Group() {
  const [courses, setCourses] = useState([
    { name: "알고리즘 분석", professor: "이원형 교수님" },
    { name: "데이타 베이스", professor: "홍참길 교수님" },
  ]);
  const [friends, setFriends] = useState([
    {
      name: "오인혁",
      id: "21800446",
    },
    {
      name: "한시온",
      id: "21800888",
    },
  ]);

  const [convertedCourses, setConvertedCourses] = useState([]);
  const [convertedFriends, setConvertedFriends] = useState([]);

  useEffect(() => {
    getMyGroup().then((res) => {
      setCourses(res.courses);

      setConvertedCourses(
        res.courses.map((course) => [course.name, course.prof, course.code])
      );
      setFriends(res.friends);
      setConvertedFriends(
        res.friends.map((friend) => [friend.name, friend.sid])
      );
    });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "50px",
      }}
    >
      <Typography variant="h4" sx={{ mb: "10px" }}>
        스터디 그룹 정보
      </Typography>
      <Typography>스터디 그룹이 아직 배정되지 않았어요😅</Typography>

      <GrayBorderBox courses={convertedCourses} friends={convertedFriends} />

      <Link
        to="/enroll"
        state={{
          courses,
          friends,
        }}
      >
        <LongButton
          name="다시 제출하기"
          bgColor="primary.main"
          fontColor="white"
        />
      </Link>
    </Box>
  );
}
