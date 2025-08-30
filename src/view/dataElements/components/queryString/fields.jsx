import {
  Content,
  ContextualHelp,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Flex,
  Heading,
  Text,
  TextField
} from '@adobe/react-spectrum';
import React from 'react';
import WrappedTextField from '../../../components/wrappedTextField';

export default () => (
  <Flex direction="column" gap="size-65">
    <Disclosure defaultExpanded={ true } isQuiet={ true }>
      <DisclosureTitle>General</DisclosureTitle>
      <DisclosurePanel>
        <WrappedTextField
          name="objectIDParamName"
          component={ TextField }
          width="size-4600"
          label="Object ID Param Name"
          isRequired
          necessityIndicator="label"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Object ID Param Name</Heading>
              <Content>
                <Text>
                  Enter the query param name that contains the Object ID.
                </Text>
              </Content>
            </ContextualHelp>
          }
        />

        <WrappedTextField
          name="indexNameParamName"
          component={ TextField }
          width="size-4600"
          label="Index Name Param Name"
          necessityIndicator="label"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Index Name Param Name</Heading>
              <Content>
                <Text>
                  Enter the query param name that contains the Index Name.
                </Text>
              </Content>
            </ContextualHelp>
          }
        />
        <WrappedTextField
          name="queryIDParamName"
          component={ TextField }
          width="size-4600"
          label="Query ID Param Name"
          necessityIndicator="label"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Query ID Param Name</Heading>
              <Content>
                <Text>
                  Enter the query param name that contains the Query ID.
                </Text>
              </Content>
            </ContextualHelp>
          }
        />

        <WrappedTextField
          name="positionParamName"
          component={ TextField }
          width="size-4600"
          label="Position Param Name"
          necessityIndicator="label"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Position Param Name</Heading>
              <Content>
                <Text>
                  Enter the query param name that contains the Position.
                </Text>
              </Content>
            </ContextualHelp>
          }
        />
      </DisclosurePanel>
    </Disclosure>
  </Flex>
);
