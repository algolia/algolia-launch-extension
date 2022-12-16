import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import ValidationWrapper from './validationWrapper';
import Label from '@spectrum-icons/workflow/Label';

export default ({
  name: componentName,
  component: Component,
  onChange: componentOnChange,
  onBlur: componentOnBlur,
  defaultValue,
  label,
  ...rest
}) => {
  return (
    <Controller
      name={ componentName }
      value={ defaultValue }
      render={({
                 field: { onChange, onBlur, value, name, ref },
                 fieldState: { invalid, isTouched, isDirty, error },
                 formState,
               }) => (
        <ValidationWrapper>
          <Component
            name={ name }
            value={ value }
            isSelected={ value }
            onBlur={ (e) => {
              onBlur(e);
              if (componentOnBlur) {
                componentOnBlur(e);
              }
            } }
            onChange={ (e) => {
              onChange(e);
              if (componentOnChange) {
                componentOnChange(e);
              }
            } }
            inputRef={ ref }
            { ...rest }
          >{label}</Component>
         <></>
        </ValidationWrapper>
      )}
      {...rest}
    />
  );
};
