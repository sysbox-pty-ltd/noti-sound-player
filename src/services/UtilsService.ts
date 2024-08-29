import { iConfigParams } from './AppService';
import React from 'react';

const handleEnterKeyPressed = (
  event: React.KeyboardEvent<HTMLInputElement>,
  enterFunc?: () => void,
  notEnterFnc?: () => void,
) => {
  if (event.key === 'Enter') {
    return enterFunc && enterFunc();
  }
  return notEnterFnc && notEnterFnc();
};

const stripHTMLTags = (html: string) => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return el.textContent;
};

const getUrlParams = (params: iConfigParams = {}) => {
  const paramString =
    typeof params === 'object' && Object.keys(params).length > 0
      ? new URLSearchParams(params).toString()
      : '';
  return paramString === '' ? '' : `?${paramString}`;
};

const formatIntoCurrency = (number: number, currency = 'AUD') => {
  const formatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
  });
  return formatter.format(number);
};

const formatBytesToHuman = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const UtilsService = {
  formatBytesToHuman,
  handleEnterKeyPressed,
  formatIntoCurrency,
  stripHTMLTags,
  getUrlParams,
};

export default UtilsService;
