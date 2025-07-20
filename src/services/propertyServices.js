import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export function getAllProperties() {
  return axios
    .get(`${API_URL}/properties`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
