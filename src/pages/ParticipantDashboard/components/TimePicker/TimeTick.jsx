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
    'min-height': '6.25%',
    'background-color': {
      'not-selected': 'none',
      'selected': 'none',
      'disabled': Colors.PRIMARY_RED_MEDIUM_SHADE
    },
    'border-bottom': {
      'not-active': `2px dashed ${Colors.PRIMARY_RED_MEDIUM_SHADE}`,
      'active': `2px dashed ${Colors.PRIMARY_RED}`
    },
  },

  [TimeTickType.HOUR]: {
    'min-height': '6.25%',
    'background-color': {
      'not-selected': 'none',
      'selected': Colors.PRIMARY_RED_LIGHT_SHADE,
      'disabled': Colors.PRIMARY_RED_MEDIUM_SHADE
    },
    'border-bottom': {
      'not-active': `2px dashed ${Colors.PRIMARY_RED_MEDIUM_SHADE}`,
      'active': `2px dashed ${Colors.PRIMARY_RED}`
    },
  },

  [TimeTickType.REGULAR]: {
    'min-height': '6.25%',
    'background-color': {
      'not-selected': 'none',
      'selected': Colors.PRIMARY_RED_LIGHT_SHADE
    },
    'border-bottom': {
      'not-active': `1px dashed ${Colors.PRIMARY_RED_LIGHT_SHADE}`,
      'active': `1px dashed ${Colors.PRIMARY_RED}`
    }
  },

  [TimeTickType.SEPARATOR]: {
    'min-height': '12.5%',
    'background-color': {
      'not-selected': Colors.PRIMARY_RED_DARK_SHADE,
      'selected': Colors.PRIMARY_RED
    },
    'border-bottom': {
      'not-active': `none`,
      'active': `none`
    }
  }
}

const TimeTickDiv = styled.div`
  flex: 1;
  position: relative;
  min-height: 20px;
  background-color: ${({ type, isSelected, isDisabled }) => isSelected ? TimeTickStylesByType[type]['background-color']['selected'] : isDisabled ? TimeTickStylesByType[type]['background-color']['disabled'] : TimeTickStylesByType[type]['background-color']['not-selected']};
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
        <b className="time-tick-large-text">{hourString}</b>
      }
    </TimeTickDiv>
  );
}

export default TimeTick;