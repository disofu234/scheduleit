import moment from 'moment';

export const convertEventTargetValueToInteger = event => parseInt(event.target.value);

export const getListOfSelectedValues = event => Array.from(event.target.selectedOptions, option => option.value);

export const getTenWeeksFromNow = () => {
  const weeks = [];

  let currentDay = moment().subtract(moment().day() - 1, 'days');

  const dateFormat = 'MMM Do';
  for (let i = 0; i < 10; i++) {
    weeks.push(`${currentDay.format(dateFormat)} - ${currentDay.add(6, 'days').format(dateFormat)}`);
    currentDay.add(1, 'days');
  };

  return weeks
};