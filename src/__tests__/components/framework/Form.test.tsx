import MockedComponentTestHelper from '../../helpers/ComponentTestHelper';
import Form from '../../../components/framework/Form';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';

jest.mock('@atlaskit/form', () => {
  return {
    __esModule: true,
    default: MockedComponentTestHelper.mockComponent('FormKey', 'FormTestId'),
  };
});

describe('Form', () => {
  MockedComponentTestHelper.prepare();

  test('renderForm', () => {
    const props = {
      children: <div data-testid="form" />,
      testId: `testId-${faker.string.uuid()}`,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    render(<Form {...props} />);
    expect(screen.getByTestId('FormTestId')).toBeInTheDocument();
    expect(MockedComponentTestHelper.get('FormKey')).toStrictEqual([props]);
  });
});
