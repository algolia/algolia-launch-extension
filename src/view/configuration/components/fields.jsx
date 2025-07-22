import { Content, ContextualHelp, Flex, Heading, Text, TextField } from '@adobe/react-spectrum';
import React from 'react';
import WrappedPickerField from '../../components/wrappedPickerField';
import WrappedTextField from '../../components/wrappedTextField';

export default () => (
  <Flex direction="column" gap="size-65">
    <WrappedTextField
      name="appId"
      component={ TextField }
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
      component={ TextField }
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
      component={ TextField }
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
    <WrappedTextField
      name="userTokenDataElement"
      component={ TextField }
      width="size-4600"
      label="User Token Data Element"
      isRequired
      necessityIndicator="label"
      supportDataElement
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>User Token</Heading>
          <Content>
            <Text>
              Set the Data Element that will return the User Token.
            </Text>
          </Content>
        </ContextualHelp>
      }
    />
    <WrappedTextField
      name="authenticatedUserTokenDataElement"
      component={ TextField }
      width="size-4600"
      label="Authenticated User Token Data Element"
      necessityIndicator="label"
      supportDataElement
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>Authenticated User Token</Heading>
          <Content>
            <Text>
              Set the Data Element that will return the Authenticated User Token.
            </Text>
          </Content>
        </ContextualHelp>
      }
    />
    <WrappedPickerField
      name="currency"
      width="size-4600"
      label="Currency"
      isRequired
      necessityIndicator="label"
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>Currency</Heading>
          <Content>
            <Text>
              Select the currency
            </Text>
          </Content>
        </ContextualHelp>
      }
      items={[
        { id: 'USD', name: 'USD' },
        { id: 'EUR', name: 'EUR' }
      ]}
    />
  </Flex>
);
