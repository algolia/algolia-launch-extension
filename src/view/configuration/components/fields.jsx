import React from 'react';
import { TextField, Flex, Checkbox } from '@adobe/react-spectrum';
import WrappedTextField from '../../components/wrappedTextField';
import WrappedCheckboxField from '../../components/wrappedCheckboxField';

export default () => (
  <Flex direction="column" gap="size-65">
    <WrappedTextField
      name="appId"
      component={TextField}
      width="size-4600"
      label="Application ID"
      isRequired
      necessityIndicator="label"
    />
    <WrappedTextField
      name="apiKey"
      component={TextField}
      width="size-4600"
      label="Search API Key"
      isRequired
      necessityIndicator="label"
    />
    <WrappedTextField
      name="indexName"
      component={TextField}
      width="size-4600"
      label="Index Name"
      isRequired
      necessityIndicator="label"
    />
    <WrappedCheckboxField
      name="useUserTokenCookie"
      component={Checkbox}
      width="size-4600"
      label="Use User Token Cookie"
      necessityIndicator="label"
      defaultValue={ true }
    />
    <WrappedTextField
      name="version"
      component={TextField}
      width="size-4600"
      label="Insight Library Version"
      necessityIndicator="label"
      defaultValue="2.2.3"
    />
    <WrappedTextField
      name="userHasOptedOutDataElement"
      component={TextField}
      width="size-4600"
      label="User Opt Out Data Element"
      necessityIndicator="label"
      supportDataElement
    />
  </Flex>
);