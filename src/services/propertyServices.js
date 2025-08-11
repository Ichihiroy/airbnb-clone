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

export function deleteProperty(id) {
  return axios
    .delete(`${API_URL}/properties/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error deleting property:", error);
      throw error;
    });
}

export function updateProperty(id, propertyData) {
  return axios
    .put(`${API_URL}/properties/${id}`, propertyData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating property:", error);
      throw error;
    });
}

export function addProperty(propertyData) {
  return axios
    .post(`${API_URL}/properties`, propertyData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding property:", error);
      throw error;
    });
}
