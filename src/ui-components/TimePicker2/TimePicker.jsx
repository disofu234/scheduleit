import React, { useState } from 'react'
import './TimePicker.scss'
import Day from './components/Day'
import { HorizontalPager } from 'ui-components'
import {
  TimeTickType,
  MINUTE_GRANULARITY 
} from './constants'
import { useWidth } from './utils/hooks/useWindowWidth'
import { constructTimeFromString } from "utils/constructors/constructTime"
import { determineEarlierAndLaterTime } from './utils/functions'

const TimePicker = ({
  selectedTimes,
  onSelectedTimesChange,
  timeZone
}) => {
  const width = useWidth()

  const dates = Object.keys(selectedTimes)

  const toggleSelectedTimes = (date, firstSelectedTimeString, secondSelectedTimeString) => {
    const firstSelectedTime = constructTimeFromString(firstSelectedTimeString, date, timeZone, false)
    const secondSelectedTime = constructTimeFromString(secondSelectedTimeString, date, timeZone, false)

    const [startTime, endTime] = determineEarlierAndLaterTime(firstSelectedTime, secondSelectedTime)

    const toggledTimesInDate = 
      startTime
        .addMinutes(MINUTE_GRANULARITY)
        .getListOfTimesTo(endTime, MINUTE_GRANULARITY)
        .filter(time => selectedTimes[date][time.toStringMilitaryForm()] !== undefined)
        .reduce((toggledTimesInDate, time) => 
          ({
            ...toggledTimesInDate,
            [time.toStringMilitaryForm()]: !selectedTimes[date][time.toStringMilitaryForm()]
          }), 
        {})

    const newSelectedTimes = {
      ...selectedTimes,
      [date]: {
        ...selectedTimes[date],
        ...toggledTimesInDate
      }
    }
    
    onSelectedTimesChange(newSelectedTimes)
  }
  
  const isFirstOrLastTimeInTimeRange = (date, time) =>
    (!selectedTimes[date][time.toStringMilitaryForm()] && selectedTimes[date][time.getNextTimeString(MINUTE_GRANULARITY)]) ||
    (selectedTimes[date][time.toStringMilitaryForm()] && !selectedTimes[date][time.getNextTimeString(MINUTE_GRANULARITY)])

  const getTimeTickType = (time) => time.isHour() ? TimeTickType.HOUR : TimeTickType.REGULAR
  
  const timePickerDisplayObject = dates.reduce((displayObject, date) => ({
    ...displayObject,
    [date]: Object.keys(selectedTimes[date]).reduce((timeTicks, timeString, ind) => {
      const rc = [...timeTicks]

      const time = constructTimeFromString(timeString, date, timeZone)

      if (ind !== 0 && selectedTimes[date][time.getPreviousTimeString(MINUTE_GRANULARITY)] === undefined) {
        rc.push({
          timeString: null,
          hourString: null,
          militaryString: null,
          type: TimeTickType.SEPARATOR,
          isSelected: false,
          isFirstOrLastTimeInTimeRange: false
        })
      }

      if (ind === 0 || selectedTimes[date][time.getPreviousTimeString(MINUTE_GRANULARITY)] === undefined) {
        const offsetTime = time.addMinutes(-MINUTE_GRANULARITY)
        rc.push({
          timeString: offsetTime.toString(),
          hourString: offsetTime.toStringWithoutMinutes(),
          militaryString: offsetTime.toStringMilitaryForm(),
          type: TimeTickType.OFFSET,
          isSelected: false,
          isFirstOrLastTimeInTimeRange: isFirstOrLastTimeInTimeRange(date, offsetTime)
        })
      }

      rc.push({
        timeString: time.toString(),
        hourString: time.toStringWithoutMinutes(),
        militaryString: time.toStringMilitaryForm(),
        type: getTimeTickType(time),
        isSelected: selectedTimes[date][timeString],
        isFirstOrLastTimeInTimeRange: isFirstOrLastTimeInTimeRange(date, time)
      })

      return rc
    }, [])
  }), {})

  const maxDaysInAPage = width < 1000 ? width < 700 ? 3 : 5 : 7

  return (
    <HorizontalPager maxNumElementsInPage={maxDaysInAPage}>
      {dates.map((date, ind) =>
        <Day 
          key={ind} 
          date={date}
          toggleSelectedTimes={(firstSelectedTime, secondSelectedTime) => toggleSelectedTimes(date, firstSelectedTime, secondSelectedTime)}
          timeTickDisplayObjects={timePickerDisplayObject[date]}
        />)}
    </HorizontalPager>
  )
}

export default TimePicker