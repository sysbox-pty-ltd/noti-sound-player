import Select, { iOption } from '../framework/Select';

type iLanguageSelector = {
  testId?: string;
  label?: string;
  value?: iOption;
  onChange: (option: iOption | null) => void;
};
const soundFileFolder = '/soundFiles/';
export type iLanguage = {
  soundFile: string;
  name: string;
};
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
const LanguageSelector = ({
  label,
  onChange,
  value,
  testId,
}: iLanguageSelector) => {
  return (
    <Select
      options={languages.map((lang) => convertToOption(lang))}
      onChange={(option) => onChange(option)}
      label={label}
      value={value}
      testId={testId}
    />
  );
};

export default LanguageSelector;
