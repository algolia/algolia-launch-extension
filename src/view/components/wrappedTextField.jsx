import { ActionButton } from '@adobe/react-spectrum';
import Data from '@spectrum-icons/workflow/Data';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ValidationWrapper from './validationWrapper';

const addDataElementToken = (value, dataElementToken) =>
  `${value || ''}${dataElementToken}`;

const openDataElementSelector = (
  tokenize,
  name,
  { getValues, setValue }
) => () => {
  // Whenever we're dealing with a data element token, we add it to whatever the existing value
  // is. If we're not dealing with a token, we replace the value entirely. This is just due
  // to how we want the UX to flow.
  window.extensionBridge
    .openDataElementSelector({
      tokenize
    })
    .then((dataElement) => {
      const newValue = tokenize
        ? addDataElementToken(getValues(name), dataElement)
        : dataElement;

      setValue(name, newValue, { shouldValidate: true, shouldDirty: true });
    });
};

export default ({
  name: componentName,
  component: Component,
  onChange: componentOnChange,
  onBlur: componentOnBlur,
  supportDataElement,
  defaultValue = '',
  ...rest
}) => {
  const methods = useFormContext();
  return (
    <Controller
      name={ componentName }
      defaultValue={ defaultValue }
      render={({
                 field: { onChange, onBlur, value, name, ref },
                 fieldState: { invalid, isTouched, isDirty, error },
                 formState,
               }) => (
        <ValidationWrapper>
          <Component
            name={ name }
            value={ value }
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
            autoComplete="off"
            { ...rest }
          />
          { supportDataElement ? (
            <ActionButton
              alignSelf="flex-end"
              marginStart="size-65"
              marginBottom="size-225"
              aria-label="Icon only"
              onPress={ openDataElementSelector(
                supportDataElement,
                name,
                methods
              ) }
            >
              <Data />
            </ActionButton>
          ) : null }
        </ValidationWrapper>
      )}
      {...rest}
    />
  );
};
