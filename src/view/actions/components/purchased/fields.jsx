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
                  Enter the Event Name that can be used to further refine this <b>purchase</b> event
                </Text>
              </Content>
            </ContextualHelp>
          }
        />
        <WrappedTextField
          name="purchasedItemsDataElement"
          component={ TextField }
          width="size-4600"
          label="Purchased Items Data Element"
          necessityIndicator="label"
          supportDataElement
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Purchased Items</Heading>
              <Content>
                <Text>
                  Select a Data Element that will retrieve purchased item ids.
                  The purchase item ids will be used to look up events in browser storage to
                  be sent to Algolia as a purchase event.
                </Text>
              </Content>
            </ContextualHelp>
          }
        />
      </DisclosurePanel>
    </Disclosure>
  </Flex>
);
