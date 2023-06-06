import {
  Avatar,
  Chip,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Typography,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import { Box } from "@mui/system";
import CustomTable from "../../components/CustomTable";
import { InfoIcon } from "../../theme/overrides/CustomIcons";
import { useEffect, useState } from "react";
import { getAllTeamsForRank } from "../../apis/rank";

import LooksOneIcon from "@mui/icons-material/LooksOne";
import HoverBox from "../../components/Rank/HoverBox";
import { AnimatePresence, motion } from "framer-motion";
import { Image } from "@mui/icons-material";

export default function Rank() {
  const [teams, setTeams] = useState([]);

  const [itemsHover, setItemsHover] = useState([]);

  useEffect(() => {
    getAllTeamsForRank().then((res) => {
      setTeams(res.teams);
      console.log(res.teams);
      setItemsHover(new Array(res.teams.length).fill(false));
    });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: "150px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: "50px",
          pb: "100px",
        }}
      >
        <Typography sx={{ fontSize: "30px", fontWeight: "300" }}>
          스터디 그룹 랭킹
        </Typography>
      </Box>

      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        <ImageList
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            width: "100%",
          }}
        >
          {teams.map((item, index) => (
            <div
              style={{
                position: "relative",
                width: "300px",
                // border: "1px solid black",
                height: "300px",
              }}
              onMouseOver={() =>
                setItemsHover((prev) => [
                  ...prev.slice(0, index),
                  true,
                  ...prev.slice(index + 1),
                ])
              }
              onMouseOut={() =>
                setItemsHover((prev) => [
                  ...prev.slice(0, index),
                  false,
                  ...prev.slice(index + 1),
                ])
              }
            >
              <AnimatePresence>
                {itemsHover[index] && (
                  <HoverBox
                    members={item.members}
                    reports={item.reports}
                    totalMinutes={item.totalMinutes}
                  />
                )}
              </AnimatePresence>
              <ImageListItem key={item.img} sx={{ position: "relative" }}>
                {!itemsHover[index] && (
                  <motion.img
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={`${item.thumbnail}`}
                    alt={item.title}
                    loading="lazy"
                  />
                )}
                <ImageListItemBar
                  sx={{
                    position: "absolute",
                    top: !itemsHover[index] ? 250 : 30,
                  }}
                  title={` ${
                    itemsHover[index] ? `Group ${item.id}` : `Rank ${index + 1}`
                  }`}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                      aria-label={`info about ${item.title}`}
                    >
                      <GroupsIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            </div>
          ))}
        </ImageList>
      </Grid>
    </Box>
  );
}
