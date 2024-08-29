import ComponentTestHelper from '../../helpers/ComponentTestHelper';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Button, {
  IconButton,
  LinkIconButton,
} from '../../../components/framework/Button';
import { faker } from '@faker-js/faker';

describe('Framework: Button', () => {
  ComponentTestHelper.prepare();

  const getTestProps = () => {
    return {
      testId: `testid-${faker.string.uuid()}`,
      children: <div data-testid={'children'} />,
      icon: () => <div data-testid={'icon'} />,
      onClick: jest.fn(),
      label: `label-${faker.string.uuid()}`,
      href: faker.internet.url(),
    };
  };

  test('can render Button', () => {
    const { testId, children, icon, onClick } = getTestProps();
    render(
      <Button testId={testId} iconBefore={icon} onClick={onClick}>
        {children}
      </Button>,
    );

    const element = screen.getByTestId(testId);
    expect(element).toBeInTheDocument();

    expect(within(element).getByTestId('children')).toBeInTheDocument();
    expect(within(element).getByTestId('icon')).toBeInTheDocument();

    fireEvent.click(element);

    expect(onClick).toHaveBeenCalled();
  });

  test('can render IconButton', () => {
    const { testId, icon, onClick, label } = getTestProps();
    render(
      <IconButton
        testId={testId}
        icon={icon}
        onClick={onClick}
        label={label}
      />,
    );

    const element = screen.getByTestId(testId);
    expect(element).toBeInTheDocument();

    expect(within(element).getByTestId('icon')).toBeInTheDocument();

    fireEvent.click(element);

    expect(onClick).toHaveBeenCalled();
  });

  test('can render LinkIconButton', () => {
    const { testId, icon, href, label } = getTestProps();
    render(
      <LinkIconButton testId={testId} icon={icon} href={href} label={label} />,
    );

    const element = screen.getByTestId(testId);
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('href', href);

    expect(within(element).getByTestId('icon')).toBeInTheDocument();
  });
});
