import axios from 'axios';

export const getRoomMetadata = async (roomId) => {
  const res = await axios.get(`http://localhost:2000/room/${roomId}`);
  return res.data;
};

export const getAvailability = async (roomId, userId) => { 
  const res = await axios.get(`http://localhost:2000/room/${roomId}/availability/${userId}`);
  return res.data;
};

export const saveAvailability = (availability, roomId, userId) => axios.put(`http://localhost:2000/room/${roomId}/availability/${userId}`, availability);