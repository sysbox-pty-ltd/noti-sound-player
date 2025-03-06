import Page from '../layouts/Page';

const DiscontinuePage = () => {
  return (
    <Page>
      <div style={{ width: '600px', margin: 'auto', textAlign: 'center' }}>
        <h1>Project Discontinue</h1>
        <p>
          We apologize for any inconvenience caused. Unfortunately, the{' '}
          <b>Jira Notification Sound</b> project has been discontinued and will
          no longer be actively maintained. We sincerely appreciate the support
          and interest from the community. Please visit Atlassian Marketplace to
          get alternative solutions.
        </p>
      </div>
    </Page>
  );
};

export default DiscontinuePage;
