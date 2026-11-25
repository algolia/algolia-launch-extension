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

  // Support nested paths used by field arrays, e.g. "mappings.0.selector"
  // or "mappings[0].selector".
  const parts = path
    .replace(/\[(\w+)\]/g, '.$1')
    .split('.')
    .filter(Boolean);
  let current = obj;
  for (let i = 0; i < parts.length; i += 1) {
    if (current == null || typeof current !== 'object') {
      return undefined;
    }
    current = current[parts[i]];
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
