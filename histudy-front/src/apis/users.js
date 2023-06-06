import axios from "axios";

export const postReport = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/users`,
    data
  );
  return response;
};

export const userLogin = async (sub) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/auth/login?sub=${sub}`
  );
  return response;
};

export const userSignup = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/users`,
    data
  );
  return response.data;
};

export const autoUser = async (search) => {
  const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.get(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/users?search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const getMyTeamUsers = async () => {
  const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.get(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/team/users`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
