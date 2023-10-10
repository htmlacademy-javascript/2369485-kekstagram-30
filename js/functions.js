const checksLineLength = (string, maxLength) => (string.length >= maxLength);

checksLineLength();

const checksPalindomority = (string) => {
  const newString = string.replaceAll(' ', '').toUpperCase();
  let emptyString = '';
  for(let i = newString.length - 1; i >= 0; i--) {
    emptyString = emptyString + newString.at(i);
  }
  if (newString === emptyString) {
    return true;
  }else {
    return false;
  }
};

checksPalindomority();
