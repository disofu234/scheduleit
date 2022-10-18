import axios from "axios"
import { ROOT_URL } from 'constants/constants'

export const createParticipant = async (eventId, participant) => {
  const res = await axios.post(`${ROOT_URL}/event/${eventId}`, {
    participant: participant,
    availability: null,
    timeZone: null
  })

  return res.data
}