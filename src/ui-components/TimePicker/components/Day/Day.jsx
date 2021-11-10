import React, { useState } from 'react';
import TimeTick from '../TimeTick';
import './Day.scss';
import { TimeTickType } from '../../constants';
import { useTimePickerContext } from '../../utils/context/timePickerContext';

const Day = ({
  selectedTimes,
  onSelectedTimesChange
}) => {
  const [ firstClickedTime, setFirstClickedTime ] = useState(undefined);

  const { 
    firstTimeInDay,
    lastTimeInDay,
    minuteGranularity,
  } = useTimePickerContext();

  const onTimeTickClick = (time) => {
    if (!firstClickedTime) {
      setFirstClickedTime(time);
    } else if (!firstClickedTime.isEqualTo(time)) {
      const secondClickedTime = time;

      setFirstClickedTime(undefined);
      onSelectedTimesChange(firstClickedTime, secondClickedTime);
    } else {
      setFirstClickedTime(undefined);
    }
  };

  const getTimeTickType = (time) => {
    if (time.isEqualTo(firstTimeInDay)) {
      return TimeTickType.OFFSET;
    } else if (time.isHour()) {
      return TimeTickType.HOUR;
    } else {
      return TimeTickType.REGULAR;
    }
  };

  const isFirstOrLastTimeInTimeRange = (time) => {
    const isFirstTimeInTimeRange = (time) => {
      if (time.isEqualTo(lastTimeInDay)) return false;
    
      return (time.isEqualTo(firstTimeInDay) || !selectedTimes[time.toStringMilitaryForm()]) && selectedTimes[time.addMinutes(minuteGranularity).toStringMilitaryForm()]
    }

    const isLastTimeInTimeRange = (time) => {
      if (time.isEqualTo(firstTimeInDay)) return false;
    
      return selectedTimes[time.toStringMilitaryForm()] && (time.isEqualTo(lastTimeInDay) || !selectedTimes[time.addMinutes(minuteGranularity).toStringMilitaryForm()])
    }

    return isFirstTimeInTimeRange(time) || isLastTimeInTimeRange(time);
  }

  return (
    <div className="day">
      {
        firstTimeInDay.getListOfTimesTo(lastTimeInDay, minuteGranularity).map((time, ind) =>
          <TimeTick
            key={ind}
            type={getTimeTickType(time)}
            time={time}
            isSelected={time.isEqualTo(firstTimeInDay) ? false : selectedTimes[time.toStringMilitaryForm()]}
            isFirstSelectedTimeForTimeRangeSwitch={firstClickedTime !== undefined && time.isEqualTo(firstClickedTime)}
            isFirstOrLastTimeInTimeRange={isFirstOrLastTimeInTimeRange(time)}
            onClick={() => onTimeTickClick(time)}
          />
        )
      }
    </div>
  );
};

export default Day;