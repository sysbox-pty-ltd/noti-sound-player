import ComponentTestHelper from '../../../__tests__/helpers/ComponentTestHelper';
import { iLanguage } from '../LanguageSelector';

const { key, testId } = ComponentTestHelper.getKeyAndTestId('LanguageSelector');
export const LanguageSelectorKey = key;
export const LanguageSelectorTestId = testId;
const LanguageSelector = ComponentTestHelper.mockComponent(
  LanguageSelectorKey,
  LanguageSelectorTestId,
);

const soundFileFolder = '/soundFiles/';
export const languages: iLanguage[] = [
  {
    soundFile: `${soundFileFolder}/english.mp3`,
    name: 'English',
  },
  {
    soundFile: `${soundFileFolder}/spanish.mp3`,
    name: 'Español',
  },
];
export const convertToOption = (lang: iLanguage) => ({
  value: lang.soundFile,
  label: lang.name,
  data: lang,
});

export default LanguageSelector;
