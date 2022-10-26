import axios from 'axios';
import { ROOT_URL } from 'constants/constants'

export const createEvent = async (roomParams) => {
  console.log(ROOT_URL)
  const res = await axios.post(`${ROOT_URL}/event`, roomParams);
  return res.data.eventId;
};