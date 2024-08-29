import ComponentTestHelper from '../../helpers/ComponentTestHelper';
import { render, screen } from '@testing-library/react';
import Select, {
  AsyncSelect,
  convertSameValueToOption,
} from '../../../components/framework/Select';
import MockedComponentTestHelper from '../../helpers/ComponentTestHelper';
import { faker } from '@faker-js/faker';

jest.mock('@atlaskit/select', () => {
  return {
    __esModule: true,
    default: MockedComponentTestHelper.mockComponent(
      'SelectKey',
      'SelectTestId',
    ),
    AsyncSelect: MockedComponentTestHelper.mockComponent(
      'AsyncSelectKey',
      'AsyncSelectTestId',
    ),
  };
});

describe('Select', () => {
  ComponentTestHelper.prepare();

  test('render', () => {
    const props = {
      testId: `testId-${faker.string.uuid()}`,
    };
    render(<Select {...props} />);
    expect(screen.getByTestId('SelectTestId')).toBeInTheDocument();
    expect(MockedComponentTestHelper.get('SelectKey')).toStrictEqual([
      { ...props, className: undefined, inputId: expect.anything() },
    ]);
  });

  test('AsyncSelect', () => {
    const props = {
      testId: `testId-${faker.string.uuid()}`,
    };
    render(<AsyncSelect {...props} />);
    expect(screen.getByTestId('AsyncSelectTestId')).toBeInTheDocument();
    expect(MockedComponentTestHelper.get('AsyncSelectKey')).toStrictEqual([
      { ...props, className: undefined, inputId: expect.anything() },
    ]);
  });

  describe('convertSameValueToOption', () => {
    test.each([[faker.string.uuid()], [faker.number.int()]])('%s', (value) => {
      expect(convertSameValueToOption(value)).toStrictEqual({
        value: value,
        label: `${value}`,
      });
    });
  });
});
