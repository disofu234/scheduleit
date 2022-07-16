import react, { useState } from "react"
import { DateTime } from "luxon"
import "../shared/TimePicker.scss"
import { Grid } from "ui-components"
import TimeTick, { TimeTickType } from "./TimeTick"
import { constructTimeFromString, determineEarlierAndLaterTime } from "utils/constructors/constructTime"
import { useWidth } from "../../utils/hooks"
import {
  MINUTE_GRANULARITY,
  TimePickerGridStyle,
  groupBy,
  Header
} from "../shared/shared"

const TimePicker = ({
  selectedTimes,
  onSelectedTimesChange,
  timeZone
}) => {
  const [clickedTime, setClickedTime] = useState()
  const width = useWidth()

  const [dates, selectedTimesGroupedByDate] = groupBy(selectedTimes, ({ earlyTimeString }) => constructTimeFromString(earlyTimeString, timeZone).toDate())

  const headerProps = dates.map(date => ({ dateObj: DateTime.fromFormat(date, 'DD')}))

  const onTimeTickClick = (timeString) => {
    if(clickedTime) {
      toggleSelectedTimes(clickedTime, timeString)
      setClickedTime(undefined)
    } else {
      setClickedTime(timeString)
    }
  }

  const toggleSelectedTimes = (firstTime, secondTime) => {
    const [startTime, endTime] = determineEarlierAndLaterTime(firstTime, secondTime, timeZone)

    let isEarliestTimeFound = false
    let isLatestTimeFound = false
    const newSelectedTimes = selectedTimes.map(({ earlyTimeString, lateTimeString, isSelected }) => {
      const rc = { earlyTimeString, lateTimeString, isSelected } 

      if (earlyTimeString === startTime) {
        isEarliestTimeFound = true
      }

      if (isEarliestTimeFound && !isLatestTimeFound) {
        rc.isSelected = !rc.isSelected
      }

      if (lateTimeString === endTime) {
        isLatestTimeFound = true
      }

      return rc
    })

    onSelectedTimesChange(newSelectedTimes)
  }

  const timeTickProps = selectedTimesGroupedByDate.map(
    (selectedTimesInDate, dateInd) => selectedTimesInDate.reduce(
      (timeTickPropsInDate, { earlyTimeString, lateTimeString, isSelected }, ind) => {
        let selectedTimesIndOffset = 0
        for (let i = 0; i < dateInd; i++) {
          selectedTimesIndOffset += selectedTimesGroupedByDate[i].length
        }

        const time = constructTimeFromString(lateTimeString, timeZone)

        const rc = [...timeTickPropsInDate]

        // We should add a separator between TimeTicks if current time and previous time are not consecutive
        const shouldAddSeparator = ind !== 0 && earlyTimeString !== selectedTimesInDate[ind - 1].lateTimeString
        if (shouldAddSeparator) {
          rc.push({
            timeString: null,
            hourString: null,
            type: TimeTickType.SEPARATOR,
            isSelected: false,
            isFirstSelectedTimeForTimeRangeSwitch: false,
            isFirstOrLastTimeInTimeRange: false,
            onClick: () => {}
          })
        }

        const selectedTimesInd = selectedTimesIndOffset + ind

        // We want to add an offset TimeTick to be able to select the first possible time range in a day,
        // or the first time range after a separator. For example, if the earliest time range we want the user
        // to be able to select is 9:00 AM - 9:15 AM, then we need to pick one of the times to represent the time range
        // in selectedTimes. In our case we choose 9:15 AM, the latest time, but since in the UI we select time range
        // availability by clicking on one TimeTick and then another indicating that we're available during all of the times 
        // in between non-inclusive of the earliest time we selected, if the earliest time we can select is 9:15 AM,
        // then there's no way to indicate that the user is available 9:00 AM - 9:15 AM, so we need a 9:00 AM offset
        // TimeTick.
        if (ind === 0 || shouldAddSeparator) {
          const offsetTime = constructTimeFromString(earlyTimeString, timeZone)
          rc.push({
            timeString: offsetTime.toString(),
            hourString: offsetTime.toStringWithoutMinutes(),
            type: TimeTickType.OFFSET,
            isSelected: false,
            isFirstSelectedTimeForTimeRangeSwitch: offsetTime.toStringWithDate() === clickedTime,
            isFirstOrLastTimeInTimeRange: selectedTimesInDate[ind].isSelected && !(selectedTimesInd !== 0 && selectedTimes[selectedTimesInd - 1].lateTimeString === earlyTimeString && selectedTimes[selectedTimesInd - 1].isSelected),
            onClick: () => onTimeTickClick(offsetTime.toStringWithDate())
          })
        }

        const isConsecutiveToNextTime = selectedTimesInd !== selectedTimes.length - 1 && lateTimeString === selectedTimes[selectedTimesInd + 1].earlyTimeString
        rc.push({
          timeString: time.toString(),
          hourString: time.toStringWithoutMinutes(),
          type: time.isHour() ? TimeTickType.HOUR : TimeTickType.REGULAR,
          isSelected: isSelected,
          isFirstSelectedTimeForTimeRangeSwitch: time.toStringWithDate() === clickedTime,
          isFirstOrLastTimeInTimeRange: (!isSelected && isConsecutiveToNextTime && selectedTimes[selectedTimesInd + 1].isSelected) || (isSelected && (!isConsecutiveToNextTime || !selectedTimes[selectedTimesInd + 1].isSelected)),
          onClick: () => onTimeTickClick(time.toStringWithDate())
        })

        return rc
      },
      []
    )
  )

  const maxDaysInAPage = width < 1000 ? width < 700 ? 3 : 5 : 7

  return (
    <Grid
      style={TimePickerGridStyle}
      Cell={TimeTick}
      cellProps={timeTickProps}
      Header={Header}
      headerProps={headerProps}
      scrollAndHeaderWrapperClass="day"
      cellContainerClass="time-tick-container"
      maxNumOfElementsInPage={maxDaysInAPage}
    />
  )
}

export default TimePicker