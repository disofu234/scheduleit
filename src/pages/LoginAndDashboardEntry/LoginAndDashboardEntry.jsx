import React, { useState } from 'react'
import Login from 'pages/Login'
import ParticipantDashboard from 'pages/ParticipantDashboard'
import { getEvent } from './requests'

const LoginAndDashboardEntry = ({ match }) => {
  const [currentParticipant, setCurrentParticipant] = useState(null)
  const [aggregatedAvailabilities, setAggregatedAvailabilities] = useState(null)
  const [participants, setParticipants] = useState(null)

  const eventId = match.params.eventId

  const loadEventData = async () => {
    const { aggregatedAvailabilities, participants } = await getEvent(eventId)
    setAggregatedAvailabilities(aggregatedAvailabilities)
    setParticipants(participants)
  }

  return (currentParticipant && aggregatedAvailabilities && participants) ?
    <ParticipantDashboard 
      currentParticipant={currentParticipant} 
      eventId={eventId} 
      loadedAggregatedAvailabilities={aggregatedAvailabilities}
      loadedParticipants={participants}  
    /> :
    <Login setCurrentParticipant={setCurrentParticipant} eventId={eventId} loadEventData={loadEventData} />
}

export default LoginAndDashboardEntry