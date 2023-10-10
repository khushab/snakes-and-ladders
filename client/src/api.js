import axios from "axios";

import {
  getAuthTokenFromLocalStorage,
  setAuthTokenInLocalStorage,
  removeAuthTokenFromLocalStorage,
} from "./utils";

const API_BASE_URL = process.env.BASE_URL || "http://localhost:3100/api";

// Function to register
export const register = async (name, username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, {
      name,
      username,
      password,
    });
    const { data } = response;
    setAuthTokenInLocalStorage(data.token);
    return data.user;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Something went wrong, please try again";

    throw new Error(errorMessage);
  }
};

// Function to log in
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      username,
      password,
    });

    const { data } = response;
    setAuthTokenInLocalStorage(data.token);
    return data.user;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Something went wrong, please try again";

    throw new Error(errorMessage);
  }
};

// Function to log in
export const logout = async () => {
  try {
    const token = getAuthTokenFromLocalStorage();
    removeAuthTokenFromLocalStorage();
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get(`${API_BASE_URL}/users/logout`);
      return data;
    }
  } catch (error) {
    throw error;
  }
};

// Function to get the logged in user details
export const getLoggedInUser = async () => {
  try {
    const token = getAuthTokenFromLocalStorage();
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(`${API_BASE_URL}/users/getCurrUserData`);
      const { data } = response;
      return data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const saveMatch = async (playersPos, gameId) => {
  try {
    const token = getAuthTokenFromLocalStorage();

    if (!token) {
      throw new Error("User not logged in");
    }

    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(`${API_BASE_URL}/savedMatches/save`, {
      playersPos,
      gameId,
    });

    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSavedMatches = async () => {
  try {
    const token = getAuthTokenFromLocalStorage();

    if (!token) {
      throw new Error("User not logged in");
    }

    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(
      `${API_BASE_URL}/savedMatches/getSavedMatches`
    );

    const { data } = response;
    return data.result;
  } catch (error) {
    throw error;
  }
};

export const getSavedMatch = async (id) => {
  try {
    const token = getAuthTokenFromLocalStorage();

    if (!token) {
      throw new Error("User not logged in");
    }

    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(
      `${API_BASE_URL}/savedMatches/getSavedMatch/${id}`
    );

    const { data } = response;
    return data.result;
  } catch (error) {
    throw error;
  }
};

export const deleteSavedMatch = async (id) => {
  try {
    const token = getAuthTokenFromLocalStorage();

    if (!token) {
      throw new Error("User not logged in");
    }

    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.delete(
      `${API_BASE_URL}/savedMatches/getSavedMatch/${id}`
    );

    const { data } = response;
    return data.result;
  } catch (error) {
    throw error;
  }
};

export const saveScore = async (score) => {
  try {
    const token = getAuthTokenFromLocalStorage();

    if (!token) {
      throw new Error("User not logged in");
    }
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(
      `${API_BASE_URL}/scores/saveUserScore/`,
      score
    );
    const { data } = response;
  } catch (error) {
    throw error;
  }
};
export const getLeaderboard = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/scores/getLeaderboard`);

    const { data } = response;
    return data.result;
  } catch (error) {
    throw error;
  }
};
