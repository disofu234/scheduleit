import axios from "axios"
import { ROOT_URL } from 'constants/constants'

export const updateParticipant = async (eventId, participant, availability, timeZone) => {
  const res = await axios.post(`${ROOT_URL}/event/${eventId}`, { participant, availability, timeZone })
  return res.data
}