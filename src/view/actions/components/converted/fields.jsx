import {
  Accordion,
  Checkbox,
  Content,
  ContextualHelp,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Heading,
  Text,
  TextField
} from '@adobe/react-spectrum';
import React from 'react';
import WrappedCheckboxField from '../../../components/wrappedCheckboxField';
import WrappedTextField from '../../../components/wrappedTextField';

export default function () {
  return (
    <Accordion defaultExpandedKeys={['general']}>
      <Disclosure id="general">
        <DisclosureTitle>General</DisclosureTitle>
        <DisclosurePanel>
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
                    Enter the Event Name that can be used to further refine this{' '}
                    <b>convert</b> event
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
                    Select a Data Element that will retrieve the event details (
                    <code>indexName</code>, <code>objectIDs</code>,{' '}
                    <code>queryID</code> (optional), <code>recordID</code>{' '}
                    (optional)). <code>recordID</code> is used as a localStorage
                    lookup key to remove stored event data; it is not sent to
                    Algolia. If the Data Element contains <code>queryID</code>,
                    the event will be classed as <b>Converted after Search</b>{' '}
                    otherwise it will be considered a <b>Converted</b> event
                    class. If Index Name is not available from the Data Element,
                    then the default Index Name will be used when sending
                    events.
                  </Text>
                </Content>
              </ContextualHelp>
            }
          />
          <WrappedCheckboxField
            name="disableRemoveEventFromStore"
            component={Checkbox}
            width="size-4600"
            label="Disable Removal of Event Data"
            defaultValue={false}
            contextualHelp={
              <ContextualHelp variant="info">
                <Heading>Disable Event Data Removal</Heading>
                <Content>
                  <Text>
                    Check this box if you want to disable removing of the event
                    data from storage. By disabling, the data can be reused for
                    other conversion events. The default value is <b>false</b>.
                  </Text>
                </Content>
              </ContextualHelp>
            }
          />
        </DisclosurePanel>
      </Disclosure>
    </Accordion>
  );
}
