import React from 'react';
import { TextField, Flex, Checkbox } from '@adobe/react-spectrum';
import WrappedTextField from '../../../components/wrappedTextField';

export default () => (
  <Flex direction="column" gap="size-65">
    <WrappedTextField
      name="querySelector"
      component={TextField}
      width="size-4600"
      label="DataSet Div/Class Name"
      isRequired
      necessityIndicator="label"
    />
  </Flex>
);
