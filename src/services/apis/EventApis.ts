import axios from 'axios';

const eventApi = axios.create({
  baseURL: 'https://tribee-be.onrender.com/api/v1/event',
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
});

const getEventList = async (status: string) => {
  const response = await eventApi.get(`?status=${status}`);
  return response.data;
};

const getEventDetail = async (eventId: string) => {
  const response = await eventApi.get(`/${eventId}`);
  return response.data;
};

export { getEventDetail, getEventList };
