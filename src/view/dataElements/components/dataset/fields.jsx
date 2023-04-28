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
              Enter the HTML Element Name and/or CSS Class Name that has the dataset attributes (<code>data-insights-object-id</code>, <code>data-insights-query-id</code> (optional), <code>data-insights-position</code> (optional)) on the HTML Element.
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
              Enter the HTML Element Name and/or CSS Class Name that has the dataset attributes (<code>data-indexname</code>) on the HTML Element.
            </Text>
          </Content>
        </ContextualHelp>
      }
    />
  </Flex>
);
