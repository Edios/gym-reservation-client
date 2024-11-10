import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {email, password});
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.userId);
    console.log(response)
    return response.data;
};

export const register = async (name,email, password) => {
  const response = await axios.post(`${API_URL}/register`, {name,email, password });
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('userId', response.data.userId);
  return response.data;
};

export const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
};

export const getToken = async () => localStorage.getItem('token');
export const getUserId = () => localStorage.getItem('userId');
export const isAuthenticated = async () => !!getToken();
