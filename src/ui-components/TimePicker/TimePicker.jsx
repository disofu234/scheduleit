import React, { useState } from 'react';
import './TimePicker.scss';
import Day from './components/Day';
import WeekPicker from './components/WeekPicker';
import { daysList } from 'constants/constants';
import {
  TimePickerContext
} from './utils/context/timePickerContext';
import constructTime from './utils/constructors/constructTime';
import { determineEarlierAndLaterTime } from './utils/functions';

const TimePicker = ({ 
  selectedTimes, 
  setSelectedTimes, 
  timeMetadata: { firstHourInDay, lastHourInDay, weeks, minuteGranularity },
  isDisabled
}) => {
  const firstTimeInDay = constructTime(firstHourInDay);
  const lastTimeInDay = constructTime(lastHourInDay);
  
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);

  const selectedWeek = weeks[selectedWeekIndex];

  const timePickerContextValue = {
    firstTimeInDay,
    lastTimeInDay,
    weeks,
    minuteGranularity,
    isDisabled
  };

  const onSelectedTimesChange = (day, firstSelectedTime, secondSelectedTime) => {
    const [startTime, endTime] = determineEarlierAndLaterTime(firstSelectedTime, secondSelectedTime);

    setSelectedTimes({
      ...selectedTimes,
      [selectedWeek]: {
        ...selectedTimes[selectedWeek],
        [day]: {
          ...selectedTimes[selectedWeek][day],
          ...switchSelectedTimes(day, startTime, endTime)
        }
      }
    });
  };
  
  const switchSelectedTimes = (day, startTime, endTime) =>
    startTime
      .addMinutes(minuteGranularity)
      .getListOfTimesTo(endTime, minuteGranularity)
      .reduce((switchedSelectedTimes, time) => ({
        ...switchedSelectedTimes,
        [time.toStringMilitaryForm()]: !selectedTimes[selectedWeek][day][time.toStringMilitaryForm()]
      }), {});

  return (
    <TimePickerContext.Provider value={timePickerContextValue}>
      <WeekPicker 
        selectedWeekIndex={selectedWeekIndex} 
        setSelectedWeekIndex={setSelectedWeekIndex} 
      />
      <div className="time-picker-wrap">
        <TimePickerHeader />
        <div className="time-picker">
          {daysList.map((day, ind) => 
            <Day 
              key={ind}
              selectedTimes={selectedTimes[selectedWeek][day]}
              onSelectedTimesChange={(firstSelectedTime, secondSelectedTime) => onSelectedTimesChange(day, firstSelectedTime, secondSelectedTime)}
            />
          )}
        </div>
      </div>
    </TimePickerContext.Provider>
  );
};

const TimePickerHeader = () => (
  <div className="time-picker-header">
    <div className="header-day-div"><b className="header-text">Mon</b></div>
    <div className="header-day-div"><b className="header-text">Tue</b></div>
    <div className="header-day-div"><b className="header-text">Wed</b></div>
    <div className="header-day-div"><b className="header-text">Thu</b></div>
    <div className="header-day-div"><b className="header-text">Fri</b></div>
    <div className="header-day-div"><b className="header-text">Sat</b></div>
    <div className="header-day-div"><b className="header-text">Sun</b></div>
  </div>
);

export default TimePicker;