import axios from 'axios';
import { ROOT_URL } from 'constants/constants'

export const createEvent = async (roomParams) => {
  const res = await axios.post(`${ROOT_URL}/event`, roomParams);
  return res.data.eventId;
};