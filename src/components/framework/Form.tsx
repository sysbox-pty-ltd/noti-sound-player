import {
  default as Origin,
  FieldProps as OriginFieldProps,
  Label as OriginLabel,
  Field as OriginField,
  HelperMessage as OriginHelperMessage,
  FormFooter as OriginFormFooter,
  ErrorMessage as OriginErrorMessage,
} from '@atlaskit/form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldProps = OriginFieldProps<any, any>;

export const Label = OriginLabel;
export const Field = OriginField;
export const HelperMessage = OriginHelperMessage;
export const FormFooter = OriginFormFooter;
export const ErrorMessage = OriginErrorMessage;

const Form = Origin;

export default Form;
