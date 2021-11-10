import axios from 'axios';

export const createRoom = async (roomParams) => {
  const res = await axios.post(`http://localhost:2000/room`, roomParams);
  return res.data.roomId;
};