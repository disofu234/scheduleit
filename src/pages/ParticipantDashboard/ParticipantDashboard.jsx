import React, { useState } from 'react'
import './ParticipantDashboard.scss'
import {
  constructAvailabilityArray,
  convertTimesBasedOnTimeZone,
  constructAggregatedAvailabilityArray,
  constructAvailabilityArrayFromAggregatedAvailabilities
} from './utils/functions'
import {
  Message,
  Select
} from 'ui-components'
import TimePicker from './components/TimePicker'
import EventTimePicker from './components/EventTimePicker'
import {
  VALID_TIMEZONES
} from './utils/constants'

const earliestHourInDay = 4
const latestHourInDay = 12
const dates = ['Nov 8, 2022', 'Nov 9, 2022']
const eventTimeZone = 'America/Chicago'
const participants = ['Diego', 'Tiny', 'Ada']
const currentParticipant = 'Diego'

const initialAggregatedAvailabilities = constructAggregatedAvailabilityArray(earliestHourInDay, latestHourInDay, dates, eventTimeZone, participants)
const initialSelectedTimes = constructAvailabilityArrayFromAggregatedAvailabilities(initialAggregatedAvailabilities, currentParticipant)

const ParticipantDashboard = () => {
  const [selectedTimeZone, setSelectedTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const [selectedTimes, setSelectedTimes] = useState(convertTimesBasedOnTimeZone(initialSelectedTimes, eventTimeZone, selectedTimeZone))
  const [aggregatedAvailabilities, setAggregatedAvailabilities] = useState(convertTimesBasedOnTimeZone(initialAggregatedAvailabilities, eventTimeZone, selectedTimeZone))
  const [participantAvailabilityTableProps, setParticipantAvailabilityTableProps] = useState(null)

  const onTimeZoneChange = (targetTimeZone) => {
    setSelectedTimeZone(targetTimeZone)
    setSelectedTimes(convertTimesBasedOnTimeZone(selectedTimes, selectedTimeZone, targetTimeZone))
  }

  const onSelectedTimesChange = (newSelectedTimes) => {
    setSelectedTimes(newSelectedTimes)

    const newAggregatedAvailabilities =
      aggregatedAvailabilities.map(({ earlyTimeString, lateTimeString, participantsAvailable }, ind) => ({
        earlyTimeString,
        lateTimeString,
        participantsAvailable:
          newSelectedTimes[ind].isSelected ?
            !participantsAvailable.includes(currentParticipant) ? [...participantsAvailable, currentParticipant] : [...participantsAvailable] :
            participantsAvailable.includes(currentParticipant) ? participantsAvailable.filter(participant => participant !== currentParticipant) : [...participantsAvailable]
    }))

    setAggregatedAvailabilities(newAggregatedAvailabilities)
  }

  return (
    <div className="participant-dashboard-wrapper">
      {!participantAvailabilityTableProps ?
        <div>
          <div className="dashboard-text">
            <Message>Your availability</Message>
          </div>
          <Select 
            label="Timezone"
            onChange={e => onTimeZoneChange(e.target.value) }
            options={VALID_TIMEZONES.map(({ label, tzCode }) => ({ value: tzCode, content: label }))}
            state={selectedTimeZone}
            className="select"
          />
          <TimePicker 
            selectedTimes={selectedTimes}
            onSelectedTimesChange={newSelectedTimes => onSelectedTimesChange(newSelectedTimes)}
            timeZone={selectedTimeZone}
          />
        </div> :
        <ParticipantAvailabilityTable
          participants={participants}
          {...participantAvailabilityTableProps}
        />
      }
      <div>
        <div className="dashboard-text">
          <Message>Group's availability</Message>
        </div>
        <EventTimePicker
          aggregatedAvailabilities={aggregatedAvailabilities}
          onTimeTickEnter={(earlyTime, lateTime, participantsAvailable) => setParticipantAvailabilityTableProps({ earlyTime, lateTime, participantsAvailable })}
          onTimeTickLeave={() => setParticipantAvailabilityTableProps(null)}
          participants={participants}
          timeZone={selectedTimeZone}
        />
      </div>
    </div>
  )
}

const ParticipantAvailabilityTable = ({
  participants,
  participantsAvailable,
  earlyTime,
  lateTime
}) => {
  const participantsNotAvailable = participants.filter(participant => !participantsAvailable.includes(participant))
  const numRows = Math.max(participantsAvailable.length, participantsNotAvailable.length)
  const isRightHeavy = participantsAvailable.length >= participantsNotAvailable.length

  const tdClass = isRightHeavy ? 'pat-body-right' : 'pat-body-left'

  return (
    <div>
      <div className="dashboard-text">
        <Message>Availability from {earlyTime} to {lateTime}</Message>
      </div>
      <table className='participant-availability-table'>
        <thead>
          <tr>
            <th className='pat-header'>Available</th>
            <th className='pat-header'>Not available</th>
          </tr>
        </thead>
        <tbody>
          {range(numRows).map(ind => (
            <tr>
              <td className={tdClass}>{ind < participantsAvailable.length ? participantsAvailable[ind] : null}</td>
              <td className={tdClass}>{ind < participantsNotAvailable.length ? participantsNotAvailable[ind] : null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const range = (num) => {
  const arr = []
  for (let i = 0; i < num; i++) {
    arr.push(i)
  }
  
  return arr
}

export default ParticipantDashboard