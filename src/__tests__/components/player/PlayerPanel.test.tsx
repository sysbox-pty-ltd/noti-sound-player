import ComponentTestHelper from '../../helpers/ComponentTestHelper';
import { fireEvent, render, screen, within } from '@testing-library/react';
import PlayerPanel from '../../../components/player/PlayerPanel';
import { getStringField } from '../../helpers/ModelFaker';
import {
  LanguageSelectorKey,
  LanguageSelectorTestId,
} from '../../../components/player/__mocks__/LanguageSelector';
import { languages } from '../../../components/player/LanguageSelector';
import {
  SoundPlayerKey,
  SoundPlayerTestId,
} from '../../../components/player/__mocks__/SoundPlayer';
import { act } from 'react';

jest.mock('../../../components/player/LanguageSelector');
jest.mock('../../../components/player/SoundPlayer');
describe('PlayerPanel', () => {
  ComponentTestHelper.prepare();

  const renderComponent = () => {
    const fakeId = getStringField('id');
    const testId = getStringField('testId');
    const testIdStr = `playerPanel-${testId}`;
    const fakeClass = getStringField('fakeClass');
    render(<PlayerPanel id={fakeId} className={fakeClass} testId={testId} />);

    const wrapper = screen.getByTestId(testIdStr);
    expect(wrapper).toHaveClass(fakeClass);

    expect(screen.getByTestId(LanguageSelectorTestId)).toBeInTheDocument();
    const calledLangSelectorParams =
      ComponentTestHelper.get(LanguageSelectorKey) || [];
    expect(ComponentTestHelper.get(LanguageSelectorKey)).toEqual([
      {
        label: 'Select a language to play:',
        onChange: expect.any(Function),
        value: {
          data: languages[0],
          label: languages[0].name,
          value: languages[0].soundFile,
        },
      },
    ]);
    expect(screen.queryByTestId(SoundPlayerTestId)).not.toBeInTheDocument();
    expect(ComponentTestHelper.get(SoundPlayerKey)).toEqual(null);

    const playBtn = within(wrapper).getByTestId(`${testIdStr}-play-button`);

    return {
      wrapper,
      fakeId,
      testIdStr,
      calledLangSelectorParams,
      playBtn,
    };
  };

  test('', () => {
    const { playBtn, fakeId } = renderComponent();
    act(() => {
      fireEvent.click(playBtn);
    });

    expect(
      screen.queryByTestId(LanguageSelectorTestId),
    ).not.toBeInTheDocument();

    expect(screen.getByTestId(SoundPlayerTestId)).toBeInTheDocument();
    const params = ComponentTestHelper.get(SoundPlayerKey) || [];
    expect(params).toEqual([
      {
        companyId: fakeId,
        soundFile: languages[0].soundFile,
        onStop: expect.any(Function),
      },
    ]);

    act(() => {
      params[0].onStop();
    });

    expect(screen.queryByTestId(SoundPlayerTestId)).not.toBeInTheDocument();
    expect(screen.getByTestId(LanguageSelectorTestId)).toBeInTheDocument();
  });
});
