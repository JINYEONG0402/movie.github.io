import axios from "axios";

let API_KEY = "";

export const setApiKey = (key: string) => {
  API_KEY = key;
};

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const fetchMovies = async (endpoint: string, params = {}) => {
  try {
    const response = await instance.get(endpoint, {
      params: { ...params, api_key: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("TMDB API Error:", error);
    throw error;
  }
};
