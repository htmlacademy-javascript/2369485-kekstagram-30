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
