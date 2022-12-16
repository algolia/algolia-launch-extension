import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Item } from '@adobe/react-spectrum'
import ValidationWrapper from './validationWrapper';

export default ({
                  name: componentName,
                  component: Component,
                  onChange: componentOnChange,
                  onBlur: componentOnBlur,
                  defaultValue = '',
                  ...rest
                }) => {
  const methods = useFormContext();
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
            selectedKey={ value }
            onBlur={ (e) => {
              onBlur(e);
              if (componentOnBlur) {
                componentOnBlur(e);
              }
            } }
            onSelectionChange={
              (e) => {
                onChange(e);
                if (componentOnChange) {
                  componentOnChange(e);
                }
              }
            }
            name={ name }
            inputRef={ ref }
            { ...rest }
          >
            { (item) => <Item key={ item.id }>{item.name}</Item> }
          </Component>
          <></>
        </ValidationWrapper>
      )}
      {...rest}
    />
  );
};
