import {
  Content as OriginContent,
  Main as OriginMain,
  PageLayout as Origin,
  TopNavigation as OriginTopNavigation,
  LeftSidebar as OriginLeftSidebar,
  RightSidebar as OriginRightSidebar,
  SlotWidthProps,
} from '@atlaskit/page-layout';
import { LeftSidebarProps as OriginalLeftSidebarProps } from '@atlaskit/page-layout/dist/types/common/types';

export type LeftSidebarProps = OriginalLeftSidebarProps;
export type RightSidebarProps = SlotWidthProps;
export const PageLayout = Origin;
export const Content = OriginContent;
export const Main = OriginMain;
export const TopNavigation = OriginTopNavigation;
export const LeftSidebar = OriginLeftSidebar;
export const RightSidebar = OriginRightSidebar;

export default PageLayout;
