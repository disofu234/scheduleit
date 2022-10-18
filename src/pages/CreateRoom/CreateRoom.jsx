import React, { useEffect, useState } from 'react'
import {
  ButtonWithStatus,
  Select,
  Redirects
} from 'ui-components'
import useForm from 'utils/hooks/useForm'
import {
  TIME_IN_DAY_OPTIONS
} from './utils/constants'
import {
  convertEventTargetValueToInteger
} from './utils/functions'
import { createEvent } from './requests'
import './CreateRoom.scss'
import DatePicker from './components/DatePicker'
import PagedForm from './components/PagedForm'
import {
  VALID_TIMEZONES
} from 'constants/constants'

const formInputs = [{ 
  name: 'earliestHourEventCanTakePlaceIn', 
}, {
  name: 'latestHourEventCanTakePlaceIn',
}, {
  name: 'timeZone',
  defaultValue: Intl.DateTimeFormat().resolvedOptions().timeZone
}]

const CreateRoom = () => {
  const [datesEventCanTakePlaceIn, setDatesEventCanTakePlaceIn] = useState([])
  const [inputs, inputErrors, onInputChange, verifyInputs, setInputs] = useForm(formInputs)
  const [eventId, setEventId] = useState('')

  useEffect(() => {
    if (inputs.earliestHourEventCanTakePlaceIn >= inputs.latestHourEventCanTakePlaceIn) {
      setInputs({ latestHourEventCanTakePlaceIn: undefined });
    };
  }, [inputs.earliestHourEventCanTakePlaceIn])

  const onCreateRoomButtonClick = async () => {
    const newEventId = await createEvent({
      earliestHourEventCanTakePlaceIn: inputs.earliestHourEventCanTakePlaceIn,
      latestHourEventCanTakePlaceIn: inputs.latestHourEventCanTakePlaceIn,
      datesEventCanTakePlaceIn,
      timeZone: inputs.timeZone
    })
    setEventId(newEventId)
  }

  return (
    <Redirects to={`/event/${eventId}`} shouldRedirect={eventId}>
      <div className='create-room-wrapper'>
        <PageTitle />
        <PagedForm 
          pages={[
            {
              message: "What dates can your event take place at?",
              content: (
                <DatePicker 
                  selectedDates={datesEventCanTakePlaceIn}
                  onSelectedDatesChange={(newSelectedDates => setDatesEventCanTakePlaceIn(newSelectedDates))}
                />
              ),
              shouldShowNextButton: datesEventCanTakePlaceIn.length > 0,
              shouldAnimateNextButton: datesEventCanTakePlaceIn.length === 0
            },
            {
              message: "What's the earliest and latest time your event can take place at?",
              content: (
                <>
                  <Select
                    label="Earliest time"
                    className="create-room-select"
                    onChange={onInputChange('earliestHourEventCanTakePlaceIn', convertEventTargetValueToInteger)} 
                    state={inputs.earliestHourEventCanTakePlaceIn} 
                    placeholder="Select a time" 
                    options={TIME_IN_DAY_OPTIONS.slice(0, TIME_IN_DAY_OPTIONS.length - 1)} 
                    errorMessage={inputErrors.earliestHourEventCanTakePlaceIn}
                  />
                  <Select 
                    label="Latest time"
                    className="create-room-select"
                    onChange={onInputChange('latestHourEventCanTakePlaceIn', convertEventTargetValueToInteger)} 
                    state={inputs.latestHourEventCanTakePlaceIn} 
                    placeholder="Select a time" 
                    options={TIME_IN_DAY_OPTIONS.slice(inputs.earliestHourEventCanTakePlaceIn + 1)}
                    errorMessage={inputErrors.latestHourEventCanTakePlaceIn}
                  />
                  <Select
                    label="Timezone"
                    className="create-room-select"
                    onChange={onInputChange('timeZone')}
                    state={inputs.timeZone}
                    options={VALID_TIMEZONES.map(({ label, tzCode }) => ({ value: tzCode, content: label }))}
                  />
                  <ButtonWithStatus 
                    buttonContent="Create event"
                    asyncAction={onCreateRoomButtonClick}
                    verifier={verifyInputs}
                    successMessage="Room was successfully created."
                  />
                </>
              )     
            }
          ]}
        />
      </div>
    </Redirects>
  )
};

const PageTitle = () => <div className="page-title">Create Event</div>;

export default CreateRoom;