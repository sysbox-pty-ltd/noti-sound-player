import MockedComponentTestHelper from '../../helpers/ComponentTestHelper';
import PageLayout, {
  LeftSidebar,
  Main,
  Content,
  TopNavigation,
} from '../../../components/framework/PageLayout';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';

jest.mock('@atlaskit/page-layout', () => {
  return {
    __esModule: true,
    Content: MockedComponentTestHelper.mockComponent(
      'ContentKey',
      'ContentTestId',
    ),
    PageLayout: MockedComponentTestHelper.mockComponent(
      'PageLayoutKey',
      'PageLayoutTestId',
    ),
    Main: MockedComponentTestHelper.mockComponent('MainKey', 'MainTestId'),
    TopNavigation: MockedComponentTestHelper.mockComponent(
      'TopNavigationKey',
      'TopNavigationTestId',
    ),
    LeftSidebar: MockedComponentTestHelper.mockComponent(
      'LeftSidebarKey',
      'LeftSidebarTestId',
    ),
  };
});

describe('PageLayout', () => {
  MockedComponentTestHelper.prepare();

  test('Content', () => {
    const props = {
      children: <div data-testid={faker.string.uuid()} />,
    };
    render(<Content {...props} />);

    expect(screen.getByTestId('ContentTestId')).toBeInTheDocument();
    expect(MockedComponentTestHelper.get('ContentKey')).toStrictEqual([props]);
  });

  test('PageLayout', () => {
    const props = {
      children: <div data-testid={faker.string.uuid()} />,
    };
    render(<PageLayout {...props} />);

    expect(screen.getByTestId('PageLayoutTestId')).toBeInTheDocument();
    expect(MockedComponentTestHelper.get('PageLayoutKey')).toStrictEqual([
      props,
    ]);
  });

  test('Main', () => {
    const props = {
      children: <div data-testid={faker.string.uuid()} />,
    };
    render(<Main {...props} />);

    expect(screen.getByTestId('MainTestId')).toBeInTheDocument();
    expect(MockedComponentTestHelper.get('MainKey')).toStrictEqual([props]);
  });

  test('TopNavigation', () => {
    const props = {
      children: <div data-testid={faker.string.uuid()} />,
    };
    render(<TopNavigation {...props} />);

    expect(screen.getByTestId('TopNavigationTestId')).toBeInTheDocument();
    expect(MockedComponentTestHelper.get('TopNavigationKey')).toStrictEqual([
      props,
    ]);
  });

  test('LeftSidebar', () => {
    const props = {
      children: <div data-testid={faker.string.uuid()} />,
    };
    render(<LeftSidebar {...props} />);

    expect(screen.getByTestId('LeftSidebarTestId')).toBeInTheDocument();
    expect(MockedComponentTestHelper.get('LeftSidebarKey')).toStrictEqual([
      props,
    ]);
  });
});
