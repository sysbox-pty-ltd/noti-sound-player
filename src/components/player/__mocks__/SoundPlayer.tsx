import ComponentTestHelper from '../../../__tests__/helpers/ComponentTestHelper';

const { key, testId } = ComponentTestHelper.getKeyAndTestId('SoundPlayer');
export const SoundPlayerKey = key;
export const SoundPlayerTestId = testId;
const SoundPlayer = ComponentTestHelper.mockComponent(
  SoundPlayerKey,
  SoundPlayerTestId,
);

export default SoundPlayer;
