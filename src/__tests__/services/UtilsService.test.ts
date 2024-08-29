import UtilsService from '../../services/UtilsService';
import { faker } from '@faker-js/faker';

describe('UtilsService', () => {
  describe('getUrlParams', () => {
    test('empty params', () => {
      expect(UtilsService.getUrlParams()).toEqual('');
    });
    test('with params', () => {
      const params = { params: faker.string.uuid() };
      expect(UtilsService.getUrlParams(params)).toEqual(
        `?params=${params.params}`,
      );
    });
  });

  describe('stripHTMLTags', () => {
    test.each([
      {
        html: '',
        expected: '',
      },
      {
        html: '<div><!-- comments --><span test-id="test-att" class="test-class"><!-- another comments-->foo</span></div>',
        expected: 'foo',
      },
    ])('%j', (item) => {
      expect(UtilsService.stripHTMLTags(item.html)).toEqual(item.expected);
    });
  });

  describe('formatIntoCurrency', () => {
    test.each([
      {
        number: 0,
        expected: '$0.00',
      },
      {
        number: 12133232,
        expected: '$12,133,232.00',
      },
      {
        number: 12.34,
        expected: '$12.34',
      },
      {
        number: 12.345,
        expected: '$12.35',
      },
    ])('%j', (item) => {
      expect(UtilsService.formatIntoCurrency(item.number)).toEqual(
        item.expected,
      );
    });
  });

  describe('formatBytesToHuman', () => {
    test.each([
      {
        number: 0,
        expected: '0 Bytes',
      },
      {
        number: 12.34,
        expected: '12.34 Bytes',
      },
      {
        number: 12133232,
        expected: '11.57 MB',
      },
      {
        number: 1213323212,
        expected: '1.13 GB',
      },
      {
        number: 1213323212133,
        expected: '1.1 TB',
      },
      {
        number: 1213323212133232,
        expected: '1.08 PB',
      },
    ])('%j', (item) => {
      expect(UtilsService.formatBytesToHuman(item.number)).toEqual(
        item.expected,
      );
    });
  });

  describe('handleEnterKeyPressed', () => {
    test('with enter key pressed', () => {
      const enterKeyFn = jest.fn();
      const notEnterKeyFn = jest.fn();

      const result = UtilsService.handleEnterKeyPressed(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        {
          key: 'Enter',
        },
        enterKeyFn,
        notEnterKeyFn,
      );
      expect(result).toBe(undefined);

      expect(enterKeyFn).toHaveBeenCalledTimes(1);
      expect(enterKeyFn).toHaveBeenLastCalledWith();
      expect(notEnterKeyFn).toHaveBeenCalledTimes(0);
    });

    test('with enter key not pressed', () => {
      const enterKeyFn = jest.fn();
      const notEnterKeyFn = jest.fn();

      const result = UtilsService.handleEnterKeyPressed(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        {
          key: faker.string.uuid(),
        },
        enterKeyFn,
        notEnterKeyFn,
      );
      expect(result).toBe(undefined);

      expect(enterKeyFn).toHaveBeenCalledTimes(0);
      expect(notEnterKeyFn).toHaveBeenCalledTimes(1);
      expect(notEnterKeyFn).toHaveBeenLastCalledWith();
    });
  });
});
