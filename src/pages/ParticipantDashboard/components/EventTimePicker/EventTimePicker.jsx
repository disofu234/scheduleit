import react, { useState } from "react"
import { DateTime } from "luxon"
import "../shared/TimePicker.scss"
import { Grid } from "ui-components"
import EventTimeTick, { EventTimeTickType } from "./EventTimeTick"
import { constructTimeFromString, determineEarlierAndLaterTime } from "utils/constructors/constructTime"
import { useWidth } from "../../utils/hooks"
import {
  TimePickerGridStyle,
  groupBy,
  Header
} from "../shared/shared"

const EventTimePicker = ({
  aggregatedAvailabilities,
  onTimeTickEnter,
  onTimeTickLeave,
  participants,
  timeZone
}) => {
  const width = useWidth()

  const eventTimeTickProps = aggregatedAvailabilities.reduce(
    (eventTimeTickProps, {
      earlyTimeString,
      lateTimeString,
      participantsAvailable
    }, ind) => {
      const time = constructTimeFromString(lateTimeString, timeZone)
      const isDifferentDate = ind !== 0 && time.toDate() !== constructTimeFromString(aggregatedAvailabilities[ind - 1].lateTimeString, timeZone).toDate()
      if (isDifferentDate) {
        eventTimeTickProps.push([])
      }

      const isNotConsecutiveToLastTime = ind !== 0 && earlyTimeString !== aggregatedAvailabilities[ind - 1].lateTimeString
      if (!isDifferentDate && isNotConsecutiveToLastTime) {
        eventTimeTickProps[eventTimeTickProps.length - 1].push({
          timeString: null,
          hourString: null,
          type: EventTimeTickType.SEPARATOR,
          isSelected: false,
          isFirstOrLastTimeInTimeRange: false,
        })
      }

      const areAllParticipantsAvailable = participantsAvailable.length === participants.length

      if (ind === 0 || isDifferentDate || isNotConsecutiveToLastTime) {
        const offsetTime = constructTimeFromString(earlyTimeString, timeZone)
        eventTimeTickProps[eventTimeTickProps.length - 1].push({
          timeString: offsetTime.toString(),
          hourString: offsetTime.toStringWithoutMinutes(),
          type: EventTimeTickType.OFFSET,
          isSelected: false,
          isFirstOrLastTimeInTimeRange: areAllParticipantsAvailable
        })
      }

      const isConsecutiveToNextTime = ind !== aggregatedAvailabilities.length - 1 && lateTimeString === aggregatedAvailabilities[ind + 1].earlyTimeString

      eventTimeTickProps[eventTimeTickProps.length - 1].push({
        timeString: time.toString(),
        hourString: time.toStringWithoutMinutes(),
        type: time.isHour() ? EventTimeTickType.HOUR : EventTimeTickType.REGULAR,
        isSelected: areAllParticipantsAvailable,
        isFirstOrLastTimeInTimeRange: (!areAllParticipantsAvailable && isConsecutiveToNextTime && aggregatedAvailabilities[ind + 1].participantsAvailable.length === participants.length) || (areAllParticipantsAvailable && (!isConsecutiveToNextTime || aggregatedAvailabilities[ind + 1].participantsAvailable.length !== participants.length)),
        onMouseEnter: () => onTimeTickEnter(constructTimeFromString(earlyTimeString, timeZone).toString(), time.toString(), participantsAvailable),
        onMouseLeave: () => onTimeTickLeave()
      })

      return eventTimeTickProps
    },
    [[]]
  )

  const [dates] = groupBy(aggregatedAvailabilities, ({ earlyTimeString }) => constructTimeFromString(earlyTimeString, timeZone).toDate())

  const headerProps = dates.map(date => ({ dateObj: DateTime.fromFormat(date, 'DD')}))

  const maxDaysInAPage = width < 1000 ? width < 700 ? 3 : 5 : 7

  return (
    <Grid
      style={TimePickerGridStyle}
      Cell={EventTimeTick}
      cellProps={eventTimeTickProps}
      Header={Header}
      headerProps={headerProps}
      scrollAndHeaderWrapperClass="day"
      cellContainerClass="time-tick-container"
      maxNumOfElementsInPage={maxDaysInAPage}
    />
  )
}

export default EventTimePicker