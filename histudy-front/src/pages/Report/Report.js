import { Box, Typography } from "@mui/material";
import CustomTable from "../../components/CustomTable";
import LongButton from "../../components/LongButton";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyTeamReport, getmyTeamReport } from "../../apis/report";

const data = [
  ["1", "보고서 제목 1", "글쓴이 1", "2023-05-13"],
  ["2", "보고서 제목 2", "글쓴이 2", "2024-05-13"],
  ["3", "보고서 제목 3", "글쓴이 3", "2023-05-13"],
  ["4", "보고서 제목 4", "글쓴이 4", "2024-05-13"],
  ["5", "보고서 제목 5", "글쓴이 5", "2023-05-13"],
  ["6", "보고서 제목 6", "글쓴이 6", "2024-05-13"],
];

export default function Report() {
  // const [data, setData] = useState([]);

  const [reports, setReports] = useState([]);
  const [convertedReports, setConvertedReports] = useState([]);

  const dateConverter = (regDate) => {
    const date = new Date(regDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  useEffect(() => {
    getMyTeamReport().then((res) => {
      setReports(res.reports);

      setConvertedReports(
        res.reports.map((report) => [
          report.title,
          report.totalMinutes,
          dateConverter(report.regDate),
          // new Date(report.regDate).toLocaleDateString("en-US"),
        ])
      );
    });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: " flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "900px",

          alignItems: "end",
          my: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">제출한 보고서 목록</Typography>
      </Box>

      <Box
        sx={{
          width: "900px",
          display: "flex",
          justifyContent: "end",

          mb: "50px",
        }}
      >
        <Link to="/add">
          <LongButton
            name="보고서 작성"
            bgColor="primary.main"
            fontColor="white"
          />
        </Link>
      </Box>
      <Box sx={{ width: "900px" }}>
        <CustomTable
          data={convertedReports}
          reportData={reports}
          accentColumnNum={1}
          longWidthColumnNum={-1}
          type="report"
        />
      </Box>
    </Box>
  );
}
