import React, { useState } from 'react'
import './Day.scss'
import TimeTick from '../TimeTick/'
import { DateTime } from 'luxon'

const Day = ({
  date,
  toggleSelectedTimes,
  timeTickDisplayObjects
}) => {
  const [firstClickedTime, setFirstClickedTime] = useState(undefined);
  
  const dateObj = DateTime.fromFormat(date, 'MMM d, yyyy')

  const onTimeTickClick = (time) => {
    if (!firstClickedTime) {
      setFirstClickedTime(time);
    } else if (firstClickedTime !== time) {
      const secondClickedTime = time;

      setFirstClickedTime(undefined);
      toggleSelectedTimes(firstClickedTime, secondClickedTime);
    } else {
      setFirstClickedTime(undefined);
    }
  }
    
  return (
    <div className="day">
      <div className="header">
        <b className="header-text small">
          {dateObj.toFormat('MMM')}
        </b>
        <br/>
        <b className="header-text big">
          {dateObj.toFormat('ccc').toUpperCase()}
        </b>
        <br />
        <b className="header-text small">
          {dateObj.toFormat('d')}<sup className="sup-text">{getDateOrdinal(dateObj)}</sup>
        </b>
      </div>
      <div className="time-container">
        {timeTickDisplayObjects.map((timeTickDisplayObject, ind) =>
          <TimeTick
            key={ind}
            timeString={timeTickDisplayObject.timeString}
            hourString={timeTickDisplayObject.hourString} 
            type={timeTickDisplayObject.type}
            isSelected={timeTickDisplayObject.isSelected}
            isFirstSelectedTimeForTimeRangeSwitch={timeTickDisplayObject.militaryString === firstClickedTime}
            isFirstOrLastTimeInTimeRange={timeTickDisplayObject.isFirstOrLastTimeInTimeRange}
            onClick={() => onTimeTickClick(timeTickDisplayObject.militaryString)}
          />
        )}
      </div>
    </div>
  )
}

const getDateOrdinal = (date) => {
  const dateInt = parseInt(date.toFormat('d'))
  switch (dateInt) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export default Day