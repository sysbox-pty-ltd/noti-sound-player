import {useParams} from 'react-router-dom';
import './PlayerPage.css';
import PlayerPanel from '../components/player/PlayerPanel';
// @ts-ignore
import defaultCreatedSound from '../asset/ticketCreated.mp3';
// @ts-ignore
import spanish from '../asset/ticketCreated_spanish.mp3';
import {useState} from 'react';

const PlayerPage = () => {
  const [selectedSound, setSelectedSound] = useState(defaultCreatedSound);
  const {id} = useParams();
  const idStr = `${id || ''}`.trim();
  const langs = [{
    label: 'English',
    value: defaultCreatedSound,
  }, {
    label: 'Spanish',
    value: spanish,
  }]

  if(idStr === '') {
    return <h1>Invalid Player ID. Please double check your Jira project settings.</h1>
  }
  return <div className="player-page-wrapper">
    <div className="lang-selector-wrapper">
      <label>Please select a language to play:</label>
      <select onChange={(event) => {
        setSelectedSound(event.target.value)
      }}>
        {langs.map((lang) => {
          return <option value={lang.value} key={lang.label}>{lang.label}</option>
        })}
      </select>
    </div>
    <PlayerPanel id={idStr} soundFile={selectedSound} />
  </div>;
}

export default PlayerPage
