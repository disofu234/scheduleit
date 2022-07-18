import { constructTime, constructTimeFromString } from "utils/constructors/constructTime"
import { MINUTE_GRANULARITY } from "ui-components/TimePicker2/constants"

export const constructAvailabilityArray = (
  earliestHour,
  latestHour,
  dates,
  timeZone
) => flatMap(
  dates,
  date => constructTime(earliestHour, 0, date, timeZone, false)
          .getListOfTimesTo(constructTime(latestHour, 0, date, timeZone, false).addMinutes(-MINUTE_GRANULARITY), MINUTE_GRANULARITY)
          .map(time => ({ 
            earlyTimeString: time.toStringWithDate(), 
            lateTimeString: time.addMinutes(MINUTE_GRANULARITY).toStringWithDate(), 
            isSelected: false }))
)

export const constructAggregatedAvailabilityArray = (
  earliestHour,
  latestHour,
  dates,
  timeZone,
  participants
) => flatMap(
  dates,
  date => constructTime(earliestHour, 0, date, timeZone, false)
          .getListOfTimesTo(constructTime(latestHour, 0, date, timeZone, false).addMinutes(-MINUTE_GRANULARITY), MINUTE_GRANULARITY)
          .map(time => ({ 
            earlyTimeString: time.toStringWithDate(), 
            lateTimeString: time.addMinutes(MINUTE_GRANULARITY).toStringWithDate(), 
            participantsAvailable: selectAtRandom(participants) 
          }))
)

export const constructAvailabilityArrayFromAggregatedAvailabilities = (aggregatedAvailabilities, participant) =>
  aggregatedAvailabilities
  .map(({ earlyTimeString, lateTimeString, participantsAvailable }) => ({
    earlyTimeString,
    lateTimeString,
    isSelected: participantsAvailable.includes(participant)
  }))

const flatMap = (arr, mapFunc) =>
  arr.reduce((resultArr, x) => {
    return resultArr.concat(mapFunc(x))
  }, [])

export const convertTimesBasedOnTimeZone = (times, sourceTimeZone, targetTimeZone) =>
  times
  .map(time => ({ 
    ...time,
    earlyTimeString: constructTimeFromString(time.earlyTimeString, sourceTimeZone).toZone(targetTimeZone).toStringWithDate(), 
    lateTimeString: constructTimeFromString(time.lateTimeString, sourceTimeZone).toZone(targetTimeZone).toStringWithDate(), 
  }))

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

const selectAtRandom = (arr) => {
  const numElementsToSelect = getRandomInt(0, arr.length)

  let arrCopy = [...arr]
  const rc = []
  for (let i = 0; i <= numElementsToSelect; i++) {
    const selectedIndex = getRandomInt(0, arrCopy.length)
    rc.push(arrCopy[selectedIndex])
    arrCopy.splice(selectedIndex, 1)
  }

  return rc
}