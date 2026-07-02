import { ComboBox, Item } from '@adobe/react-spectrum';
import React from 'react';
import { Controller } from 'react-hook-form';
import ValidationWrapper from './validationWrapper';

export default function ({
  name: componentName,
  onChange: componentOnChange,
  onBlur: componentOnBlur,
  ...rest
}) {
  return (
    <Controller
      name={componentName}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <ValidationWrapper>
          <ComboBox
            name={name}
            inputValue={value}
            selectedKey={value}
            onBlur={(e) => {
              onBlur(e);
              if (componentOnBlur) {
                componentOnBlur(e);
              }
            }}
            onSelectionChange={(e) => {
              onChange(e);
              if (componentOnChange) {
                componentOnChange(e);
              }
            }}
            ref={ref}
            {...rest}
          >
            {(item) => <Item key={item.id}>{item.name}</Item>}
          </ComboBox>
        </ValidationWrapper>
      )}
      {...rest}
    />
  );
}
