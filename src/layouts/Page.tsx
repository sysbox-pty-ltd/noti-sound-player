import React from 'react';
import {
  Content,
  Main,
  PageLayout,
  LeftSidebar,
  RightSidebar,
  LeftSidebarProps,
  RightSidebarProps,
} from '../components/framework/PageLayout';
import styled from 'styled-components';
import Tokens from '../components/framework/Tokens';

const PageWrapper = styled.div`
  height: 100%;
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: ${Tokens('space.200')};
    padding-right: ${Tokens('space.200')};
  }
`;

export type iPage = {
  children: React.ReactNode;
  leftSideBar?: React.ReactNode;
  rightSideBar?: React.ReactNode;
  leftSideBarProps?: Omit<LeftSidebarProps, 'children'>;
  rightSideBarProps?: Omit<RightSidebarProps, 'children'>;
};
const Page = ({
  children,
  leftSideBar,
  leftSideBarProps,
  rightSideBar,
  rightSideBarProps,
}: iPage) => {
  const getLeftSideBar = () => {
    if (!leftSideBar) {
      return null;
    }

    return (
      <LeftSidebar
        id={'page-left-menu'}
        {...leftSideBarProps}
        testId={'left-side-bar'}
      >
        {leftSideBar}
      </LeftSidebar>
    );
  };

  const getRightSideBar = () => {
    if (!rightSideBar) {
      return null;
    }

    return (
      <RightSidebar {...rightSideBarProps} testId={'right-side-bar'}>
        {rightSideBar}
      </RightSidebar>
    );
  };

  return (
    <PageWrapper data-testid="page-wrapper">
      <PageLayout testId={'page-layout'}>
        <Content testId="content">
          {getLeftSideBar()}
          <Main testId={'main'}>{children}</Main>
          {getRightSideBar()}
        </Content>
      </PageLayout>
    </PageWrapper>
  );
};

export default Page;
