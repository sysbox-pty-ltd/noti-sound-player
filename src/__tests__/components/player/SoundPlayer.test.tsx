import ComponentTestHelper from '../../helpers/ComponentTestHelper';
import SoundPlayer from '../../../components/player/SoundPlayer';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { getStringField } from '../../helpers/ModelFaker';
import { act } from 'react';
import useSound from 'use-sound';
import FireBaseConnector from '../../../connectors/FireBaseConnector';

jest.mock('use-sound', () => ({
  ...jest.requireActual('use-sound'),
  __esModule: true,
  default: jest.fn(),
}));
describe('SoundPlayer', () => {
  ComponentTestHelper.prepare();

  const renderComponent = () => {
    const companyId = getStringField('companyId');
    const testId = getStringField('testId');
    const className = getStringField('className');
    const testIdStr = `soundPlayer-${testId || ''}`;
    const soundFile = getStringField('soundFile');
    const iSoundOptions = { iSoundOptions: getStringField('iSoundOptions') };
    const onStop = jest.fn();
    const play = jest.fn();
    const stop = jest.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    useSound.mockReturnValue([play, { stop }]);
    FireBaseConnector.getNotification = jest.fn();
    render(
      <SoundPlayer
        companyId={companyId}
        soundFile={soundFile}
        onStop={onStop}
        iSoundOptions={iSoundOptions}
        testId={testId}
        className={className}
      />,
    );
    const wrapper = screen.getByTestId(testIdStr);
    expect(wrapper).toHaveClass(className);
    expect(
      within(wrapper).getByTestId(`${testIdStr}-spinner`),
    ).toBeInTheDocument();
    expect(play).not.toHaveBeenCalled();
    expect(FireBaseConnector.getNotification).toHaveBeenCalledTimes(1);
    expect(FireBaseConnector.getNotification).toHaveBeenLastCalledWith(
      companyId,
      expect.any(Function),
    );

    const fireBaseConnectorCallBack =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      FireBaseConnector.getNotification.mock.calls[0][1];

    return {
      wrapper,
      testIdStr,
      companyId,
      onStop,
      play,
      fireBaseConnectorCallBack,
    };
  };

  test('can stop', async () => {
    const { wrapper, testIdStr, onStop } = renderComponent();
    const stopBtn = within(wrapper).getByTestId(`${testIdStr}-stop-btn`);

    act(() => {
      fireEvent.click(stopBtn);
    });

    expect(onStop).toHaveBeenCalledTimes(1);
  });

  test('can FireBaseConnector.getNotification', async () => {
    const { fireBaseConnectorCallBack, play } = renderComponent();
    act(() => {
      fireBaseConnectorCallBack();
    });
    expect(play).toHaveBeenCalledTimes(0);
  });
});
