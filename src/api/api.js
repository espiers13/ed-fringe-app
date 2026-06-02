import axios from "axios";
import CryptoJS from "crypto-js";

const API_KEY = import.meta.env.VITE_FESTIVAL_API_KEY;
const SECRET = import.meta.env.VITE_FESTIVAL_SECRET;

const festivalApi = axios.create({
  baseURL: "/festival-api",
});

function signUrl(path) {
  const signature = CryptoJS.HmacSHA1(path, SECRET).toString(CryptoJS.enc.Hex);
  return `${path}&signature=${signature}`;
}

export const getAllEvents = (page = 1, date = "", genre = "") => {
  let path = `/events?festival=demofringe&from=${page}&size=25`;
  if (date) path += `&date_from=${encodeURIComponent(date + " 00:00:00")}`;
  if (genre) path += `&genre=${encodeURIComponent(genre)}`;
  path += `&key=${API_KEY}`;
  const signedUrl = signUrl(path);
  return festivalApi
    .get(signedUrl)
    .then(({ data }) => data ?? [])
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
