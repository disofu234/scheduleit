import React, { useState } from 'react';
import './TimeTick.scss';
import styled from 'styled-components';
import { Colors } from 'constants/constants';

export const TimeTickType = {
  OFFSET: 0,
  HOUR: 1,
  REGULAR: 2,
  SEPARATOR: 3
};

export const TimeTickStylesByType = {
  [TimeTickType.OFFSET]: {
    'min-height': '7.5%',
    'background-color': {
      'not-selected': 'none',
      'selected': 'none',
    },
    'border-bottom': {
      'not-active': `2px dashed ${Colors.GRAY}`,
      'active': `2px dashed ${Colors.GRAY_DARK}`
    },
  },

  [TimeTickType.HOUR]: {
    'min-height': '7.5%',
    'background-color': {
      'not-selected': 'none',
      'selected': Colors.GRAY_LIGHT_OPAQUE,
    },
    'border-bottom': {
      'not-active': `2px dashed ${Colors.GRAY}`,
      'active': `2px dashed ${Colors.GRAY_DARK}`
    },
  },

  [TimeTickType.REGULAR]: {
    'min-height': '7.5%',
    'background-color': {
      'not-selected': 'none',
      'selected': Colors.GRAY_LIGHT_OPAQUE
    },
    'border-bottom': {
      'not-active': `1px dashed ${Colors.GRAY_LIGHT}`,
      'active': `1px dashed ${Colors.GRAY_DARK}`
    }
  }
}

const TimeTickDiv = styled.div`
  flex: 1;
  position: relative;
  min-height: 25px;
  background-color: ${({ type, isSelected, isDisabled }) => isSelected ? TimeTickStylesByType[type]['background-color']['selected'] : isDisabled ? TimeTickStylesByType[type]['background-color']['disabled'] : TimeTickStylesByType[type]['background-color']['not-selected']};
  border-bottom: ${({ type, isBottomBorderActive }) => isBottomBorderActive ? TimeTickStylesByType[type]['border-bottom']['active'] : TimeTickStylesByType[type]['border-bottom']['not-active']};
`;

const TimeTickText = styled.b`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 12px;
  color: ${Colors.GRAY};
  user-select: none;
  visibility: ${({ isVisible }) => isVisible ? 'visible' : 'hidden'};
  @media (max-width: 700px) {
    font-size: 10px;
  }
`;

const TimeTick = ({
  timeString,
  hourString,
  type,
  isSelected,
  isFirstSelectedTimeForTimeRangeSwitch,
  isFirstOrLastTimeInTimeRange,
  onClick
}) => {
  const [ isHovered, setIsHovered ] = useState(false);

  return (
    <TimeTickDiv
      type={type}
      isSelected={isSelected}
      isBottomBorderActive={isHovered || isFirstSelectedTimeForTimeRangeSwitch}
      onClick={() => onClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TimeTickText isVisible={isHovered || isFirstSelectedTimeForTimeRangeSwitch || isFirstOrLastTimeInTimeRange}>{timeString}</TimeTickText>
      {(type === TimeTickType.OFFSET || type === TimeTickType.HOUR) &&
        <div className="time-tick-large-text">{hourString}</div>
      }
    </TimeTickDiv>
  );
}

export default TimeTick;