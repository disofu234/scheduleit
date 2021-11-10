const TIMES_IN_DAY = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 AM of the next day']
export const TIME_IN_DAY_OPTIONS = TIMES_IN_DAY.map((time, ind) => ({ value: ind, content: time }));

const MINUTE_GRANULARITIES = [5, 10, 15, 20, 30];
export const MINUTE_GRANULARITY_OPTIONS = MINUTE_GRANULARITIES.map(granularity => ({ value: granularity, content: granularity }));

export const TEXT_AREA_PLACEHOLDER = "Write users names and emails separated by a space and each in their own line. For example:\nAbeba abc@scheduleit.com\nDiego sdf@scheduleit.com\nPadius pad@scheduleit.com";