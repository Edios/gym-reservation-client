import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/auth`;

export const login = async (email, password) => {
    const response = await axios.post('${API_URL}/login', {email,password});
    return response.data;
};

export const logout = async () => localStorage.removeItem('token');
export const getToken = async () => localStorage.getItem('token');
export const isAuthenticated = async () => !!getToken();
