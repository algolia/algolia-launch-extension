import React from 'react';
import { TextField, Flex, Checkbox, ContextualHelp, Heading, Content, Text } from "@adobe/react-spectrum";
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
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>Application ID</Heading>
          <Content>
            <Text>
              Enter the Application Id which can be found in the on the Algolia Dashboard in the <a href="https://www.algolia.com/account/api-keys/all" target="_child">API Keys</a> section.
            </Text>
          </Content>
        </ContextualHelp>
      }
    />
    <WrappedTextField
      name="apiKey"
      component={TextField}
      width="size-4600"
      label="Search API Key"
      isRequired
      necessityIndicator="label"
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>Search API Key</Heading>
          <Content>
            <Text>
              Enter Search API Key which can be found in the on the Algolia Dashboard in the <a href="https://www.algolia.com/account/api-keys/all" target="_child">API Keys</a> section.
            </Text>
          </Content>
        </ContextualHelp>
      }
    />
    <WrappedTextField
      name="indexName"
      component={TextField}
      width="size-4600"
      label="Index Name"
      isRequired
      necessityIndicator="label"
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>Index Name</Heading>
          <Content>
            <Text>
              Enter the Index Name that contain the Products or Content.  This Index will be used as a default.
            </Text>
          </Content>
        </ContextualHelp>
      }
    />
    <WrappedCheckboxField
      name="useUserTokenCookie"
      component={Checkbox}
      width="size-4600"
      label="Use User Token Cookie"
      necessityIndicator="label"
      defaultValue={ true }
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>Use User Token Cookie</Heading>
          <Content>
            <Text>
              Check this box if you want Algolia to generate a User Token cookie.  The default value is <b>false</b>.
            </Text>
          </Content>
        </ContextualHelp>
      }
    />
    <WrappedTextField
      name="version"
      component={TextField}
      width="size-4600"
      label="Insight Library Version"
      necessityIndicator="label"
      defaultValue="2.2.3"
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>Insight Library Version</Heading>
          <Content>
            <Text>
              Enter the Algolia Insight version.  The default value is <b>2.2.3</b>.
            </Text>
          </Content>
        </ContextualHelp>
      }
    />
    <WrappedTextField
      name="userHasOptedOutDataElement"
      component={TextField}
      width="size-4600"
      label="User Opt Out Data Element"
      necessityIndicator="label"
      supportDataElement
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>User Opt Out Data Element</Heading>
          <Content>
            <Text>
              Select a Data Element that will retrieve the user's decision on tracking.
            </Text>
          </Content>
        </ContextualHelp>
      }
    />
  </Flex>
);
