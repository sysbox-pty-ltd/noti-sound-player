import ComponentTestHelper from '../helpers/ComponentTestHelper';
import { render, screen } from '@testing-library/react';
import HomePage from '../../pages/HomePage';
import { faker } from '@faker-js/faker';

describe('HomePage page', () => {
  ComponentTestHelper.prepare();

  test('render', () => {
    render(<HomePage />);
    expect(
      screen.getByText(/Jira Notification Sound Player/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Jira market place/i)).toHaveAttribute('href', '');
  });

  test('render', () => {
    const fakeUrl = faker.internet.url();
    process.env.REACT_APP_JIRA_PLUGIN_URL = fakeUrl;
    render(<HomePage />);
    expect(
      screen.getByText(/Jira Notification Sound Player/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Jira market place/i)).toHaveAttribute(
      'href',
      fakeUrl,
    );
  });
});
