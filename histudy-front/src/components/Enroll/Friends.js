import { InputAdornment, TextField } from "@mui/material";
import CustomTable from "../CustomTable";
import { useEffect, useState } from "react";
import { autoUser } from "../../apis/users";
import SearchIcon from "@mui/icons-material/Search";

export default function Friends({ friends, setFriends }) {
  const friendConverter = (allFriends) => {
    const result = [];
    allFriends.map((elem) => {
      result.push([elem.name, elem.sid, elem.email]);
    });
    return result;
  };

  const [friendInput, setFriendInput] = useState("");
  const handleChange = (event) => {
    if (event.target.id === "friend") setFriendInput(event.target.value);
    // else {
    //   // courseInput onChange
    //   setCourseInput(event.target.value);
    // }
  };

  useEffect(() => {
    autoUser(friendInput).then((res) => {
      setFriends(friendConverter(res.users));
      console.log("users", res.users);
    });
  }, [friendInput]);

  return (
    <>
      <TextField
        id="friend"
        type="search"
        label="Search"
        value={friendInput}
        onChange={handleChange}
        sx={{ width: "100%", borderRadius: "30px", mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="친구 이름 검색"
      />
      <CustomTable
        data={friends}
        accentColumnNum={-1}
        longWidthColumnNum={-1}
        type="first"
      />
    </>
  );
}
