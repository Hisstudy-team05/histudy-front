import {
  Button,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { border, Box } from "@mui/system";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CustomTable from "../../components/CustomTable";
import LongButton from "../../components/LongButton";
import GrayBorderBox from "../../components/GrayBorderBox";
import ProgressBar from "../../components/ProgressBar";
import SideBar from "../../components/Manager/SideBar";
import YearSelectButton from "../../components/Manager/YearSelectButton";
import SemesterSelectButton from "../../components/Manager/SemesterSelectButton";
import RegisterClassButton from "../../components/Manager/RegisterClassButton";
import ManagerTable from "../../components/Manager/ManagerTable";
import StudyGroupTable from "../../components/Manager/StudyGroupTable";
import StudentListTable from "../../components/Manager/StudentListTable";
import { readAllUsers } from "../../apis/manager";
import { isLoadingState } from "../../store/atom";
import { useSetRecoilState } from "recoil";

export default function ManageStudent() {
  const [studentData, setStudentData] = useState();
  const [searchResult, setSearchResult] = useState();
  const [searchValue, setSearchValue] = useState("");
  const setIsLoading = useSetRecoilState(isLoadingState);
  useEffect(() => {
    setIsLoading(true);
    readAllUsers().then((data) => {
      console.log("data");
      console.log(data);
      setSearchResult(data);
      setStudentData(data);
      setIsLoading(false);
    });
  }, []);
  //   const studentData = [
  //     {
  //       id: 1,
  //       name: "오인혁",
  //       sid: "21800339",
  //       group: 1,
  //       courses: [
  //         {
  //           id: 1,
  //           name: "Software Engineering",
  //         },
  //         {
  //           id: 2,
  //           name: "Open-source Software Laboratories",
  //         },
  //       ],
  //       friends: [
  //          {id: 1,
  // name:  "hi"
  //  sid: 1
  // }
  //       ]
  //     },
  //   {
  //     id: 2,
  //     name: "한시온",
  //     number: "21800311",
  //     group: 1,
  //     courses: [
  //       {
  //         id: 1,
  //         name: "Software Engineering",
  //       },
  //       {
  //         id: 2,
  //         name: "Open-source Software Laboratories",
  //       },
  //     ],
  //   },
  // ];
  let sheetData;
  if (studentData) {
    sheetData = studentData.map((student) => ({
      ID: student.id,
      Name: student.name,
      Number: student.sid,
      Group: student.group,
      Courses: student.courses.map((subject) => subject.name).join(", "),
      Friends: student.friends.map((friend) => friend.name).join(", "),
    }));
  }
  const [page, setPage] = useState(1);

  const [friendInput, setFriendInput] = useState("");
  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };
  // useEffect(() => {
  //   if (studentData) {
  //     setStudentData(studentData.filter((student) => student.group !== 0));
  //     // setStudentData(filteredData);
  //   }
  //   console.log(studentData);
  // }, [studentData]);

  const handleClick = (event) => {
    const ID = event.target.id;
    console.log(ID);
    if (ID === "다음") setPage((prev) => prev + 1);
    else if (ID === "이전") setPage((prev) => prev - 1);
    else if (ID === "제출") alert("제출되었습니다.");
  };

  const xlsx = require("xlsx");
  const excelDownload = () => {
    const ws = xlsx.utils.json_to_sheet([...sheetData]);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");

    xlsx.writeFile(wb, "dramatis_personae.xlsx");
  };

  useEffect(() => {
    if (searchValue) {
      let result;
      if (!isNaN(searchValue)) {
        result = studentData.filter(
          (data) => data.group === Number(searchValue)
        );
      } else {
        result = studentData.filter((data) => data.name.includes(searchValue));
      }
      setSearchResult(result);
    } else if (searchValue === "") {
      setSearchResult(studentData);
    }
  }, [searchValue]);
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", py: "50px", px: "300px", minHeight: "100vh" }}>
      <Box sx={{ position: "fixed", left: "30px", top: "13rem" }}>
        <SideBar />
      </Box>

      <Box sx={{ width: "100%", ml: "50px" }}>
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "1rem",
            }}
          >
            <Typography variant="h7">매칭된 학생 목록</Typography>
            <TextField
              id="search"
              type="search"
              value={searchValue}
              onChange={handleChange}
              sx={{
                width: "30rem",
                borderRadius: "30px",
                mb: 4,
                "& .MuiInputBase-root": {
                  borderRadius: "30px",
                },
              }}
              InputProps={{
                style: {
                  backgroundColor: theme.palette.background.default,
                },

                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="학생 이름, 그룹 검색"
            />
          </Box>
          {searchResult && (
            <StudentListTable
              data={searchResult}
              accentColumnNum={-1}
              longWidthColumnNum={-1}
              type="student"
            />
          )}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <LongButton
              name="목록 받기"
              onClick={excelDownload}
              bgColor="primary.main"
              fontColor="white"
            />
          </Box>
        </>
      </Box>
    </Box>
  );
}
