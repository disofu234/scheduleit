import axios from "axios"
import { ROOT_URL } from 'constants/constants'

export const getEvent = async (eventId) => {
  const res = await axios.get(`${ROOT_URL}/event/${eventId}`)
  return res.data
}