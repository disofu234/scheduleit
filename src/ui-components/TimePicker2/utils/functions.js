export const determineEarlierAndLaterTime = (firstTime, secondTime) => {
  const isFirstTimeEarlierThanSecond = firstTime.isEarlierThan(secondTime);

  const startTime = isFirstTimeEarlierThanSecond ? firstTime : secondTime;
  const endTime = isFirstTimeEarlierThanSecond ? secondTime : firstTime;

  return [startTime, endTime];
}