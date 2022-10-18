import { DateTime } from "luxon"

export const getDaysInMonth = (month, year) => {
  const firstDayOfMonth = DateTime.fromObject({ month, year, day: 1 })

  const days = [{ date: firstDayOfMonth.day, day: firstDayOfMonth.toFormat('ccc') }]
  let dayIterator = firstDayOfMonth
  while (dayIterator.plus({ days: 1 }).month === firstDayOfMonth.month) {
    const nextDay = dayIterator.plus({ days: 1 })
    days.push({ date: nextDay.day, day: nextDay.toFormat('ccc') })
    dayIterator = nextDay
  }

  return days
}

export const getDateString = (dateObj) => DateTime.fromObject(dateObj).toFormat('DD')

export const getCurrentMonth = () => DateTime.now().month

export const getCurrentYear = () => DateTime.now().year

export const getNextMonthAndYear = (month, year) => {
  const nextMonth = DateTime.fromObject({ month, year }).plus({ months: 1 })

  return [nextMonth.month, nextMonth.year]
}

export const getPreviousMonthAndYear = (month, year) => {
  const previousMonth = DateTime.fromObject({ month, year }).minus({ months: 1 })

  return [previousMonth.month, previousMonth.year]
}

export const isCurrentMonthAndYear = (month, year) => month === DateTime.now().month && year === DateTime.now().year

export const isLessThanTodaysDate = (date, month) => date < DateTime.now().day && month === DateTime.now().month

export const getMonthAndYearString = (month, year) => DateTime.fromObject({ month, year }).toFormat('MMMM, yyyy')