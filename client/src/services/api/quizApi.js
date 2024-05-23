import axios from "axios";
import { URL } from "../../../constant.js";
export const createQuiz = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${URL}/quiz`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const dashboard = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const analytics = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/analytics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (e) {
    throw e;
  }
};

export const deleteQuiz = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${URL}/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const analysis = async (id) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await axios.get(`${URL}/quizAnalysis/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const updateQuiz = async (id, data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${URL}/quiz/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fetchQuizData = async (id) => {
  try {
    const response = await axios.get(`${URL}/quiz/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const submitQuiz = async (id, data) => {
  try {
    const response = await axios.post(`${URL}/quiz/${id}`, data);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
