import React, { useState } from "react"
import { Grid } from "ui-components"
import Date, { DateType } from "./Date"
import { 
  getDateString, 
  getDaysInMonth,
  getCurrentMonth,
  getCurrentYear,
  getNextMonthAndYear,
  getPreviousMonthAndYear,
  getMonthAndYearString,
  isCurrentMonthAndYear,
  isLessThanTodaysDate
} from "./functions"
import { range } from "utils/functions"
import './DatePicker.scss'

const DatePickerStyle = {
  direction: 'row',
  paged: false,
  scrollable: false,
  headerDirection: 'row',
  headerScrollable: false
}

const numOfPlaceholdersBasedOnDay = {
  'Mon': 0,
  'Tue': 1,
  'Wed': 2,
  'Thu': 3,
  'Fri': 4,
  'Sat': 5,
  'Sun': 6
}

const headerProps = [
  { date: 'MON', type: DateType.HEADER },
  { date: 'TUE', type: DateType.HEADER },
  { date: 'WED', type: DateType.HEADER },
  { date: 'THU', type: DateType.HEADER },
  { date: 'FRI', type: DateType.HEADER },
  { date: 'SAT', type: DateType.HEADER },
  { date: 'SUN', type: DateType.HEADER }
]

const DatePicker = ({ selectedDates, onSelectedDatesChange }) => {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth())
  const [selectedYear, setSelectedYear] = useState(getCurrentYear())

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear)

  const numOfPlaceholders = numOfPlaceholdersBasedOnDay[daysInMonth[0].day]
  const cellProps = [range(numOfPlaceholders).map(_ => ({ type: DateType.PLACEHOLDER }))]

  daysInMonth.forEach(({ day, date }, ind) => {
    if (ind !== 0 && day === 'Mon') {
      cellProps.push([])
    }

    const dateString = getDateString({ day: date, month: selectedMonth, year: selectedYear })
    const isSelected = selectedDates.includes(dateString)

    cellProps[cellProps.length - 1].push({ 
      date,
      type: isLessThanTodaysDate(date, selectedMonth) ? DateType.INACTIVE : DateType.REGULAR,
      isSelected,
      onClick: () => onSelectedDatesChange(isSelected ? selectedDates.filter(x => x !== dateString) : [...selectedDates, dateString])
    })
  })

  return (
    <div className="date-picker-wrapper">
      <MonthPicker 
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedMonth={(newMonth) => setSelectedMonth(newMonth)}
        setSelectedYear={(newYear) => setSelectedYear(newYear)}
      />
      <Grid
        style={DatePickerStyle}
        cellProps={cellProps}
        Cell={Date}
        Header={Date}
        headerProps={headerProps}
        scrollAndHeaderWrapperClass='week-wrapper'
      />
    </div>
  )
}

const MonthPicker = ({ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }) => {
  const onLeftButtonClick = () => {
    const [newMonth, newYear] = getPreviousMonthAndYear(selectedMonth, selectedYear)
    setSelectedMonth(newMonth)
    setSelectedYear(newYear)
  }

  const onRightButtonClick = () => {
    const [newMonth, newYear] = getNextMonthAndYear(selectedMonth, selectedYear)
    setSelectedMonth(newMonth)
    setSelectedYear(newYear)
  }

  return (
    <div className="month-picker-wrapper">
      <div className="month-picker-button-container">
        {isCurrentMonthAndYear(selectedMonth, selectedYear) ?
          <div></div> :
          <div className="left-button" onClick={() => onLeftButtonClick()}></div>}
      </div>
      <div className="month-picker-text">{getMonthAndYearString(selectedMonth, selectedYear)}</div>
      <div className="month-picker-button-container">
        <div className="right-button" onClick={() => onRightButtonClick()}></div>
      </div>
    </div>
  )
}

export default DatePicker