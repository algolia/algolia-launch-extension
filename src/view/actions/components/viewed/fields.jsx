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
              Enter any event name that identifies this event.
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
              Set the Data Element that will return Event Details
              (objectId).
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
