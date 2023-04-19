import React from 'react';
import { TextField, Flex, Checkbox, ContextualHelp, Heading, Content, Text } from "@adobe/react-spectrum";
import WrappedTextField from '../../../components/wrappedTextField';

export default () => (
  <Flex direction="column" gap="size-65">
    <WrappedTextField
      name="hitQuerySelector"
      component={TextField}
      width="size-4600"
      label="Hit Element Div/Class Name"
      isRequired
      necessityIndicator="label"
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>Hit Element Query Selector</Heading>
          <Content>
            <Text>
              Set the query selector that contains the query id, object id, and/or position.
            </Text>
          </Content>
        </ContextualHelp>
      }
    />

    <WrappedTextField
      name="indexNameQuerySelector"
      component={TextField}
      width="size-4600"
      label="Index Name Element Div/Class Name"
      isRequired
      necessityIndicator="label"
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>Index Element Query Selector</Heading>
          <Content>
            <Text>
              Set the query selector that contains the index name.
            </Text>
          </Content>
        </ContextualHelp>
      }
    />
  </Flex>
);
