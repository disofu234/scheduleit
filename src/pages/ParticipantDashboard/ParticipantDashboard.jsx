import React, { useState } from 'react'
import './ParticipantDashboard.scss'
import {
  convertTimesBasedOnTimeZone,
  constructAvailabilityArrayFromAggregatedAvailabilities
} from './utils/functions'
import {
  Message,
  Select,
  CheckboxGroup,
  Loader
} from 'ui-components'
import TimePicker from './components/TimePicker'
import EventTimePicker from './components/EventTimePicker'
import {
  VALID_TIMEZONES
} from 'constants/constants'
import { useWidth } from './utils/hooks'
import { range } from 'utils/functions'
import { getEvent, updateParticipant } from './requests'
import { UI_ROOT_URL } from 'constants/constants'

const eventTimeZone = 'UTC'

const ParticipantDashboard = ({
  loadedAggregatedAvailabilities,
  loadedParticipants,
  currentParticipant, 
  eventId 
}) => {
  const [selectedTimeZone, setSelectedTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const [aggregatedAvailabilities, setAggregatedAvailabilities] = useState(
    convertTimesBasedOnTimeZone(loadedAggregatedAvailabilities, eventTimeZone, selectedTimeZone))
  const [availability, setAvailability] = useState(
    convertTimesBasedOnTimeZone(
      constructAvailabilityArrayFromAggregatedAvailabilities(
        loadedAggregatedAvailabilities, 
        currentParticipant),
      eventTimeZone,
      selectedTimeZone))
  const [participantAvailabilityTableProps, setParticipantAvailabilityTableProps] = useState(null)
  const [shouldShowModal, setShouldShowModal] = useState(false)
  const [participants, setParticipants] = useState(loadedParticipants)
  const [selectedParticipants, setSelectedParticipants] = useState(loadedParticipants)
  const [shouldShowGroupAvailability, setShouldShowGroupAvailability] = useState(false)

  const onTimeZoneChange = (targetTimeZone) => {
    setSelectedTimeZone(targetTimeZone)
    setAvailability(convertTimesBasedOnTimeZone(availability, selectedTimeZone, targetTimeZone))
    setAggregatedAvailabilities(convertTimesBasedOnTimeZone(aggregatedAvailabilities, selectedTimeZone, targetTimeZone))
  }

  const onSelectedTimesChange = (newSelectedTimes) => {
    setAvailability(newSelectedTimes)

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

    const newAvailability = newSelectedTimes.map(({ earlyTimeString, lateTimeString, isSelected }) => ({ earlyTimeString, lateTimeString, isAvailable: isSelected }))
    updateParticipant(eventId, currentParticipant, newAvailability, selectedTimeZone)
      .then(({ 
        aggregatedAvailabilities: loadedAggregatedAvailabilities,
        participants: loadedParticipants
       }) => {
         setAggregatedAvailabilities(convertTimesBasedOnTimeZone(loadedAggregatedAvailabilities, eventTimeZone, selectedTimeZone))
         setParticipants(loadedParticipants)
       })
  }

  const width = useWidth()
  const isSmallScreen = width < 500

  return (
    <>
      {shouldShowModal && 
        <ParticipantDashboardModal 
          closeModal={() => setShouldShowModal(false)}
          participants={participants}
          selectedParticipants={selectedParticipants}
          aggregatedAvailabilities={aggregatedAvailabilities}
          setSelectedParticipants={setSelectedParticipants}  
        />
      }
      <div className="page-title">Select availability</div>
      <div className="participant-dashboard-share">{"To share this event with someone direct them to: "}
        <a className="participang-dashboard-share-link" href={`${UI_ROOT_URL}/event/${eventId}`}>{`${UI_ROOT_URL}/event/${eventId}`}</a>
      </div>
      <div className="participant-dashboard-wrapper">
        {(!isSmallScreen || !shouldShowGroupAvailability) && 
          <Select 
            label="Timezone"
            onChange={e => onTimeZoneChange(e.target.value) }
            options={VALID_TIMEZONES.map(({ label, tzCode }) => ({ value: tzCode, content: label }))}
            state={selectedTimeZone}
            className="participant-dashboard-select"
          />}
        <div></div>
        {isSmallScreen ?
          shouldShowGroupAvailability ?
            <GroupAvailability
              aggregatedAvailabilities={aggregatedAvailabilities}
              setParticipantAvailabilityTableProps={setParticipantAvailabilityTableProps}
              selectedParticipants={selectedParticipants}
              selectedTimeZone={selectedTimeZone}
              setShouldShowModal={setShouldShowModal}
            /> :
            <PersonalAvailability
              availability={availability}
              onSelectedTimesChange={onSelectedTimesChange}
              selectedTimeZone={selectedTimeZone}
            /> :
          !participantAvailabilityTableProps ?
            <PersonalAvailability
              availability={availability}
              onSelectedTimesChange={onSelectedTimesChange}
              selectedTimeZone={selectedTimeZone}
            />
            :
            <ParticipantAvailabilityTable
              participants={selectedParticipants}
              {...participantAvailabilityTableProps}
            />
        }
        {!isSmallScreen &&
          <GroupAvailability
            aggregatedAvailabilities={aggregatedAvailabilities}
            setParticipantAvailabilityTableProps={setParticipantAvailabilityTableProps}
            selectedParticipants={selectedParticipants}
            selectedTimeZone={selectedTimeZone}
            setShouldShowModal={setShouldShowModal}
          />
        }
        {isSmallScreen &&
          <div className="participant-dashboard-link-wrapper">
            <div className="participant-dashboard-link" onClick={() => setShouldShowGroupAvailability(!shouldShowGroupAvailability)}>{shouldShowGroupAvailability ? "See my availability" : "See group availability"}</div>
          </div>
        }
      </div>
    </>
  )
}

const GroupAvailability = ({
  aggregatedAvailabilities,
  setParticipantAvailabilityTableProps,
  selectedParticipants,
  selectedTimeZone,
  setShouldShowModal
}) => 
  <div className="group-availability-wrapper">
    <div className="dashboard-text">
      <Message>Group's availability</Message>
    </div>
    <EventTimePicker
      aggregatedAvailabilities={aggregatedAvailabilities}
      onTimeTickEnter={(earlyTime, lateTime, participantsAvailable) => setParticipantAvailabilityTableProps({ earlyTime, lateTime, participantsAvailable })}
      onTimeTickLeave={() => setParticipantAvailabilityTableProps(null)}
      participants={selectedParticipants}
      timeZone={selectedTimeZone}
    />
    <p className="participant-modal-link" onClick={() => setShouldShowModal(true)}>Manage participants</p>
  </div>

const PersonalAvailability = ({
  availability,
  onSelectedTimesChange,
  selectedTimeZone
}) =>
  <div>
    <div className="dashboard-text">
      <Message>Your availability</Message>
    </div>
    <TimePicker 
      selectedTimes={availability}
      onSelectedTimesChange={newSelectedTimes => onSelectedTimesChange(newSelectedTimes)}
      timeZone={selectedTimeZone}
    />
  </div>

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

const ParticipantDashboardModal = ({ participants, closeModal, selectedParticipants, setSelectedParticipants, aggregatedAvailabilities }) => {
  const sortedParticipantsWithAvailabilities = sortParticipantsBasedOnAvailability(participants, aggregatedAvailabilities)

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={() => closeModal()}>&times;</span>
        <div className="modal-text">
          <Message>Selected participants</Message>
          <div className="participants-checkbox-wrapper">
            <CheckboxGroup
              labels={sortedParticipantsWithAvailabilities.map(({ participant, availabilityScore }) => `${participant} - available at ${availabilityScore} times`)}
              values={sortedParticipantsWithAvailabilities.map(({ participant }) => participant)}
              selected={selectedParticipants}
              onSelectedChange={newSelectedParticipants => setSelectedParticipants(newSelectedParticipants)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const sortParticipantsBasedOnAvailability = (participants, aggregatedAvailabilities) =>
  participants
  .map(participant => ({ participant, availabilityScore: countParticipantAvailability(participant, aggregatedAvailabilities) }))
  .sort((a, b) => b.availabilityScore - a.availabilityScore)

const countParticipantAvailability = (participant, aggregatedAvailabilities) =>
  aggregatedAvailabilities.reduce((availabilityScore, { participantsAvailable }) => availabilityScore + participantsAvailable.filter(x => x === participant).length, 0)

export default ParticipantDashboard