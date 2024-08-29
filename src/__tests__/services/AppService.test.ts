import AppService, { HEADER_NAME_APP_TOKEN } from '../../services/AppService';
import TestHelper from '../helpers/TestHelper';
import axios, { AxiosRequestConfig } from 'axios';
import UtilsService from '../../services/UtilsService';
import { faker } from '@faker-js/faker';
import LocalStorageService from '../../services/LocalStorageService';

describe('AppService', () => {
  TestHelper.prepareEnv();

  const getExpectedConfigWithAppToken = (
    fakeConfig: AxiosRequestConfig,
    fakeAppToken?: string,
    extra = {},
  ): AxiosRequestConfig => {
    return {
      ...fakeConfig,
      headers: {
        ...fakeConfig?.headers,
        ...(`${fakeAppToken || ''}`.trim() === ''
          ? {}
          : { [HEADER_NAME_APP_TOKEN]: fakeAppToken }),
        ...extra,
      },
    };
  };

  describe('getEndPointUrl', () => {
    test('', () => {
      const { fakeUrl, fakeUrlPath } = TestHelper.getFakeParams();
      process.env.REACT_APP_API_URL = fakeUrl;

      expect(AppService.getEndPointUrl(fakeUrlPath)).toEqual(
        `${fakeUrl}${fakeUrlPath}`,
      );
    });
  });

  describe('get', () => {
    test.each([
      {
        appToken: undefined,
        authToken: undefined,
        extraParams: undefined,
        config: undefined,
      },
      { appToken: '', authToken: '', extraParams: {}, config: {} },
      {
        appToken: faker.string.uuid(),
        authToken: faker.string.uuid(),
        extraParams: { extraParams: faker.string.uuid() },
        config: { timeout: faker.number.int() },
      },
    ])('%j', async (item) => {
      const { fakeUrl, fakeUrlPath, fakeResp } = TestHelper.getFakeParams();
      process.env.REACT_APP_API_URL = fakeUrl;
      process.env.REACT_APP_TOKEN = item.appToken;
      LocalStorageService.getToken = jest
        .fn()
        .mockReturnValueOnce(item.authToken);
      axios.get = jest.fn().mockResolvedValue(fakeResp);

      expect(
        await AppService.get(fakeUrlPath, item.extraParams, item.config),
      ).toEqual(fakeResp);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenLastCalledWith(
        `${fakeUrl}${fakeUrlPath}${UtilsService.getUrlParams(item.extraParams)}`,
        getExpectedConfigWithAppToken(
          item.config || {},
          item.appToken,
          `${item.authToken || ''}`.trim() !== ''
            ? { Authorization: `Bearer ${item.authToken}` }
            : {},
        ),
      );
    });
  });

  describe('post', () => {
    test.each([
      {
        appToken: undefined,
        authToken: undefined,
        config: undefined,
      },
      { appToken: '', authToken: '', config: {} },
      {
        appToken: faker.string.uuid(),
        authToken: faker.string.uuid(),
        config: { timeout: faker.number.int() },
      },
    ])('%j', async (item) => {
      const { fakeUrl, fakeUrlPath, fakeResp, fakeParams } =
        TestHelper.getFakeParams();
      process.env.REACT_APP_API_URL = fakeUrl;
      process.env.REACT_APP_TOKEN = item.appToken;
      LocalStorageService.getToken = jest
        .fn()
        .mockReturnValueOnce(item.authToken);
      axios.post = jest.fn().mockResolvedValue(fakeResp);

      expect(
        await AppService.post(fakeUrlPath, fakeParams, item.config),
      ).toEqual(fakeResp);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenLastCalledWith(
        `${fakeUrl}${fakeUrlPath}`,
        fakeParams,
        getExpectedConfigWithAppToken(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          item.config,
          item.appToken,
          `${item.authToken || ''}`.trim() !== ''
            ? { Authorization: `Bearer ${item.authToken}` }
            : {},
        ),
      );
    });
  });

  describe('put', () => {
    test.each([
      {
        appToken: undefined,
        authToken: undefined,
        config: undefined,
      },
      { appToken: '', authToken: '', config: {} },
      {
        appToken: faker.string.uuid(),
        authToken: faker.string.uuid(),
        config: { timeout: faker.number.int() },
      },
    ])('%j', async (item) => {
      const { fakeUrl, fakeUrlPath, fakeResp, fakeParams } =
        TestHelper.getFakeParams();
      process.env.REACT_APP_API_URL = fakeUrl;
      process.env.REACT_APP_TOKEN = item.appToken;
      LocalStorageService.getToken = jest
        .fn()
        .mockReturnValueOnce(item.authToken);
      axios.put = jest.fn().mockResolvedValue(fakeResp);

      expect(
        await AppService.put(fakeUrlPath, fakeParams, item.config),
      ).toEqual(fakeResp);
      expect(axios.put).toHaveBeenCalledTimes(1);
      expect(axios.put).toHaveBeenLastCalledWith(
        `${fakeUrl}${fakeUrlPath}`,
        fakeParams,
        getExpectedConfigWithAppToken(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          item.config,
          item.appToken,
          `${item.authToken || ''}`.trim() !== ''
            ? { Authorization: `Bearer ${item.authToken}` }
            : {},
        ),
      );
    });
  });

  describe('delete()', () => {
    test.each([
      {
        appToken: undefined,
        authToken: undefined,
        extraParams: undefined,
        config: undefined,
      },
      { appToken: '', authToken: '', extraParams: {}, config: {} },
      {
        appToken: faker.string.uuid(),
        authToken: faker.string.uuid(),
        extraParams: { extraParams: faker.string.uuid() },
        config: { timeout: faker.number.int() },
      },
    ])('%j', async (item) => {
      const { fakeUrl, fakeUrlPath, fakeResp } = TestHelper.getFakeParams();
      process.env.REACT_APP_API_URL = fakeUrl;
      process.env.REACT_APP_TOKEN = item.appToken;
      LocalStorageService.getToken = jest
        .fn()
        .mockReturnValueOnce(item.authToken);
      axios.delete = jest.fn().mockResolvedValue(fakeResp);

      expect(
        await AppService.delete(fakeUrlPath, item.extraParams, item.config),
      ).toEqual(fakeResp);
      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(axios.delete).toHaveBeenLastCalledWith(
        `${fakeUrl}${fakeUrlPath}${UtilsService.getUrlParams(item.extraParams)}`,
        getExpectedConfigWithAppToken(
          item.config || {},
          item.appToken,
          `${item.authToken || ''}`.trim() !== ''
            ? { Authorization: `Bearer ${item.authToken}` }
            : {},
        ),
      );
    });
  });

  describe('uploadImage()', () => {
    test.each([
      {
        appToken: undefined,
        authToken: undefined,
        config: undefined,
      },
      { appToken: '', authToken: '', config: {} },
      {
        appToken: faker.string.uuid(),
        authToken: faker.string.uuid(),
        config: {
          timeout: faker.number.int(),
        },
      },
    ])('%j', async (item) => {
      const { fakeUrl, fakeUrlPath, fakeResp, fakeParams } =
        TestHelper.getFakeParams();
      process.env.REACT_APP_API_URL = fakeUrl;
      process.env.REACT_APP_TOKEN = item.appToken;
      LocalStorageService.getToken = jest
        .fn()
        .mockReturnValueOnce(item.authToken);
      axios.post = jest.fn().mockResolvedValue(fakeResp);

      expect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        await AppService.uploadImage(fakeUrlPath, fakeParams, item.config),
      ).toEqual(fakeResp);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenLastCalledWith(
        `${fakeUrl}${fakeUrlPath}`,
        fakeParams,
        getExpectedConfigWithAppToken(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          item.config,
          item.appToken,
          {
            'Content-Type': 'multipart/form-data',
            ...(`${item.authToken || ''}`.trim() !== ''
              ? { Authorization: `Bearer ${item.authToken}` }
              : {}),
          },
        ),
      );
    });
  });
});
