import axios from "axios";

export const postReport = async (data) => {
  const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.post(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/team/reports`,
    data,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const getMyTeamReport = async () => {
  const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.get(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/team/reports`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const deleteReport = (reportId) => {
  const TOKEN = localStorage.getItem("accessToken");

  const response = axios.delete(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/team/reports/${reportId}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    }
  );
  return response;
};

export const modifyReport = (reportId, data) => {
  const TOKEN = localStorage.getItem("accessToken");

  const response = axios.patch(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/team/reports/${reportId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    }
  );
  return response;
};
