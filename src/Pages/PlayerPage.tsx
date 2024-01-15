import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import FireBaseConnector from '../Connectors/FireBaseConnector';
import useSound from 'use-sound';
// @ts-ignore
import defaultCreatedSound from '../asset/ticketCreated.mp3';
import './PlayerPage.css';

const PlayerPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [volume] = useState(1);
  const [playingMsg, setPlayingMsg] = useState<string | null>(null);
  const [play] = useSound(defaultCreatedSound, {
    volume,
    onend: () => {
      setPlayingMsg(null);
    },
  });
  const {id} = useParams();

  useEffect(() => {
    if (isLoaded === true) { return }
    FireBaseConnector.getNotification(`${id || ''}`, (data) => {
      setCurrentData(data);
      setPlayingMsg('New Ticket Created.');
    })
    setIsLoaded(true);
  }, [isLoaded, id]);

  // const playSound = useCallback(() => {
  //   play();
  // }, [play])

  useEffect(() => {
    if (currentData === null || isPlaying !== true) {
      return;
    }
    // Unmute after a short delay (adjust as needed)
    const delay = setTimeout(() => {
      play();
    }, 500); // 1000 milliseconds = 1 second

    return () => clearTimeout(delay);
  }, [currentData, play, isPlaying]);


  if (isLoaded !== true) {
    return (
      <div className="play-button-container">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
        <div>Loading ...</div>
      </div>
    );
  }

  if (isPlaying !== true) {
    return (
      <div className="play-button-container">
        <button className="play-button" onClick={() => {
          setIsPlaying(true);
          play();
        }}>
          Start Sound Player
        </button>
        <p style={{maxWidth: '400px'}}>Due to your browser's <a href={'https://developer.chrome.com/blog/autoplay/#webaudio'} target={'__BLANK'}>restriction</a>, after you click above button, an initial sound will play. It may <b>NOT</b> mean an ticket has created.</p>
      </div>);
  }

  return (
    <div className="play-button-container">
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
      <h4>Listening...</h4>
      <p>{`${playingMsg || ''}`.trim() !== '' ? `${playingMsg || ''}`.trim() : 'When a ticket created then the sound will play.'}</p>
    </div>
  );
}

export default PlayerPage
