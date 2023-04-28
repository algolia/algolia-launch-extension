import React from 'react';
import { TextField, Flex, ContextualHelp, Heading, Content, Text } from "@adobe/react-spectrum";
import WrappedTextField from '../../../components/wrappedTextField';

export default () => (
  <Flex direction="column" gap="size-65">
    <WrappedTextField
      name="eventName"
      component={TextField}
      width="size-4600"
      label="Event Name"
      isRequired
      necessityIndicator="label"
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>Event Name</Heading>
          <Content>
            <Text>
              Enter the Event Name that can be used to further refine this <b>view</b> event
            </Text>
          </Content>
        </ContextualHelp>
      }
    />

    <WrappedTextField
      name="eventDetailsDataElement"
      component={TextField}
      width="size-4600"
      label="Event Details Data Element"
      isRequired
      necessityIndicator="label"
      supportDataElement
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>Event Details</Heading>
          <Content>
            <Text>
              Select a Data Element that will retrieve the event details (<code>indexName</code>, <code>objectId</code>).
              If Index Name is not available from the Data Element, then the default Index Name will
              be used when sending events.
            </Text>
          </Content>
        </ContextualHelp>
      }
    />

    <WrappedTextField
      name="userTokenDataElement"
      component={TextField}
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
  </Flex>
);
