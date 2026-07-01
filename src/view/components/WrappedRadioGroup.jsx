import React from 'react';
import { Controller } from 'react-hook-form';
import ValidationWrapper from './validationWrapper';

export default function ({
  name: componentName,
  component: Component,
  onChange: componentOnChange,
  onBlur: componentOnBlur,
  defaultValue,
  label,
  ...rest
}) {
  return (
    <Controller
      name={componentName}
      value={defaultValue}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <ValidationWrapper>
          <Component
            name={name}
            value={value}
            isSelected={value}
            onBlur={(e) => {
              onBlur(e);
              if (componentOnBlur) {
                componentOnBlur(e);
              }
            }}
            onChange={(e) => {
              onChange(e);
              if (componentOnChange) {
                componentOnChange(e);
              }
            }}
            inputRef={ref}
            label={label}
            defaultValue={defaultValue}
            {...rest}
          >
            {rest.children}
          </Component>
          <></>
        </ValidationWrapper>
      )}
      {...rest}
    />
  );
}
