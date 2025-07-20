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

export function getPropertyById(id) {
  return axios
    .get(`${API_URL}/properties/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching property:", error);
    });
}
