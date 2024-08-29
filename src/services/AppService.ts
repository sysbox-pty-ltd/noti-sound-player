import axios, { AxiosRequestConfig } from 'axios';
import LocalStorageService from './LocalStorageService';
import UtilsService from './UtilsService';

export const HEADER_NAME_APP_TOKEN = 'X-APP-TOKEN';

export type iConfigParams = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
export type iParams = {
  [key: string]: string | boolean | number | null | undefined | string[];
};

const getEndPointUrl = (url: string) => {
  return `${process.env.REACT_APP_API_URL}${url}`;
};

const getHeaders = (extra = {}) => {
  const token = LocalStorageService.getToken();
  const authHeader =
    !token || token === '' ? {} : { Authorization: `Bearer ${token}` };
  const appToken = `${process.env.REACT_APP_TOKEN || ''}`.trim();
  return {
    headers: {
      ...(appToken === ''
        ? {}
        : {
            [HEADER_NAME_APP_TOKEN]: appToken,
          }),
      ...authHeader,
      ...extra,
    },
  };
};

const get = (
  url: string,
  params: iConfigParams = {},
  config: AxiosRequestConfig = {},
) => {
  const { headers, ...rest } = config;
  return axios.get(
    `${getEndPointUrl(url)}${UtilsService.getUrlParams(params)}`,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    {
      ...rest,
      ...getHeaders(headers),
    },
  );
};

const post = (
  url: string,
  params: iParams,
  config: AxiosRequestConfig = {},
) => {
  const { headers, ...rest } = config;
  return axios.post(getEndPointUrl(url), params, {
    ...rest,
    ...getHeaders(headers),
  });
};

const put = (
  url: string,
  params: iConfigParams,
  config: AxiosRequestConfig = {},
) => {
  const { headers, ...rest } = config;
  return axios.put(getEndPointUrl(url), params, {
    ...rest,
    ...getHeaders(headers),
  });
};

const remove = (
  url: string,
  params: iConfigParams = {},
  config: AxiosRequestConfig = {},
) => {
  const { headers, ...rest } = config;
  return axios.delete(
    `${getEndPointUrl(url)}${UtilsService.getUrlParams(params)}`,
    {
      ...rest,
      ...getHeaders(headers),
    },
  );
};
const getUploadHeaders = (extra = {}) => {
  const headers = getHeaders();
  return {
    headers: {
      ...headers.headers,
      'Content-Type': 'multipart/form-data',
      ...extra,
    },
  };
};
const uploadImage = (
  url: string,
  params?: FormData,
  config: AxiosRequestConfig = {},
) => {
  return axios.post(getEndPointUrl(url), params, {
    ...config,
    ...getUploadHeaders(config.headers),
  });
};

const AppService = {
  get,
  post,
  put,
  delete: remove,
  uploadImage,
  getEndPointUrl,
};

export default AppService;
