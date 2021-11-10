import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimeTick from 'components/TimePicker/components/TimeTick';
import { constructTime } from 'components/TimePicker/utils/Time';
import userEvent from '@testing-library/user-event';

const onClick = jest.fn();
const timeString = '8:00am';
const timeTickProps = {
  isSelected: false,
  isFirstSelectedTimeForTimeRangeSwitch: false,
  timeString: timeString,
  onClick: onClick
}

test('TimeTick renders', () => {
  const { container } = render(<TimeTick {...timeTickProps} isSelected={true} />);

  expect(container.querySelector('.time-tick')).toBeInTheDocument();
})

test('TimeTick shows as selected if isSelected is true', () => {
  const { container } = render(<TimeTick {...timeTickProps} isSelected={true} />);

  expect(container.querySelector('.time-tick').classList.contains('time-tick-selected')).toEqual(true);
});

test('TimeTick does not show as selected if isSelected is false', () => {
  const { container } = render(<TimeTick {...timeTickProps} />);

  expect(container.querySelector('.time-tick').classList.contains('time-tick-selected')).toEqual(false);
});

test('TimeTick has static border if isFirstSelectedTimeForTimeRangeSwitch is true', () => {
  const { container } = render(<TimeTick {...timeTickProps} isFirstSelectedTimeForTimeRangeSwitch={true} />);

  expect(container.querySelector('.time-tick').classList.contains('time-tick-static-bottom-border')).toEqual(true);
});

test('TimeTick does not have static border if isFirstSelectedTimeForTimeRangeSwitch is false', () => {
  const { container } = render(<TimeTick {...timeTickProps} />);

  expect(container.querySelector('.time-tick').classList.contains('time-tick-static-bottom-border')).toEqual(false);
});

test('TimeTick renders the correct timeString', () => {
  const { getByText } = render(<TimeTick {...timeTickProps} />);

  expect(getByText(timeString)).toBeInTheDocument();
});

test('onClick is executed if the TimeTick is clicked on', () => {
  const { container } = render(<TimeTick {...timeTickProps} />);

  const timeTick = container.querySelector('.time-tick');

  userEvent.click(timeTick);

  expect(onClick).toHaveBeenCalled();
});

test('timeString is not hidden if the TimeTick is hovered over', () => {
  const { container, getByText } = render(<TimeTick {...timeTickProps} />);

  const timeTick = container.querySelector('.time-tick');

  userEvent.hover(timeTick);

  expect(getByText(timeString).classList.contains('time-tick-text-hidden')).toEqual(false);
});

test('timeString is hidden if the TimeTick is not hovered over', () => {
  const { container, getByText } = render(<TimeTick {...timeTickProps} />);

  const timeTick = container.querySelector('.time-tick');

  userEvent.hover(timeTick);
  userEvent.unhover(timeTick);

  expect(getByText(timeString).classList.contains('time-tick-text-hidden')).toEqual(true);
});