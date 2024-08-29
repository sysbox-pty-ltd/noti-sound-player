import StringHelper from '../../helpers/StringHelper';
import { faker } from '@faker-js/faker';

describe('StringHelper', () => {
  describe('isNumeric', () => {
    test.each([
      {
        value: '',
        expected: false,
      },
      {
        value: '12ab',
        expected: false,
      },
      {
        value: null,
        expected: false,
      },
      {
        value: undefined,
        expected: false,
      },
      {
        value: '1',
        expected: true,
      },
      {
        value: '0',
        expected: true,
      },
      {
        value: '0.123',
        expected: true,
      },
    ])('%j', (item) => {
      expect(StringHelper.isNumeric(item.value)).toBe(item.expected);
    });
  });

  describe('letterRange', () => {
    test.each([
      {
        start: 'b',
        end: 'd',
        expected: ['b', 'c', 'd'],
      },
      {
        start: 'd',
        end: 'b',
        expected: [],
      },
      {
        start: 'd',
        end: 'ee',
        expected: ['d', 'e'],
      },
    ])('%j', (item) => {
      expect(StringHelper.letterRange(item.start, item.end)).toEqual(
        item.expected,
      );
    });
  });

  describe('validateEmail', () => {
    test.each([
      {
        email: 'b@example.com',
        expected: true,
      },
      {
        email: 'b.c@example.com',
        expected: true,
      },
      {
        email: 'b.c@example.com.au',
        expected: true,
      },
      {
        email: 'b_c@example.com.au',
        expected: true,
      },

      {
        email: null,
        expected: false,
      },
      {
        email: '',
        expected: false,
      },
      {
        email: faker.number.int(),
        expected: false,
      },
      {
        email: undefined,
        expected: false,
      },
      {
        email: 'b_c@example',
        expected: false,
      },
      {
        email: 'b_c',
        expected: false,
      },
      {
        email: '@example.com',
        expected: false,
      },
    ])('%j', (item) => {
      expect(StringHelper.validateEmail(item.email)).toEqual(item.expected);
    });
  });

  describe('validateMacAddress', () => {
    test.each([
      {
        address: 'AB:CD:EF:00:11:22',
        expected: true,
      },
      {
        address: 'ab:cd:ef:00:11:22',
        expected: true,
      },

      {
        address: null,
        expected: false,
      },
      {
        address: '',
        expected: false,
      },
      {
        address: undefined,
        expected: false,
      },
      {
        address: faker.number.int(),
        expected: false,
      },
      {
        address: faker.string.uuid(),
        expected: false,
      },
      {
        address: 'ab:cd:ef:hi:jk',
        expected: false,
      },
      {
        address: 'AB:CD:EF:00:11:22:12',
        expected: false,
      },
      {
        address: 'AB:CD:EF:00:11',
        expected: false,
      },
    ])('%j', (item) => {
      expect(StringHelper.validateMacAddress(item.address)).toEqual(
        item.expected,
      );
    });
  });
});
