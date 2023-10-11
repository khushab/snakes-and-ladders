import axios from "axios";

import {
  getAuthTokenFromLocalStorage,
  setAuthTokenInLocalStorage,
  removeAuthTokenFromLocalStorage,
} from "./utils";

const API_BASE_URL =
  process.env.REACT_APP_API_URL + "api" || "http://localhost:3200/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Function to register
export const register = async (name, username, password) => {
  try {
    const response = await axiosInstance.post(`/users/register`, {
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
    const response = await axiosInstance.post(`/users/login`, {
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
      axiosInstance.defaults.headers.common["Authorization"] = token;
      const { data } = await axiosInstance.get(`/users/logout`);
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
      axiosInstance.defaults.headers.common["Authorization"] = token;
      const response = await axiosInstance.get(`/users/getCurrUserData`);
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

    axiosInstance.defaults.headers.common["Authorization"] = token;
    const response = await axiosInstance.post(`/savedMatches/save`, {
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

    axiosInstance.defaults.headers.common["Authorization"] = token;
    const response = await axiosInstance.get(`/savedMatches/getSavedMatches`);

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

    axiosInstance.defaults.headers.common["Authorization"] = token;
    const response = await axiosInstance.get(
      `/savedMatches/getSavedMatch/${id}`
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

    axiosInstance.defaults.headers.common["Authorization"] = token;
    const response = await axiosInstance.delete(
      `/savedMatches/getSavedMatch/${id}`
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
    axiosInstance.defaults.headers.common["Authorization"] = token;
    const response = await axiosInstance.post(`/scores/saveUserScore/`, score);
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};
export const getLeaderboard = async (id) => {
  try {
    const response = await axiosInstance.get(`/scores/getLeaderboard`);

    const { data } = response;
    return data.result;
  } catch (error) {
    throw error;
  }
};
