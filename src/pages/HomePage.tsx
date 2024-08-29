import Page from '../layouts/Page';

const HomePage = () => {
  return (
    <Page>
      <h1>Jira Notification Sound Player</h1>
      <a href={process.env.REACT_APP_JIRA_PLUGIN_URL || ''}>
        Jira market place
      </a>
    </Page>
  );
};

export default HomePage;
