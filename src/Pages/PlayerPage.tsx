import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import FireBaseConnector from '../Connectors/FireBaseConnector';
import useSound from 'use-sound';
// @ts-ignore
import defaultCreatedSound from '../asset/ticketCreated.mp3';

const PlayerPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [play] = useSound(defaultCreatedSound);
  const {id} = useParams();

  useEffect(() => {
    if (isLoaded === true) { return }
    FireBaseConnector.getNotification(`${id || ''}`, (data) => setCurrentData(data))
    setIsLoaded(true);
  }, [isLoaded, id]);

  useEffect(() => {
    if (currentData === null) {
      return;
    }
    play();
    // console.log('data', currentData);
  }, [currentData]);


  if (isLoaded !== true) {
    return <div>Loading ...</div>
  }

  return (
    <div>
      <h4>Listening...</h4>
      <p>When a ticket created then the sound will play.</p>
    </div>
  );
}

export default PlayerPage