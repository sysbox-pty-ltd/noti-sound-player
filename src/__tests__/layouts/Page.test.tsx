import ComponentTestHelper from '../helpers/ComponentTestHelper';
import { render, screen, within } from '@testing-library/react';
import Page, { iPage } from '../../layouts/Page';
import React from 'react';
import { getStringField } from '../helpers/ModelFaker';

describe('ProtectedPage', () => {
  ComponentTestHelper.prepare();

  const renderAndTest = (props: iPage) => {
    render(<Page {...props} />);

    const pageWrapper = screen.getByTestId('page-wrapper');
    const pageLayout = within(pageWrapper).getByTestId('page-layout');

    const content = within(pageWrapper).getByTestId('content');

    const main = within(content).getByTestId('main');

    return {
      pageWrapper,
      pageLayout,
      content,
      main,
    };
  };

  test('render without leftSideBar nor rightSideBar', () => {
    const { children, childrenTestId } = ComponentTestHelper.getChildren();
    const { main } = renderAndTest({ children });
    expect(within(main).getByTestId(childrenTestId)).toBeInTheDocument();
  });

  test('render with leftSideBar', () => {
    const { children, childrenTestId } = ComponentTestHelper.getChildren();
    const { children: sideBar, childrenTestId: sideBarTestId } =
      ComponentTestHelper.getChildren();
    const { content, main } = renderAndTest({ leftSideBar: sideBar, children });

    expect(within(main).getByTestId(childrenTestId)).toBeInTheDocument();
    const leftSideBar = within(content).getByTestId('left-side-bar');
    expect(within(leftSideBar).getByTestId(sideBarTestId)).toBeInTheDocument();
  });

  test('render with rightSideBar', () => {
    const { children, childrenTestId } = ComponentTestHelper.getChildren();
    const { children: sideBar, childrenTestId: sideBarTestId } =
      ComponentTestHelper.getChildren();
    const { content, main } = renderAndTest({
      rightSideBar: sideBar,
      children,
    });

    expect(within(main).getByTestId(childrenTestId)).toBeInTheDocument();
    const rightSideBar = within(content).getByTestId('right-side-bar');
    expect(within(rightSideBar).getByTestId(sideBarTestId)).toBeInTheDocument();
  });
});
