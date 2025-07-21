import React from 'react';
import {
  TextField,
  Flex,
  ContextualHelp,
  Heading,
  Content,
  Text,
  Disclosure,
  DisclosureTitle, DisclosurePanel, Accordion
} from '@adobe/react-spectrum';
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
              Enter the Event Name that can be used to further refine this <b>click</b> event
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
              Select a Data Element that will retrieve the event details
              (<code>indexName</code>, <code>objectId</code>, <code>queryId</code> (optional), <code>position</code> (optional)).
              If the Data Element contains <code>queryId</code> and <code>position</code>, the event
              will be classed as <b>Clicked after Search</b> otherwise it will be
              considered a <b>Clicked</b> event class. If Index Name is not available
              from the Data Element, then the default Index Name will be used
              when sending events.
            </Text>
          </Content>
        </ContextualHelp>
      }
    />
    <Accordion>
      <Disclosure id="overrides">
        <DisclosureTitle>Overrides</DisclosureTitle>
        <DisclosurePanel>
          <WrappedTextField
            name="recordIdDataElement"
            component={ TextField }
            width="size-4600"
            label="Record ID Data Element"
            necessityIndicator="label"
            supportDataElement
            contextualHelp={
              <ContextualHelp>
                <Heading>Record ID</Heading>
                <Content>
                  Override default approach to create an id for payload look up in local storage.
                </Content>
              </ContextualHelp>
            }
          />
        </DisclosurePanel>
      </Disclosure>
    </Accordion>
  </Flex>
);
