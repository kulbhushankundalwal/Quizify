import axios from "axios";
import { URL } from "../../../constant";

export const signup = async (data) => {
  try {
    const response = await axios.post(`${URL}/signup`, data);

    return response.data;
  } catch (e) {
    throw e;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${URL}/login`, data);
    console.log(response.data);
    return response.data;
  } catch (e) {
    throw e;
  }
};
