import ComponentTestHelper from '../../../__tests__/helpers/ComponentTestHelper';

const { key, testId } = ComponentTestHelper.getKeyAndTestId('PlayerPanel');
export const PlayerPanelKey = key;
export const PlayerPanelTestId = testId;
const PlayerPanel = ComponentTestHelper.mockComponent(
  PlayerPanelKey,
  PlayerPanelTestId,
);

export default PlayerPanel;
