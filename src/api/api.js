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

export const getAllEvents = (page = 1) => {
  const path = `/events?festival=demofringe&from=${page}&size=25&key=${API_KEY}`;
  const signedUrl = signUrl(path);
  return festivalApi
    .get(signedUrl)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const searchEvents = (query) => {
  const encodedQuery = encodeURIComponent(query);
  const path = `/events?festival=demofringe&title=${encodedQuery}&key=${API_KEY}`;
  const signedUrl = signUrl(path);
  return festivalApi
    .get(signedUrl)
    .then(({ data }) => data)
    .catch((err) => console.log(err));
};
