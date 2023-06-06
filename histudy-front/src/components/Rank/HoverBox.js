import { Box, Chip, styled } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { AnimatePresence, motion } from "framer-motion";

const StyledChip = styled(Chip)({
  zIndex: 10,
  color: "white",
  backgroundColor: "grey",
  fontWeight: "bold",
  fontSize: "12px",
});

export default function HoverBox({ members, reports, totalMinutes }) {
  return (
    // <AnimatePresence>
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        position: "absolute",
        justifyContent: "center",
        left: 0,
        top: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          padding: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        {members.map((member) => (
          <StyledChip
            icon={<FaceIcon sx={{ fill: "white" }} />}
            label={`${member}`}
            variant="outlined"
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          padding: "20px",
          gap: "10px",
        }}
      >
        <StyledChip label="보고서 총 갯수" variant="outlined" />
        <StyledChip label={`${reports}개`} />
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "20px",
          gap: "10px",
        }}
      >
        <StyledChip label="스터디 총 시간" variant="outlined" />
        <StyledChip label={`${totalMinutes} 분`} />
      </Box>
    </Box>
  );
}
