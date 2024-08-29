import MockedComponentTestHelper from '../../helper/ComponentTestHelper';
import EmptyState from '../../../components/frameWork/EmptyState';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';

jest.mock('@atlaskit/empty-state', () => {
  return {
    __esModule: true,
    default: MockedComponentTestHelper.mockComponent(
      'EmptyStateKey',
      'EmptyStateTestId',
    ),
  };
});

describe('EmptyState', () => {
  MockedComponentTestHelper.prepare();

  test('render', () => {
    const props = {
      header: `header-${faker.string.uuid()}`,
    };
    render(<EmptyState {...props} />);
    expect(screen.getByTestId('EmptyStateTestId')).toBeInTheDocument();
    expect(MockedComponentTestHelper.get('EmptyStateKey')).toStrictEqual([
      props,
    ]);
  });
});
