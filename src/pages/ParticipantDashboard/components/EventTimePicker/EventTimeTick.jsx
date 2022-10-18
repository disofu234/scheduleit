import React from 'react';
import './EventTimeTick.scss';
import styled from 'styled-components';
import { Colors } from 'constants/constants';

export const EventTimeTickType = {
  OFFSET: 0,
  HOUR: 1,
  REGULAR: 2,
}

export const EventTimeTickStylesByType = {
  [EventTimeTickType.OFFSET]: {
    'min-height': '6.25%',
    'background-color': {
      0: 'none',
      1: 'none',
      2: 'none'
    },
    'border-bottom': {
      'not-active': `2px dashed ${Colors.GRAY}`,
      'active': `2px dashed ${Colors.GRAY_DARK}`
    },
  },

  [EventTimeTickType.HOUR]: {
    'min-height': '6.25%',
    'background-color': {
      0: 'none',
      1: Colors.GRAY_LIGHT_OPAQUE,
      2: Colors.GRAY_MILD_OPAQUE,
      3: Colors.GRAY_OPAQUE
    },
    'border-bottom': {
      'not-active': `2px dashed ${Colors.GRAY}`,
      'active': `2px dashed ${Colors.GRAY_DARK}`
    },
  },

  [EventTimeTickType.REGULAR]: {
    'min-height': '6.25%',
    'background-color': {
      0: 'none',
      1: Colors.GRAY_LIGHT_OPAQUE,
      2: Colors.GRAY_MILD_OPAQUE,
      3: Colors.GRAY_OPAQUE
    },
    'border-bottom': {
      'not-active': `1px dashed ${Colors.GRAY_LIGHT}`,
      'active': `1px dashed ${Colors.GRAY}`
    }
  }
}

const EventTimeTickDiv = styled.div`
  flex: 1;
  position: relative;
  min-height: 25px;
  background-color: ${({ type, availabilityGroup }) => EventTimeTickStylesByType[type]['background-color'][availabilityGroup]};
  border-bottom: ${({ type, isBottomBorderActive }) => isBottomBorderActive ? EventTimeTickStylesByType[type]['border-bottom']['active'] : EventTimeTickStylesByType[type]['border-bottom']['not-active']};
`;

const EventTimeTickText = styled.b`
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

const EventTimeTick = ({
  timeString,
  hourString,
  type,
  availabilityGroup = 0,
  isFirstOrLastTimeInTimeRange,
  onMouseEnter = () => {},
  onMouseLeave = () => {}
}) => {
  return (
    <EventTimeTickDiv
      type={type}
      availabilityGroup={availabilityGroup}
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