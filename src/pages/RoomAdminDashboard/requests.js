import axios from 'axios';

export const getRoom = async (roomId) => {
  const res = await axios.get(`http://localhost:2000/room/${roomId}/auth`);
  return res.data;
};