import {
  default as Origin,
  SelectProps,
  AsyncSelect as OriginAsyncSelect,
  type OptionType,
  type OptionsType,
  AsyncSelectProps,
} from '@atlaskit/select';
import FormField from './FormField';

export type iSelect<T, D extends boolean = false> = SelectProps<T, D>;

export type iOption = OptionType;
export type iOptionWithData<T> = iOption & { data: T };
export type iOptions = OptionsType;

const Select = <T, D extends boolean = false>(props: iSelect<T, D>) => {
  return (
    <FormField<iSelect<T, D>>
      {...props}
      render={(fProps) => {
        const { id: inputId, ...rfProps } = fProps;
        return <Origin {...rfProps} inputId={inputId} />;
      }}
    />
  );
};

export type iAsyncSelectProps<T> = AsyncSelectProps<T>;
export const AsyncSelect = <T,>(props: AsyncSelectProps<T>) => {
  return (
    <FormField<iAsyncSelectProps<T>>
      {...props}
      render={(fProps) => {
        const { id: inputId, ...rfProps } = fProps;
        return <OriginAsyncSelect {...rfProps} inputId={inputId} />;
      }}
    />
  );
};

export const convertSameValueToOption = (value: string | number): iOption => {
  return {
    value: value,
    label: `${value}`,
  };
};

export default Select;
