import React from 'react'
import './WeekPicker.scss';
import { useTimePickerContext } from '../../utils/context/timePickerContext';

const WeekPicker = ({ selectedWeekIndex, setSelectedWeekIndex }) => {
  const { weeks } = useTimePickerContext();
  return (
    <div className="week-picker">
      <div 
        className="left-button" 
        onClick={() => { if (selectedWeekIndex !== 0) setSelectedWeekIndex(selectedWeekIndex - 1)}}
      />
      <b className="week-picker-text">{weeks[selectedWeekIndex]}</b>
      <div 
        className="right-button"
        onClick={() => { if (selectedWeekIndex !== weeks.length - 1) setSelectedWeekIndex(selectedWeekIndex + 1)}}
      />
    </div>
  );
};
  

export default WeekPicker;