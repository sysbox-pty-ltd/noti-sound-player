import {
  default as Origin,
  IconButton as OriginIconButton,
  LinkIconButton as OriginLinkIconButton,
  LinkButton as OriginLinkButton,
  ButtonProps as OriginButtonProps,
  IconButtonProps as OriginIconButtonProps,
} from '@atlaskit/button/new';

export type ButtonProps = OriginButtonProps;
export type IconButtonProps = OriginIconButtonProps;

export const IconButton = OriginIconButton;
export const LinkIconButton = OriginLinkIconButton;
export const LinkButton = OriginLinkButton;

export default Origin;
