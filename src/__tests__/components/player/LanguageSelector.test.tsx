import ComponentTestHelper from '../../helpers/ComponentTestHelper';
import { render, screen } from '@testing-library/react';
import LanguageSelector, {
  convertToOption,
  languages,
} from '../../../components/player/LanguageSelector';
import { getStringField } from '../../helpers/ModelFaker';

describe('LanguageSelector', () => {
  ComponentTestHelper.prepare();

  test.each(languages)('%j', async (lang) => {
    const onChange = jest.fn();
    const fakeValue = {
      value: getStringField('fakeValue-value'),
      label: getStringField('fakeValue-label'),
    };
    const testId = getStringField('testId');
    render(
      <LanguageSelector
        onChange={onChange}
        value={fakeValue}
        testId={testId}
      />,
    );

    const selector = screen.getByTestId(testId);
    screen.debug(selector);
    await ComponentTestHelper.selectFromSelector({
      selector,
      targetLabelText: lang.name,
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(convertToOption(lang));
  });
});
