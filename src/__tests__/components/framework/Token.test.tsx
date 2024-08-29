import { render, screen } from '@testing-library/react';
import MockedComponentTestHelper from '../../helpers/ComponentTestHelper';
import { faker } from '@faker-js/faker';
import Tokens from '../../../components/framework/Tokens';

jest.mock('@atlaskit/tokens', () => {
  return {
    __esModule: true,
    token: MockedComponentTestHelper.mockComponent('TokensKey', 'TokensTestId'),
  };
});

describe('Tokens', () => {
  MockedComponentTestHelper.prepare();

  test('render', () => {
    const props = {
      testId: `testId-${faker.string.uuid()}`,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    render(<Tokens {...props} />);
    expect(screen.getByTestId('TokensTestId')).toBeInTheDocument();
    expect(MockedComponentTestHelper.get('TokensKey')).toStrictEqual([props]);
  });
});
