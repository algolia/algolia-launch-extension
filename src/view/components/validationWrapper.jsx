import { Flex } from '@adobe/react-spectrum';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const getError = (obj, path) => {
  if (!obj || !path) {
    return undefined;
  }

  if (obj[path]) {
    return obj[path];
  }

  const parts = path.split('[').map((k) => k.replace(']', ''));
  let current = obj;
  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (current[part]) {
      current = current[part];
    } else {
      return undefined;
    }
  }

  return current;
};

export default function ({ children }) {
  const childArray = React.Children.toArray(children);
  const [firstChild, ...restChildren] = childArray;
  const fieldName = firstChild.props.name;
  const fieldOnChange =
    firstChild.props.onChange || firstChild.props.onSelectionChange;
  const {
    formState: { errors },
    trigger
  } = useFormContext();

  const fieldError = getError(errors, fieldName);
  const errorMessage = fieldError?.message;

  return (
    <Flex direction="row" alignItems="start">
      {React.cloneElement(firstChild, {
        isInvalid: Boolean(fieldError),
        errorMessage,
        onChange: (e) => {
          if (fieldOnChange) fieldOnChange(e);
          trigger(fieldName).catch(() => {});
        }
      })}
      {restChildren}
    </Flex>
  );
}
