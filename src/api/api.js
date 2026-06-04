import axios from "axios";
import CryptoJS from "crypto-js";

const API_KEY = import.meta.env.VITE_FESTIVAL_API_KEY;
const SECRET = import.meta.env.VITE_FESTIVAL_SECRET;

const festivalApi = axios.create({
  baseURL: "/festival-api",
});

const userApi = axios.create({
  baseURL: "https://ed-fringe-be.onrender.com/api",
});

function signUrl(path) {
  const signature = CryptoJS.HmacSHA1(path, SECRET).toString(CryptoJS.enc.Hex);
  return `${path}&signature=${signature}`;
}

export const getAllEvents = (
  page = 1,
  date = "",
  genre = "",
  lat = "",
  lon = "",
  distance = "",
) => {
  let path = `/events?festival=demofringe&from=${page}&size=25`;

  console.log(path);

  if (date) {
    path += `&date_from=${encodeURIComponent(date + " 00:00:00")}`;
    path += `&date_to=${encodeURIComponent(date + " 23:59:59")}`;
  }
  if (genre) path += `&genre=${encodeURIComponent(genre)}`;
  if (lat && lon) {
    path += `&lat=${lat}&lon=${lon}`;
    if (distance) path += `&distance=${distance}`;
  }
  path += `&key=${API_KEY}`;
  const signedUrl = signUrl(path);

  return festivalApi
    .get(signedUrl)
    .then(({ data }) => data ?? [])
    .catch((err) => console.log(err));
};

export const getEventByCode = (code) => {
  const path = `/events?festival=demofringe&code=${code}&key=${API_KEY}`;
  const signedUrl = signUrl(path);
  return festivalApi
    .get(signedUrl)
    .then(({ data }) => data[0] ?? null)
    .catch((err) => console.log(err));
};

export const searchEvents = (query) => {
  const encodedQuery = encodeURIComponent(query);

  const titleSearch = festivalApi.get(
    signUrl(`/events?festival=demofringe&title=${encodedQuery}&key=${API_KEY}`),
  );
  const artistSearch = festivalApi.get(
    signUrl(
      `/events?festival=demofringe&artist=${encodedQuery}&key=${API_KEY}`,
    ),
  );

  return Promise.all([titleSearch, artistSearch])
    .then(([titleResults, artistResults]) => {
      const combined = [...titleResults.data, ...artistResults.data];
      const unique = combined.filter(
        (event, index, self) =>
          index === self.findIndex((e) => e.url === event.url),
      );
      return unique;
    })
    .catch((err) => console.log(err));
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
