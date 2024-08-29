import React, { CSSProperties, useState } from 'react';
import styled from 'styled-components';
import Tokens from './Tokens';
import MathHelper from '../../helpers/MathHelper';
import { ErrorMessage, HelperMessage, Label } from './Form';

export type iFormFieldChildProps<T> = T & {
  className?: string;
  testId?: string;
  id: string;
};
export type iFormField<Type> = Type & {
  render: (props: iFormFieldChildProps<Type>) => React.ReactNode;
  label?: string;
  style?: CSSProperties;
  errorMsg?: React.ReactNode;
  helperMsg?: React.ReactNode;
  isRequired?: boolean;
  testId?: string;
  className?: string;
};

const Wrapper = styled.div`
  margin-block-start: ${Tokens('space.100', '8px')};
  label {
    margin-block-end: ${Tokens('space.0', '0px')};
    .RequiredAsterisk {
      color: ${Tokens('color.text.danger')};
      font-family: ${Tokens('font.body.small')};
      -webkit-padding-start: ${Tokens('space.050', '2px')};
      padding-inline-start: ${Tokens('space.050', '2px')};
    }
  }
`;
const FormField = <T,>({
  render,
  label,
  style,
  errorMsg,
  helperMsg,
  isRequired,
  testId,
  className,
  ...props
}: iFormField<T>) => {
  const [htmlId] = useState(
    `textField-${Math.ceil(MathHelper.mul(Math.random(), 10000000))}`,
  );
  const getLabel = () => {
    if (!label) {
      return null;
    }

    return (
      <Label htmlFor={htmlId} testId={`${testId}-label`}>
        {label}
        {isRequired && (
          <span
            className={'RequiredAsterisk'}
            data-testid={`${testId}-label-required`}
          >
            *
          </span>
        )}
      </Label>
    );
  };

  const getErrorMsg = () => {
    if (!errorMsg) {
      return null;
    }

    if (Array.isArray(errorMsg)) {
      return (
        <ErrorMessage testId={`${testId}-errorMsg`}>
          {errorMsg.map((msg, index) => (
            <span key={index}>{msg}</span>
          ))}
        </ErrorMessage>
      );
    }

    return (
      <ErrorMessage testId={`${testId}-errorMsg`}>{errorMsg}</ErrorMessage>
    );
  };

  const getHelperMsg = () => {
    if (!helperMsg) {
      return null;
    }

    return (
      <HelperMessage testId={`${testId}-helperMsg`}>{helperMsg}</HelperMessage>
    );
  };

  return (
    <Wrapper
      style={style}
      data-testid={testId}
      className={`form-field-wrapper ${className || ''}`}
    >
      {getLabel()}
      {render({ ...(props as T), className, testId, id: htmlId })}
      {getHelperMsg()}
      {getErrorMsg()}
    </Wrapper>
  );
};

export default FormField;
