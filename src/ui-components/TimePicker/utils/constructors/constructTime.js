const constructTime = (hour, minute = 0) => ({
  hour, 
  minute, 

  isEqualTo(time) {
    return this.hour === time.hour
      && this.minute === time.minute;
  },

  isEarlierThan(time) {
    if (this.hour === time.hour) {
      return this.minute < time.minute;
    }

    return this.hour < time.hour;
  },

  isHour() {
    return this.minute === 0;
  },

  addMinutes(minutes) {
    const hoursOver = Math.floor((this.minute + minutes) / 60);
    const minutesOver = (this.minute + minutes) % 60;

    return constructTime(this.hour + hoursOver, minutesOver);
  },

  getListOfTimesTo(time, minuteGranularity) {
    const listOfTimes = [];
    let currTime = this;

    while (currTime.isEarlierThan(time) || currTime.isEqualTo(time)) {
      listOfTimes.push(currTime);
      currTime = currTime.addMinutes(minuteGranularity);
    };

    return listOfTimes;
  },

  toString() {
    return convertMilitaryHourToStandard(this.hour) + ":" 
      + padWithZeroIfSingleCharacter(this.minute) 
      + getMeridiemFromMilitaryHour(this.hour);
  },
  
  toStringMilitaryForm() {
    return padWithZeroIfSingleCharacter(this.hour) + ":"
      + padWithZeroIfSingleCharacter(this.minute);
  },

  toStringWithoutMinutes() {
    return convertMilitaryHourToStandard(this.hour) + getMeridiemFromMilitaryHour(this.hour);
  }
});

const convertMilitaryHourToStandard = (hour) => {
  if (hour === 0) return 12;
  if (hour > 12) return hour - 12;
  return hour;
};

const getMeridiemFromMilitaryHour = (hour) => {
  if (hour < 12) return "am";
  if (hour === 24) return "am";
  return "pm";
};

const padWithZeroIfSingleCharacter = (number) => {
  if (number < 10) return "0" + number.toString();
  return number.toString();
};

export default constructTime;