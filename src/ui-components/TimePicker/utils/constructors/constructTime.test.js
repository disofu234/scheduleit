import { 
  constructTime,
  constructTimeFromString,
  determineEarlierAndLaterTime
} from 'components/TimePicker/utils/Time';

const getListOfTimesArgsToOutputs = [
  {
    args: { startTime: constructTime(8, 45), endTime: constructTime(9, 30), granularity: 15 },
    output: [constructTime(8, 45), constructTime(9), constructTime(9, 15), constructTime(9, 30)]
  },
  {
    args: { startTime: constructTime(14), endTime: constructTime(14, 30), granularity: 15 },
    output: [constructTime(14), constructTime(14, 15), constructTime(14, 30)]
  },
  {
    args: { startTime: constructTime(7), endTime: constructTime(11), granularity: 60 },
    output: [constructTime(7), constructTime(8), constructTime(9), constructTime(10), constructTime(11)]
  }
];

test('Time.getListOfTimesTo returns correct output', () => {
  getListOfTimesArgsToOutputs.forEach(({ args: { startTime, endTime, granularity }, output }) => {
    const timeList = startTime.getListOfTimesTo(endTime, granularity);

    expect(timeList.length).toEqual(output.length);

    timeList.forEach((time, ind) => {
      expect(time.isEqualTo(output[ind])).toEqual(true);
    });
  });
});

test('Time.addMinutes returns correct outputs', () => {
  const aTime = constructTime(8, 45).addMinutes(30);
  expect(aTime.hour).toEqual(9);
  expect(aTime.minute).toEqual(15);

  const bTime = constructTime(15, 20).addMinutes(20);
  expect(bTime.hour).toEqual(15);
  expect(bTime.minute).toEqual(40);
});

test('Time.isEqualTo returns correct outputs', () => {
  const aTime = constructTime(8, 45);
  const bTime = constructTime(8, 45);
  const cTime = constructTime(10, 30);

  expect(aTime.isEqualTo(bTime)).toEqual(true);
  expect(aTime.isEqualTo(cTime)).toEqual(false);
});

test('Time.isEarlierThan returns correct outputs', () => {
  const aTime = constructTime(8, 45);
  const bTime = constructTime(8, 45);
  const cTime = constructTime(10, 30);

  expect(aTime.isEarlierThan(cTime)).toEqual(true);
  expect(aTime.isEarlierThan(bTime)).toEqual(false);
  expect(cTime.isEarlierThan(aTime)).toEqual(false);
});

test('Time.toString returns correct outputs', () => {
  const aTime = constructTime(1, 20);
  const bTime = constructTime(13, 10);

  expect(aTime.toString()).toEqual('1:20am');
  expect(bTime.toString()).toEqual('1:10pm');
});

test('Time.toStringMilitaryForm returns correct outputs', () => {
  const aTime = constructTime(1, 20);
  const bTime = constructTime(13, 10);

  expect(aTime.toStringMilitaryForm()).toEqual('01:20');
  expect(bTime.toStringMilitaryForm()).toEqual('13:10');
});

test('Time.toStringWithoutMinutes returns correct outputs', () => {
  const aTime = constructTime(3);
  const bTime = constructTime(17);

  expect(aTime.toStringWithoutMinutes()).toEqual('3am');
  expect(bTime.toStringWithoutMinutes()).toEqual('5pm');
});

test('constructTimeFromString returns correct output', () => {
  const timeString = '01:20';
  const time = constructTime(1, 20);
  
  expect(constructTimeFromString(timeString).isEqualTo(time)).toEqual(true);
});

test('determineEarlierAndLaterTime returns correct outputs', () => {
  const aTime = constructTime(1, 20);
  const bTime = constructTime(13, 10);

  const earlierAndLaterTime = determineEarlierAndLaterTime(aTime, bTime);
  expect(earlierAndLaterTime[0].isEqualTo(aTime)).toEqual(true);
  expect(earlierAndLaterTime[1].isEqualTo(bTime)).toEqual(true);
});