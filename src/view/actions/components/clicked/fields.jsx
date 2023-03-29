import React from 'react';
import { TextField, Flex } from '@adobe/react-spectrum';
import WrappedTextField from '../../../components/wrappedTextField';

export default () => (
  <Flex direction="column" gap="size-65">
    <WrappedTextField
      name="itemDataElement"
      component={TextField}
      width="size-4600"
      label="DataSet Data Element"
      isRequired
      necessityIndicator="label"
      supportDataElement
    />

    <WrappedTextField
      name="userTokenDataElement"
      component={TextField}
      width="size-4600"
      label="User Token Data Element"
      isRequired
      necessityIndicator="label"
      supportDataElement
    />

    <WrappedTextField
      name="indexDataElement"
      component={TextField}
      width="size-4600"
      label="Index Name Data Element"
      necessityIndicator="label"
      supportDataElement
    />

    <WrappedTextField
      name="eventName"
      component={TextField}
      width="size-4600"
      label="Event Name"
      isRequired
      necessityIndicator="label"
    />
  </Flex>
);
