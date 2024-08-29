import TestHelper from '../helpers/TestHelper';
import LocalStorageService from '../../services/LocalStorageService';
import { faker } from '@faker-js/faker';

describe('LocalStorageService', () => {
  TestHelper.prepareEnv();

  beforeEach(() => {
    localStorage.clear();
  });

  const getTokenParams = () => {
    const name = faker.string.uuid();
    const value = faker.string.uuid();
    const valueJson = { json: faker.string.uuid() };

    return {
      name,
      value,
      valueJson,
    };
  };

  describe('getToken', () => {
    test('with overwritten token name', () => {
      const { name: tokenName, value: token } = getTokenParams();
      process.env.REACT_APP_LOCAL_USER_TOKEN_NAME = tokenName;
      localStorage.setItem(tokenName, token);

      expect(LocalStorageService.getToken()).toEqual(token);
    });

    test('with default token name', () => {
      const { value: token } = getTokenParams();
      localStorage.setItem('token', token);

      expect(LocalStorageService.getToken()).toEqual(token);
    });
  });

  describe('setToken', () => {
    test('with overwritten token name', () => {
      const { name: tokenName, value: token } = getTokenParams();
      process.env.REACT_APP_LOCAL_USER_TOKEN_NAME = tokenName;

      expect(LocalStorageService.setToken(token)).toEqual(undefined);
      expect(localStorage.getItem(tokenName)).toEqual(token);
    });

    test('with default token name', () => {
      const { value: token } = getTokenParams();

      expect(LocalStorageService.setToken(token)).toEqual(undefined);
      expect(localStorage.getItem('token')).toEqual(token);
    });
  });

  describe('removeToken', () => {
    test('with overwritten token name', () => {
      const { name: tokenName, value: token } = getTokenParams();
      process.env.REACT_APP_LOCAL_USER_TOKEN_NAME = tokenName;
      localStorage.setItem(tokenName, token);

      expect(LocalStorageService.removeToken()).toEqual(undefined);
      expect(localStorage.getItem(tokenName)).toEqual(null);
    });

    test('with default token name', () => {
      const { value: token } = getTokenParams();
      localStorage.setItem('token', token);

      expect(LocalStorageService.removeToken()).toEqual(undefined);
      expect(localStorage.getItem('token')).toEqual(null);
    });
  });

  describe('getItem', () => {
    test('invalid json', () => {
      const { name, value } = getTokenParams();
      localStorage.setItem(name, value);

      expect(LocalStorageService.getItem(name)).toEqual(value);
    });

    test('with undefined value', () => {
      const { name } = getTokenParams();

      expect(LocalStorageService.getItem(name)).toEqual(null);
    });
  });

  describe('setItem', () => {
    describe('validJson', () => {
      test.each([
        {
          value: faker.string.uuid(),
        },
        {
          value: faker.number.float(),
        },
        {
          value: faker.number.int(),
        },
        {
          value: { fake: faker.string.uuid() },
        },
        {
          value: null,
        },
      ])('%j', (item) => {
        const name = faker.string.uuid();
        expect(LocalStorageService.setItem(name, item.value)).toEqual(
          undefined,
        );
        expect(localStorage.getItem(name)).toEqual(JSON.stringify(item.value));
      });
    });

    describe('inValidJson', () => {
      test('', () => {
        const name = faker.string.uuid();
        const value = { big: BigInt(123) };
        // JSON.stringify = jest.fn().mockRejectedValueOnce({});
        expect(LocalStorageService.setItem(name, value)).toEqual(undefined);
        expect(localStorage.getItem(name)).toEqual('[object Object]');
      });
    });
  });

  describe('removeItem', () => {
    test('localStorage has item', () => {
      const { name, value } = getTokenParams();
      localStorage.setItem(name, value);

      expect(LocalStorageService.removeItem(name)).toEqual(undefined);
      expect(localStorage.getItem(name)).toEqual(null);
    });

    test('localStorage has no item', () => {
      const { name } = getTokenParams();

      expect(LocalStorageService.removeItem(name)).toEqual(undefined);
      expect(localStorage.getItem(name)).toEqual(null);
    });
  });
});
