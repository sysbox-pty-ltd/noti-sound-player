import useSound from 'use-sound';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Spinner from '../framework/Spinner';
import FireBaseConnector from '../../connectors/FireBaseConnector';
import Tokens from '../framework/Tokens';
import Icons from '../framework/Icons';
import Button from '../framework/Button';

type iSoundPlayer = {
  className?: string;
  testId?: string;
  soundFile: string;
  companyId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  iSoundOptions?: any;
  onStop?: () => void;
};
const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  .success-msg {
    background-color: ${Tokens(
      'color.background.accent.green.subtlest.pressed',
    )};
    padding: ${Tokens('space.100', '1rem')};
  }
`;
const SoundPlayer = ({
  soundFile,
  companyId,
  iSoundOptions,
  testId,
  className,
  onStop,
}: iSoundPlayer) => {
  const testIdStr = `soundPlayer-${testId || ''}`;
  const [playingMsg, setPlayingMsg] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [play, { stop }] = useSound(soundFile, {
    onend: () => {
      setPlayingMsg(null);
    },
    ...iSoundOptions,
  });

  const getData = useCallback(() => {
    FireBaseConnector.getNotification(companyId, () => {
      if (!isLoaded) {
        setIsLoaded(true); // Mark as loaded on the first call
        return;
      }
      play();
      setPlayingMsg('New Ticket Created.');
    });
  }, [companyId, isLoaded, play]);

  useEffect(() => {
    getData();
    return () => {
      stop();
    };
  }, [companyId, soundFile, getData, stop]);

  const getContent = () => {
    const playingMsgStr = `${playingMsg || ''}`.trim();
    if (playingMsgStr !== '') {
      return (
        <div className={'success-msg'} data-testid={`${testIdStr}-success-msg`}>
          <div className={'icon-wrapper'}>
            <Icons.NotificationAllIcon label={playingMsgStr} />
          </div>
          <div>{playingMsgStr}</div>
        </div>
      );
    }
    return (
      <>
        <div className="spinner-container" data-testid={`${testIdStr}-spinner`}>
          <Spinner />
        </div>
        <h4>Listening...</h4>
        <p>When a ticket created then the sound will play.</p>
      </>
    );
  };

  return (
    <Wrapper
      className={`sound-player-wrapper ${className || ''}`}
      data-testid={testIdStr}
    >
      <div>{getContent()}</div>
      {onStop && (
        <div className={'stop-btn-wrapper'}>
          <Button
            appearance={'subtle'}
            testId={`${testIdStr}-stop-btn`}
            onClick={() => onStop()}
            iconBefore={Icons.EditorTextColorIcon}
          >
            Stop
          </Button>{' '}
        </div>
      )}
    </Wrapper>
  );
};

export default SoundPlayer;
