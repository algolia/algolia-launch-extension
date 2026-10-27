import {
  Accordion,
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
                    <b>add to cart</b> event
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
                    <code>objectData</code>, <code>price</code>,{' '}
                    <code>quantity</code>, <code>discount</code> (optional),{' '}
                    <code>queryID</code> (optional), <code>currency</code>{' '}
                    (optional)). If the Data Element contains{' '}
                    <code>queryID</code>, the event will be classed as{' '}
                    <b>Added to cart object IDs after search</b> otherwise it
                    will be considered a <b>Added to cart object IDs</b> event
                    class. If Index Name is not available from the Data Element,
                    then the default Index Name will be used when sending
                    events.
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
