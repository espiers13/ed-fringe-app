import axios from "axios";

const userApi = axios.create({
  baseURL: "https://ed-fringe-be.onrender.com/api",
});

export const getAllEvents = (
  page = 1,
  date = "",
  genre = "",
  lat = "",
  lon = "",
  distance = "",
  size = "25",
) => {
  return userApi
    .get("/festivals/events", {
      params: { page, size, date, genre, lat, lon, distance },
    })
    .then(({ data }) => data ?? [])
    .catch((err) => {
      throw err;
    });
};

export const getEventByCode = (code) => {
  return userApi
    .get(`/festivals/events/${code}`)
    .then(({ data }) => data ?? null)
    .catch((err) => {
      throw err;
    });
};

export const searchEvents = (query) => {
  return userApi
    .get("/festivals/search", {
      params: { query },
    })
    .then(({ data }) => data ?? [])
    .catch((err) => {
      throw err;
    });
};

export const loginUser = (username, password) => {
  return userApi
    .post("/login", { username, password })
    .then(({ data }) => data)
    .catch((err) => {
      throw err;
    });
};

export const createUser = (name, username, email, password) => {
  return userApi
    .post("/signup", { name, username, email, password })
    .then(({ data }) => data)
    .catch((err) => {
      throw err;
    });
};

export const getSchedule = (user_id, token) => {
  return userApi
    .get(`/schedule/${user_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data)
    .catch((err) => console.log(err));
};

export const removeFromSchedule = (user_id, token, code) => {
  return userApi
    .patch(
      `/schedule/${user_id}`,
      { code },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    .then(({ data }) => data)
    .catch((err) => console.log(err));
};

export const addToSchedule = (user_id, token, code) => {
  return userApi
    .post(
      `/schedule/${user_id}`,
      { code },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    .then(({ data }) => data)
    .catch((err) => console.log(err));
};

export const deleteAccount = (username, password) => {
  return userApi
    .post("/user/delete", { username, password })
    .then(({ data }) => data)
    .catch((err) => {
      throw err;
    });
};

export const changePassword = (username, currentPassword, newPassword) => {
  return userApi
    .patch(`/user/password`, {
      username,
      currentPassword,
      newPassword,
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const forgotPassword = (email) => {
  return userApi
    .post("/forgot-password", { email })
    .then(({ data }) => data)
    .catch((err) => {
      throw err;
    });
};

export const resetPassword = (token, newPassword) => {
  return userApi
    .post("/reset-password", { token, newPassword })
    .then(({ data }) => data)
    .catch((err) => {
      throw err;
    });
};
