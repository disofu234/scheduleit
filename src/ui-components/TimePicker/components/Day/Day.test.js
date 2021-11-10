import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Day from 'components/TimePicker/components/Day';
import { constructTime } from 'components/TimePicker/utils/Time';
import userEvent from '@testing-library/user-event';

const isDisabled = false;
const firstHourRendered = constructTime(8);
const lastHourRendered = constructTime(10)
const renderedHoursList = firstHourRendered.getListOfTimesTo(lastHourRendered, 60);
const minuteGranularity = 30;
const isTimeTickSelected = {
  "08:30": true,
  "09:00": false,
  "09:30": true,
  "10:00": false,
  "10:30": true,
  "11:00": false
};
const onTimeRangeSwitch = jest.fn();

const dayProps = {
  isDisabled: isDisabled,
  renderedHoursList: renderedHoursList,
  minuteGranularity: minuteGranularity,
  isTimeTickSelected: isTimeTickSelected,
  onTimeRangeSwitch: onTimeRangeSwitch
};

test('Day throws error if it is not disabled but is passed a non-undefined isTimeTickSelected', () => {
  expect(() => render(<Day {...dayProps} isTimeTickSelected={undefined} />)).toThrowError("isTimeTickSelected is undefined");
});

test('First TimeTick selected in time range has static bottom border', () => {
  const { container } = render(<Day {...dayProps} />);
  const timeTick = container.querySelector('.time-tick');

  userEvent.click(timeTick);

  expect(timeTick.classList.contains('time-tick-static-bottom-border')).toEqual(true);
});

test('Static bottom border disappears upon selection of second TimeTick in time range', () => {
  const { container } = render(<Day {...dayProps} />);
  const [firstTimeTick, secondTimeTick] = Array.from(container.querySelectorAll('.time-tick')).slice(0, 2);

  userEvent.click(firstTimeTick);
  userEvent.click(secondTimeTick);

  expect(firstTimeTick.classList.contains('time-tick-static-bottom-border')).toEqual(false);

  userEvent.click(firstTimeTick);
  userEvent.click(firstTimeTick);

  expect(firstTimeTick.classList.contains('time-tick-static-bottom-border')).toEqual(false);
});

test('onTimeRangeSwitch is called if second TimeTick selected in time range is not equal to the first', () => {
  const { container } = render(<Day {...dayProps} />);
  const [firstTimeTick, secondTimeTick] = Array.from(container.querySelectorAll('.time-tick')).slice(0, 2);

  userEvent.click(firstTimeTick);
  userEvent.click(secondTimeTick);

  expect(onTimeRangeSwitch).toHaveBeenCalled();
});

test('onTimeRangeSwitch is not called if second TimeTick selected in time range is equal to the first', () => {
  const { container } = render(<Day {...dayProps} />);
  const timeTick = container.querySelector('.time-tick');
  
  userEvent.click(timeTick);
  userEvent.click(timeTick);

  expect(onTimeRangeSwitch).not.toHaveBeenCalled();
});

test('Day renders all hours in renderedHoursList', () => {
  const { getByText } = render(<Day {...dayProps} />);

  renderedHoursList.forEach((hour) => {
    expect(getByText(hour.toStringWithoutMinutes())).toBeInTheDocument();
  })
});

test('Day is rendered', () => {
  const { container } = render(<Day {...dayProps} />);
  
  expect(container.querySelector('.day')).toBeInTheDocument();
});

test('Day renders offset time', () => {
  const { container } = render(<Day {...dayProps} />);
  
  expect(container.querySelector('.offset-time')).toBeInTheDocument();
});

test('No TimeTick renders if day is disabled', () => {
  const { container } = render(<Day {...dayProps} isDisabled={true} />);

  expect(container.querySelector('.time-tick')).not.toBeInTheDocument();
});

test('Correct offset time TimeTick is rendered if day is not disabled', () => {
  const { getByText } = render(<Day {...dayProps} />);
  
  const expectedOffsetTimeTickString = firstHourRendered.toString();
  const offsetTimeTickText = getByText(expectedOffsetTimeTickString);

  expect(offsetTimeTickText).toBeInTheDocument();
  expect(offsetTimeTickText.parentElement.parentElement.classList.contains('offset-time')).toEqual(true);
});

test('All TimeTicks render in order if day is not disabled', () => {
  const { container } = render(<Day {...dayProps} />);
  
  const timeTickList = container.querySelectorAll('.time-tick-text')
  const expectedTimeTickList = firstHourRendered.getListOfTimesTo(lastHourRendered.addMinutes(60), minuteGranularity);
  
  expectedTimeTickList.forEach((expectedTimeTick, ind) => {
    expect(timeTickList[ind].textContent).toEqual(expectedTimeTick.toString());
  });
});

test('Day correctly passes isSelected to TimeTick', () => {
  const { getByText } = render(<Day {...dayProps} />);

  const timesCorrespondingToTimeTicks = firstHourRendered.addMinutes(minuteGranularity).getListOfTimesTo(lastHourRendered.addMinutes(60), minuteGranularity);

  timesCorrespondingToTimeTicks.forEach((time) => {
    expect(getByText(time.toString()).parentElement.classList.contains('time-tick-selected')).toEqual(isTimeTickSelected[time.toStringMilitaryForm()]);
  });
});