import ComponentTestHelper from '../../helpers/ComponentTestHelper';
import { render, screen } from '@testing-library/react';
import Spinner from '../../../components/framework/Spinner';
import MockedComponentTestHelper from '../../helpers/ComponentTestHelper';
import { faker } from '@faker-js/faker';

jest.mock('@atlaskit/spinner', () => {
  return {
    __esModule: true,
    default: MockedComponentTestHelper.mockComponent(
      'SpinnerKey',
      'SpinnerTestId',
    ),
  };
});

describe('Spinner', () => {
  ComponentTestHelper.prepare();

  test('render', () => {
    const props = {
      testId: `testId-${faker.string.uuid()}`,
    };
    render(<Spinner {...props} />);
    expect(screen.getByTestId('SpinnerTestId')).toBeInTheDocument();
    expect(MockedComponentTestHelper.get('SpinnerKey')).toStrictEqual([props]);
  });
});
