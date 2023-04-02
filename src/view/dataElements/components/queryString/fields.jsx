import React from 'react';
import { TextField, Flex, Checkbox } from '@adobe/react-spectrum';
import WrappedTextField from '../../../components/wrappedTextField';

export default () => (
  <Flex direction="column" gap="size-65">
    <WrappedTextField
      name="queryIDParamName"
      component={TextField}
      width="size-4600"
      label="Query ID Param Name"
      necessityIndicator="label"
    />

    <WrappedTextField
      name="objectIDParamName"
      component={TextField}
      width="size-4600"
      label="Object ID Param Name"
      isRequired
      necessityIndicator="label"
    />

    <WrappedTextField
      name="positionParamName"
      component={TextField}
      width="size-4600"
      label="Position Param Name"
      necessityIndicator="label"
    />
  </Flex>
);
