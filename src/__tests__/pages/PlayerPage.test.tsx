import ComponentTestHelper from '../helpers/ComponentTestHelper';
import { render, screen } from '@testing-library/react';
import PlayerPage from '../../pages/PlayerPage';
import { useParams } from 'react-router-dom';
import {
  PlayerPanelKey,
  PlayerPanelTestId,
} from '../../components/player/__mocks__/PlayerPanel';
import { getStringField } from '../helpers/ModelFaker';

jest.mock('../../components/player/PlayerPanel');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('PlayerPage', () => {
  ComponentTestHelper.prepare();

  test('render without id', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    useParams.mockReturnValue({});
    render(<PlayerPage />);

    expect(
      screen.getByText(
        /Invalid Player ID. Please double check your Jira project settings./i,
      ),
    ).toBeInTheDocument();
    expect(screen.queryByTestId(PlayerPanelTestId)).not.toBeInTheDocument();
    expect(ComponentTestHelper.get(PlayerPanelKey)).toBe(null);
  });

  test('render with id', () => {
    const fakeId = getStringField('fakeId');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    useParams.mockReturnValue({ id: fakeId });
    render(<PlayerPage />);

    expect(
      screen.queryByText(
        /Invalid Player ID. Please double check your Jira project settings./i,
      ),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId(PlayerPanelTestId)).toBeInTheDocument();
    expect(ComponentTestHelper.get(PlayerPanelKey)).toEqual([{ id: fakeId }]);
  });
});
