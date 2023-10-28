const checkLineLength = (string, maxLength) => (string.length >= maxLength);

checkLineLength();

const checkForPalindrom = (string) => {
  const newString = string.replaceAll(' ', '').toUpperCase();
  let emptyString = '';
  for (let i = newString.length - 1; i >= 0; i--) {
    emptyString = emptyString + newString.at(i);
  }
  if (newString === emptyString) {
    return true;
  }
  return false;
};

checkForPalindrom();

const getTimeArray = function (time) {
  const createArray = time.split(':');
  const getMinutes = (parseInt(createArray[0], 10) * 60) + parseInt(createArray[1], 10);

  return getMinutes;
};

const comparisonTime = function (startTime, endTime, meetTime, long) {
  const startMin = getTimeArray(startTime);
  const endMin = getTimeArray(endTime);
  const meetMin = getTimeArray(meetTime);

  return startMin <= meetMin && endMin >= (meetMin + long);
};

comparisonTime();
