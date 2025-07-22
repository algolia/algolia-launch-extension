import { ComboBox, Item } from '@adobe/react-spectrum';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ValidationWrapper from './validationWrapper';

export default ({
                  name: componentName,
                  onChange: componentOnChange,
                  onBlur: componentOnBlur,
                  ...rest
                }) => {
  const methods = useFormContext();
  return (
    <Controller
      name={ componentName }
      render={({
                 field: { onChange, onBlur, value, name, ref },
                 fieldState: { invalid, isTouched, isDirty, error },
                 formState,
               }) => (
                <ValidationWrapper>
                  <ComboBox
                    name={ name }
                    value={ value }
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
                    inputRef={ ref }
                    { ...rest }
                  >
                    { item => <Item key={ item.id }>{ item.name }</Item> }
                  </ComboBox>
                  <></>
                </ValidationWrapper>
      )}
      {...rest}
    />
  );
};
