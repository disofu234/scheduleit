import { DateTime } from "luxon"
import "../shared/TimePicker.scss"
import { Grid } from "ui-components"
import EventTimeTick, { EventTimeTickType } from "./EventTimeTick"
import { constructTimeFromString } from "utils/constructors/constructTime"
import { useWidth } from "../../utils/hooks"
import {
  TimePickerGridStyle,
  groupBy,
  Header
} from "../shared/shared"

const COLOR_SCALE = 3

const EventTimePicker = ({
  aggregatedAvailabilities,
  onTimeTickEnter,
  onTimeTickLeave,
  participants,
  timeZone
}) => {
  const width = useWidth()

  const parsedAggregatedAvailabilities = aggregatedAvailabilities.map(aggregatedAvailability => ({
    ...aggregatedAvailability,
    participantsAvailable: aggregatedAvailability.participantsAvailable.filter(participant => participants.includes(participant))
  }))

  const eventTimeTickProps = parsedAggregatedAvailabilities.reduce(
    (eventTimeTickProps, {
      earlyTimeString,
      lateTimeString,
      participantsAvailable
    }, ind) => {
      const time = constructTimeFromString(lateTimeString, timeZone)

      const isDifferentDate = ind !== 0 && constructTimeFromString(earlyTimeString, timeZone).toDate() !== constructTimeFromString(parsedAggregatedAvailabilities[ind - 1].earlyTimeString, timeZone).toDate()
      if (isDifferentDate) {
        eventTimeTickProps.push([])
      }

      const isNotConsecutiveToLastTime = ind !== 0 && earlyTimeString !== parsedAggregatedAvailabilities[ind - 1].lateTimeString
      if (!isDifferentDate && isNotConsecutiveToLastTime) {
        eventTimeTickProps[eventTimeTickProps.length - 1].push({
          timeString: null,
          hourString: null,
          type: EventTimeTickType.SEPARATOR,
          isFirstOrLastTimeInTimeRange: false,
        })
      }

      const hasAvailableParticipant = participantsAvailable.length > 0

      if (ind === 0 || isDifferentDate || isNotConsecutiveToLastTime) {
        const offsetTime = constructTimeFromString(earlyTimeString, timeZone)
        eventTimeTickProps[eventTimeTickProps.length - 1].push({
          timeString: offsetTime.toString(),
          hourString: offsetTime.toStringWithoutMinutes(),
          type: EventTimeTickType.OFFSET,
          isFirstOrLastTimeInTimeRange: hasAvailableParticipant
        })
      }

      const isConsecutiveToNextTime = ind !== parsedAggregatedAvailabilities.length - 1 && lateTimeString === parsedAggregatedAvailabilities[ind + 1].earlyTimeString

      eventTimeTickProps[eventTimeTickProps.length - 1].push({
        timeString: time.toString(),
        hourString: time.toStringWithoutMinutes(),
        type: time.isHour() ? EventTimeTickType.HOUR : EventTimeTickType.REGULAR,
        availabilityGroup: mapToScale(participantsAvailable.length, participants.length, Math.min(participants.length, COLOR_SCALE)),
        isFirstOrLastTimeInTimeRange: (!hasAvailableParticipant && isConsecutiveToNextTime && parsedAggregatedAvailabilities[ind + 1].participantsAvailable.length > 0) || (hasAvailableParticipant && (!isConsecutiveToNextTime || parsedAggregatedAvailabilities[ind + 1].participantsAvailable.length === 0)),
        onMouseEnter: () => onTimeTickEnter(constructTimeFromString(earlyTimeString, timeZone).toString(), time.toString(), participantsAvailable),
        onMouseLeave: () => onTimeTickLeave()
      })

      return eventTimeTickProps
    },
    [[]]
  )

  const [dates] = groupBy(parsedAggregatedAvailabilities, ({ earlyTimeString }) => constructTimeFromString(earlyTimeString, timeZone).toDate())

  const headerProps = dates.map(date => ({ dateObj: DateTime.fromFormat(date, 'DD')}))

  const maxDaysInAPage = width < 1000 ? 2 : 3

  return (
    <div className="group-availability-and-gradient-wrapper">
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
      <ScaleGradient numParticipants={participants.length} />
    </div>
  )
}

const ScaleGradient = ({
  numParticipants
}) => {
  const numColors = Math.min(numParticipants, COLOR_SCALE)

  const gradientScales = [0]
  let lastScale = 0
  for (let i = 0; i <= numParticipants; i++) {
    const newScale = mapToScale(i, numParticipants, numColors)
    if (newScale != lastScale) {
      lastScale = newScale
      gradientScales.push(i)
    }
  }

  return (
    <div className="gradient-and-text-wrapper">
      <div className="gradient-text-left">{`0/${numParticipants} available`}</div>
      <div className="gradient">
        {gradientScales.map((scale, ind) =>
          <div className={`gradient-${ind}`}></div>)}
      </div>
      <div className="gradient-text-right">{`${numParticipants}/${numParticipants} available`}</div>
    </div>
  )
}

const mapToScale = (num, fromScale, toScale) => {
  return Math.round((num / fromScale) * toScale)
}

export default EventTimePicker