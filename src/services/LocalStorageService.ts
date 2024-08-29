export enum SelectiveColKeys {
  CONTACT_COMPANY_LIST = 'CONTACT_COMPANY_LIST_:type',
  SUBURB_LIST = 'SUBURB_LIST',
  BUILD_STYLE_LIST = 'BUILD_STYLE_LIST',
}

const getTokenName = () => {
  return process.env.REACT_APP_LOCAL_USER_TOKEN_NAME || 'token';
};

const getToken = () => {
  return localStorage.getItem(getTokenName());
};

const setToken = (newToken: string) => {
  return localStorage.setItem(getTokenName(), newToken);
};

const removeToken = () => {
  return localStorage.removeItem(getTokenName());
};

const getItem = (name: string) => {
  const value = localStorage.getItem(name);
  try {
    return JSON.parse(`${value || ''}`);
  } catch {
    return value;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setItem = (name: string, value: any) => {
  let valueStr = value;
  try {
    valueStr = JSON.stringify(value);
  } catch (err) {
    // console.error('LocalStorageService.setItem', err);
    valueStr = value;
  }

  return localStorage.setItem(name, valueStr);
};

const removeItem = (name: string) => {
  return localStorage.removeItem(name);
};

const LocalStorageService = {
  getToken,
  setToken,
  removeToken,

  setItem,
  getItem,
  removeItem,
};

export default LocalStorageService;
