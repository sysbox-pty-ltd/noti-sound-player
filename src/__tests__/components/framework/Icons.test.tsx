import ComponentTestHelper from '../../helpers/ComponentTestHelper';
import Icons from '../../../components/framework/Icons';
import { render } from '@testing-library/react';

describe('Icons', () => {
  ComponentTestHelper.prepare();

  describe('render', () => {
    test.each(Object.keys(Icons).map((icon) => [icon]))('%s', (icon) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const Component = Icons[icon];
      const { container } = render(<Component label={icon} />);

      expect(container).toMatchSnapshot();
    });
  });
});
