import React from 'react';
import './EventTimeTick.scss';
import styled from 'styled-components';
import { Colors } from 'constants/constants';

export const EventTimeTickType = {
  OFFSET: 0,
  HOUR: 1,
  REGULAR: 2,
  SEPARATOR: 3
};

export const EventTimeTickStylesByType = {
  [EventTimeTickType.OFFSET]: {
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

  [EventTimeTickType.HOUR]: {
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

  [EventTimeTickType.REGULAR]: {
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

  [EventTimeTickType.SEPARATOR]: {
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

const EventTimeTickDiv = styled.div`
  flex: 1;
  position: relative;
  min-height: 20px;
  background-color: ${({ type, isSelected, isDisabled }) => isSelected ? EventTimeTickStylesByType[type]['background-color']['selected'] : isDisabled ? EventTimeTickStylesByType[type]['background-color']['disabled'] : EventTimeTickStylesByType[type]['background-color']['not-selected']};
  border-bottom: ${({ type, isBottomBorderActive }) => isBottomBorderActive ? EventTimeTickStylesByType[type]['border-bottom']['active'] : EventTimeTickStylesByType[type]['border-bottom']['not-active']};
`;

const EventTimeTickText = styled.b`
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

const EventTimeTick = ({
  timeString,
  hourString,
  type,
  isSelected,
  isFirstOrLastTimeInTimeRange,
  onMouseEnter = () => {},
  onMouseLeave = () => {}
}) => {
  return (
    <EventTimeTickDiv
      type={type}
      isSelected={isSelected}
      isBottomBorderActive={false}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
    >
      <EventTimeTickText isVisible={isFirstOrLastTimeInTimeRange}>{timeString}</EventTimeTickText>
      {(type === EventTimeTickType.OFFSET || type === EventTimeTickType.HOUR) &&
        <b className="time-tick-large-text">{hourString}</b>
      }
    </EventTimeTickDiv>
  )
}

export default EventTimeTick;