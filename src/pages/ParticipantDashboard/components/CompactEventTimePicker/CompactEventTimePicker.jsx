import React, {useState} from 'react'
import { MINUTE_GRANULARITY } from "ui-components/TimePicker2/constants"
import { constructTime, constructTimeFromString } from 'utils/constructors/constructTime'
import { HorizontalPager, Message } from 'ui-components'
import './CompactEventTimePicker.scss'

import './CompactEventTimePicker.scss'

const CompactEventTimePicker = ({
  aggregatedAvailabilities, 
  eventDuration, 
  timeZone
}) => {
  const dates = Object.keys(aggregatedAvailabilities)
  const [selectedDate, setSelectedDate] = useState(dates[0])

  const compactEventTimes = parseAggregatedAvailabilities(aggregatedAvailabilities, eventDuration, timeZone)
  if (!compactEventTimes[selectedDate]) {
    setSelectedDate(dates[0])
  }

  return (
    <>
      <HorizontalPager maxNumElementsInPage={1} onPageChange={(page) => setSelectedDate(dates[page])}>
        {dates.map((date, ind) => <Message key={ind} className = "compact-event-time-picker-text">{date}</Message>)}
      </HorizontalPager>
      <HorizontalPager maxNumElementsInPage={1}>
        {compactEventTimes[selectedDate].map((availableTime, ind) => <Message key={ind} className = "compact-event-time-picker-text">{availableTime}</Message>)}
      </HorizontalPager>
    </>
  )
}

const constructAggregatedAvailabilitiesObject = (
  earliestHour,
  latestHour,
  dates,
  timeZone
) => dates.reduce((availabilityObject, date) => {
  const availabilityInDayObject = constructTime(earliestHour, 0, date, timeZone, false).addMinutes(MINUTE_GRANULARITY).getListOfTimesTo(constructTime(latestHour, 0, date, timeZone, false, latestHour === 24), MINUTE_GRANULARITY).reduce(
    (obj, time) => {
      obj[time.toStringMilitaryForm()] = [true, false][Math.floor(Math.random() * 2)]

      return obj
    }, {});

  availabilityObject[date] = { ...availabilityInDayObject }

  return availabilityObject
}, {})

const summarizeAggregatedAvailabilities = (aggregatedAvailabilities, participants) => 
  shallowObjectMap(
    aggregatedAvailabilities,
    aggregatedAvailabilitiesInDay => shallowObjectMap(
      aggregatedAvailabilitiesInDay,
      participantsAvailableAtTime => participantsAvailableAtTime.length === participants.length
    )
  )

const shallowObjectMap = (obj, mapFunc) => Object.fromEntries(
  Object.keys(obj).map(key => [key, mapFunc(obj[key])])
)

const parseAggregatedAvailabilities = (aggregatedAvailabilities, eventDuration, timeZone) =>
  Object.keys(aggregatedAvailabilities).reduce((compactTimesWhenParticipantsCanMeet, date) => ({
    ...compactTimesWhenParticipantsCanMeet,
    [date]:
      Object.keys(aggregatedAvailabilities[date])
        .reduce(
          ({ listOfConsecutiveTimes, previousTime, previouslyAvailable }, time) => {
            const areAllParticipantsAvailable = aggregatedAvailabilities[date][time]

            if (areAllParticipantsAvailable && (!previouslyAvailable || constructTimeFromString(previousTime, date, timeZone).getNextTimeString(MINUTE_GRANULARITY) != time)) {
              listOfConsecutiveTimes.push([])
            }

            if (areAllParticipantsAvailable) {
              listOfConsecutiveTimes[listOfConsecutiveTimes.length - 1].push(time)
            }

            previousTime = time
            previouslyAvailable = areAllParticipantsAvailable
            
            return { listOfConsecutiveTimes, previousTime, previouslyAvailable }
          },
          { listOfConsecutiveTimes: [], previousTime: null }
        )
        .listOfConsecutiveTimes
        .reduce(
          (compactTimesWhenParticipantsCanMeetInDay, consecutiveTimes) => {
            if (eventDuration % MINUTE_GRANULARITY != 0) {
              throw new Error(`${eventDuration} is not a multiple of ${MINUTE_GRANULARITY}`)
            }

            const numTimesParticipantsCanMeetIn = consecutiveTimes.length - ((eventDuration / MINUTE_GRANULARITY) - 1)

            if (numTimesParticipantsCanMeetIn > 0) {
              for (let i = 0; i < numTimesParticipantsCanMeetIn; i++) {
                const startTime = constructTimeFromString(consecutiveTimes[i], date, timeZone).addMinutes(-MINUTE_GRANULARITY).toString()
                const endTime = constructTimeFromString(consecutiveTimes[i + ((eventDuration / MINUTE_GRANULARITY) - 1)], date, timeZone).toString()
                compactTimesWhenParticipantsCanMeetInDay.push(`${startTime} - ${endTime}`)
              }
            }

            return compactTimesWhenParticipantsCanMeetInDay
          },
          []
        )
  }), {})

const printListOfConsecutiveTimes = (listOfConsecutiveTimes) => {
  let result = ''

  listOfConsecutiveTimes.forEach(consecutiveTimes => {
    consecutiveTimes.forEach(time => {
      result += time + ','
    })

    result += '|'
  })

  return result
}

export default CompactEventTimePicker