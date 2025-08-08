import {
  Checkbox,
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
import WrappedCheckboxField from '../../../components/wrappedCheckboxField';
import WrappedTextField from '../../../components/wrappedTextField';

export default () => (
  <Flex direction="column" gap="size-65">
    <Disclosure defaultExpanded={ true } isQuiet={ true }>
      <DisclosureTitle>General</DisclosureTitle>
      <DisclosurePanel>
        <WrappedTextField
          name="eventName"
          component={ TextField }
          width="size-4600"
          label="Event Name"
          isRequired
          necessityIndicator="label"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Event Name</Heading>
              <Content>
                <Text>
                  Enter the Event Name that can be used to further refine this <b>convert</b> event
                </Text>
              </Content>
            </ContextualHelp>
          }
        />
        <WrappedTextField
          name="eventDetailsDataElement"
          component={ TextField }
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
                  (<code>indexName</code>, <code>objectId</code>, <code>queryId</code> (optional)).
                  If the Data Element contains <code>queryId</code>, the event will be classed as <b>Converted after
                  Search</b> otherwise
                  it will be considered a <b>Converted</b>event class. If Index Name is not available from the Data
                  Element,
                  then the default Index Name will be used when sending events.
                </Text>
              </Content>
            </ContextualHelp>
          }
        />
        <WrappedCheckboxField
          name="disableRemoveEventFromStore"
          component={ Checkbox }
          width="size-4600"
          label="Disable Removal of Event Data"
          necessityIndicator="label"
          defaultValue={ true }
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Disable Event Data Removal</Heading>
              <Content>
                <Text>
                  Check this box if you want to disable removing of the event data from storage. By disabling, the data can be reused for other conversion events. The default value is <b>false</b>.
                </Text>
              </Content>
            </ContextualHelp>
          }
        />
      </DisclosurePanel>
    </Disclosure>
    <Disclosure isQuiet={ true }>
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
  </Flex>
);
