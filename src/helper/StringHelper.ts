const validateEmail = (emailString: string | number | null | undefined) => {
  if (`${emailString || ''}`.trim() === '') {
    return false;
  }
  const regex =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(`${emailString || ''}`.trim());
};

const validateMacAddress = (macAddress: string | number | null | undefined) => {
  if (`${macAddress || ''}`.trim() === '') {
    return false;
  }
  // eslint-disable-next-line no-useless-escape
  const regex = /^[0-9a-f]{2}([\.:-])(?:[0-9a-f]{2}\1){4}[0-9a-f]{2}$/i;
  return regex.test(`${macAddress || ''}`.trim());
};

const isNumeric = (str: string | null | undefined) => {
  if (str == null || typeof str === 'undefined') {
    return false;
  }
  return !isNaN(parseFloat(str)) && isFinite(Number(str));
};

const letterRange = (start: string, stop: string) => {
  const result = [];
  for (
    let idx = start.charCodeAt(0), end = stop.charCodeAt(0);
    idx <= end;
    ++idx
  ) {
    result.push(String.fromCharCode(idx));
  }
  return result;
};

const StringHelper = {
  isNumeric,
  letterRange,
  validateEmail,
  validateMacAddress,
};

export default StringHelper;
