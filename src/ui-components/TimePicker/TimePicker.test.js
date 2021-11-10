import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimePicker, {
  constructInitialIsTimeSelectedInDayObject,
  constructSwitchedTimeRangeObject
} from 'components/TimePicker/TimePicker';
import { constructTime } from 'components/TimePicker/utils/Time';
import { daysList } from 'components/TimePicker/constants';
import { getByText } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import {
  TimeTickType,
  TimeTickStylesByType
} from 'components/TimePicker/constants';

const NUM_DAYS = 7;

const timeRangesToSelect = [
  { firstTimeToSelect: constructTime(9, 30), secondTimeToSelect: constructTime(11, 15) },
  { firstTimeToSelect: constructTime(11, 30), secondTimeToSelect: constructTime(14) },
  { firstTimeToSelect: constructTime(11, 15), secondTimeToSelect: constructTime(9, 30) },
];

const isDayDisabled = {
  "Mon": true,
  "Tue": false,
  "Wed": false,
  "Thu": true,
  "Fri": false,
  "Sat": false,
  "Sun": false
};

const minuteGranularity = 15;

const timePickerProps = {
  isDayDisabled: isDayDisabled,
  timeContext: {
    firstTimeInDay: constructTime(8),
    lastTimeInDay: constructTime(17),
    minuteGranularity: minuteGranularity
  }
};

test('TimePicker snapshot', () => {
  const { asFragment } = render(<TimePicker {...timePickerProps} />);

  expect(asFragment()).toMatchSnapshot();
});

test('TimePickerWrap contains TimePickerHeader and TimePicker', () => {
  const { container } = render(<TimePicker {...timePickerProps} />);

  expect(container.querySelector('.time-picker-header')).toBeInTheDocument();
  expect(container.querySelector('.time-picker')).toBeInTheDocument();
});

test('TimePickerHeader renders all days', () => {
  const { getByText } = render(<TimePicker {...timePickerProps} />);

  daysList.forEach((day) => {
    expect(getByText(day)).toBeInTheDocument();
    expect(getByText(day)).toHaveClass('header-text');
  });
});

test('TimePicker renders all days', () => {
  const { container } = render(<TimePicker {...timePickerProps} />);

  expect(container.querySelectorAll('.day').length).toEqual(NUM_DAYS);
});

test('Correct TimeTicks are shown as selected on time range selections', () => {
  const { container } = render(<TimePicker {...timePickerProps} />);
  const daysDivList = Array.from(container.querySelectorAll('.day'));

  daysDivList
  .filter((_, ind) => !isDayDisabled[daysList[ind]])
  .forEach((dayDiv) => {
    timeRangesToSelect.forEach(({ firstTimeToSelect, secondTimeToSelect }) => {
      const firstTimeTickText = getByText(dayDiv, firstTimeToSelect.toString());
      const secondTimeTickText = getByText(dayDiv, secondTimeToSelect.toString());
      
      const firstTimeTick = firstTimeTickText.parentElement;
      const secondTimeTick = secondTimeTickText.parentElement;

      userEvent.click(firstTimeTick);
      userEvent.click(secondTimeTick);
      userEvent.unhover(firstTimeTick);
      userEvent.unhover(secondTimeTick);

      const timeList = firstTimeToSelect.addMinutes(minuteGranularity).getListOfTimesTo(secondTimeToSelect);

      expect(firstTimeTickText).toHaveStyleRule('visibility', 'visible');
      expect(secondTimeTickText).toHaveStyleRule('visibility', 'visible');

      timeList.forEach((time) => {
        const timeTick = getByText(dayDiv, time.toString()).parentElement;

        expect(timeTick).toHaveStyleRule('background-color', TimeTickStylesByType[TimeTickType.REGULAR]['background-color']['selected']);
      });

      userEvent.click(firstTimeTick);
      userEvent.click(secondTimeTick);
      userEvent.unhover(firstTimeTick);
      userEvent.unhover(secondTimeTick);

      expect(firstTimeTickText).toHaveStyleRule('visibility', 'hidden');
      expect(secondTimeTickText).toHaveStyleRule('visibility', 'hidden');
      
      timeList.forEach((time) => {
        const timeTick = getByText(dayDiv, time.toString()).parentElement;

        expect(timeTick).toHaveStyleRule('background-color', TimeTickStylesByType[TimeTickType.REGULAR]['background-color']['not-selected']);
      });
    });
  });
});

test('constructInitialIsTimeSelectedInDayObject returns correct output', () => {
  const isDayDisabled = {
    "Mon": true,
    "Tue": true,
    "Wed": false,
    "Thu": true,
    "Fri": false,
    "Sat": true,
    "Sun": true
  };

  const timeContext = {
    firstTimeInDay: constructTime(8),
    lastTimeInDay: constructTime(8, 45),
    minuteGranularity: 15
  };

  const expectedIsTimeSelectedInDayObject = {
    "Wed": {
      "08:15": false,
      "08:30": false,
      "08:45": false
    },
    "Fri": {
      "08:15": false,
      "08:30": false,
      "08:45": false
    }
  };

  expect(constructInitialIsTimeSelectedInDayObject(isDayDisabled, timeContext)).toEqual(expectedIsTimeSelectedInDayObject);
});

test('constructSwitchedTimeRangeObject returns correct output', () => {
  const isTimeSelected = {
    "08:00": true,
    "08:15": false,
    "08:30": true,
    "08:45": false
  };
  const startTime = constructTime(8);
  const endTime = constructTime(8, 45);
  const minuteGranularity = 15;

  const expectedSwitchedIsTimeSelectedObject = {
    "08:15": true,
    "08:30": false,
    "08:45": true
  };

  expect(constructSwitchedTimeRangeObject(isTimeSelected, startTime, endTime, minuteGranularity)).toEqual(expectedSwitchedIsTimeSelectedObject);
});