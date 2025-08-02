import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export function registerUser(userData) {
  return axios.post(`${API_URL}/users`, userData);
}

export function getUserByUsernameAndPassword(username, password) {
  return axios.get(
    `${API_URL}/users?username=${username}&password=${password}`
  );
}

export function getUserByUsername(username) {
  return axios.get(`${API_URL}/users?username=${username}`);
}

export function getUserByEmail(email) {
  return axios.get(`${API_URL}/users?email=${email}`);
}
