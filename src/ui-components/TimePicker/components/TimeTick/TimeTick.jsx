import React, { useState } from 'react';
import './TimeTick.scss';
import {
  TimeTickType,
  TimeTickStylesByType
} from '../../constants';
import styled from 'styled-components';
import { Colors } from 'constants/constants';
import { useTimePickerContext } from '../../utils/context/timePickerContext';


const TimeTickDiv = styled.div`
  flex: 1;
  position: relative;
  min-height: ${({ type, minuteGranularity }) => TimeTickStylesByType[type]['min-height'][minuteGranularity]};
  background-color: ${({ type, isSelected }) => isSelected ? TimeTickStylesByType[type]['background-color']['selected'] : TimeTickStylesByType[type]['background-color']['not-selected']};
  border-bottom: ${({ type, isBottomBorderActive }) => isBottomBorderActive ? TimeTickStylesByType[type]['border-bottom']['active'] : TimeTickStylesByType[type]['border-bottom']['not-active']};
`;

const TimeTickText = styled.b`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 12px;
  color: ${Colors.PRIMARY_RED_MEDIUM_SHADE};
  user-select: none;
  visibility: ${({ isVisible }) => isVisible ? 'visible' : 'hidden'};
`;

const TimeTick = ({
  type,
  time,
  isSelected,
  isFirstSelectedTimeForTimeRangeSwitch,
  isFirstOrLastTimeInTimeRange,
  onClick
}) => {
  const { 
    minuteGranularity,
    isDisabled
  } = useTimePickerContext();

  const [ isHovered, setIsHovered ] = useState(false);

  return (
    <TimeTickDiv
      type={type}
      minuteGranularity={minuteGranularity}
      isSelected={isSelected}
      isBottomBorderActive={isHovered || isFirstSelectedTimeForTimeRangeSwitch}
      onClick={() => { if (!isDisabled) onClick() }}
      onMouseEnter={() => { if (!isDisabled) setIsHovered(true) }}
      onMouseLeave={() => { if (!isDisabled) setIsHovered(false) }}
    >
      <TimeTickText isVisible={isHovered || isFirstSelectedTimeForTimeRangeSwitch || isFirstOrLastTimeInTimeRange}>{time.toString()}</TimeTickText>
      {(type === TimeTickType.OFFSET || type === TimeTickType.HOUR) &&
        <b className="time-tick-large-text">{time.toStringWithoutMinutes()}</b>
      }
    </TimeTickDiv>
  );
}

export default TimeTick;