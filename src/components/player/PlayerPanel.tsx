import { useState } from 'react';
import LanguageSelector, {
  convertToOption,
  languages,
} from './LanguageSelector';
import styled from 'styled-components';
import Button from '../framework/Button';
import Tokens from '../framework/Tokens';
import SoundPlayer from './SoundPlayer';
import Icons from '../framework/Icons';

type iPlayerPanel = {
  id: string;
  className?: string;
  testId?: string;
};
const Wrapper = styled.div`
  width: 400px;
  max-width: 100%;
  .play-button-container {
    text-align: center;
    margin-top: ${Tokens('space.200')};
  }
`;
const PlayerPanel = ({ id, className, testId }: iPlayerPanel) => {
  const testIdStr = `playerPanel-${testId || ''}`;
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const getContent = () => {
    if (!isPlaying) {
      return (
        <>
          <LanguageSelector
            label={'Select a language to play:'}
            value={convertToOption(selectedLang)}
            onChange={(e) => setSelectedLang(e?.data || languages[0])}
          />
          <div className="play-button-container">
            <Button
              appearance={'primary'}
              testId={`${testIdStr}-play-button`}
              onClick={() => {
                setIsPlaying(true);
              }}
              iconBefore={Icons.VidPlayIcon}
            >
              Start Sound Player
            </Button>
            <p>
              Due to your browser{"'"}s{' '}
              <a
                href={'https://developer.chrome.com/blog/autoplay/#webaudio'}
                target={'__BLANK'}
              >
                restriction
              </a>
              , after you click above button, an initial sound will play. It may{' '}
              <b>NOT</b> mean an ticket has created.
            </p>
          </div>
        </>
      );
    }
    return (
      <SoundPlayer
        companyId={id}
        soundFile={selectedLang.soundFile}
        onStop={() => setIsPlaying(false)}
      />
    );
  };

  return (
    <Wrapper
      className={`player-panel ${className || ''}`}
      data-testid={testIdStr}
    >
      {getContent()}
    </Wrapper>
  );
};

export default PlayerPanel;
