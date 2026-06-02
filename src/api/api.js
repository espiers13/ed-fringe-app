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

export const getAllEvents = () => {
  const path = `/events?festival=demofringe&size=25&key=${API_KEY}`;
  const signedUrl = signUrl(path);
  return festivalApi
    .get(signedUrl)
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
