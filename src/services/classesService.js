import axios from 'axios';

const API= axios.create(
    {
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    },
);

export const getClasses = async ()=>{
    const response = await API.get('classes');
    return response.data;
};

export const singUpInClass = async (classId) => {
    const response = await API.post(`classes/reserve/${classId}`);
    return response.data;
};

export const singOutFromClass= async (classId) => {
    const response = await API.post(`classes/remove_participant/${classId}`);
    return response.data;
};

export const addClasses = async (classesData) => {
  const { name, coach, location, seats, start_date, end_date } = classesData;
  const response = await API.post('/classes', {
    name,
    coach,
    location,
    seats,
    start_date,
    end_date,
  });
  return response.data;
};