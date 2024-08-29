import { useParams } from 'react-router-dom';
import PlayerPanel from '../components/player/PlayerPanel';
import Page from '../layouts/Page';

const PlayerPage = () => {
  const { id } = useParams();
  const idStr = `${id || ''}`.trim();

  const getContent = () => {
    if (idStr === '') {
      return (
        <h1>
          Invalid Player ID. Please double check your Jira project settings.
        </h1>
      );
    }
    return <PlayerPanel id={idStr} />;
  };

  return <Page>{getContent()}</Page>;
};

export default PlayerPage;
