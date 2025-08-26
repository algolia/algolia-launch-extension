import {
  Content,
  ContextualHelp,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Flex,
  Heading, Text,
  TextField
} from '@adobe/react-spectrum';
import React from 'react';
import WrappedTextField from '../../../components/wrappedTextField';

export default () => (
  <Flex direction="column" gap="size-65">

    <Disclosure defaultExpanded={ true } isQuiet={ true }>
      <DisclosureTitle>Overrides</DisclosureTitle>
      <DisclosurePanel>
        <WrappedTextField
          name="objectIDDataElement"
          component={ TextField }
          width="size-4600"
          label="Object IDs Data Element"
          necessityIndicator="label"
          supportDataElement
          contextualHelp={
            <ContextualHelp>
              <Heading>Object IDs</Heading>
              <Content>
                Override default approach to return ObjectID that is used as a key to get the data from browser storage.
              </Content>
            </ContextualHelp>
          }
        />
        <WrappedTextField
          name="priceDataElement"
          component={ TextField }
          width="size-4600"
          label="Price Data Element"
          necessityIndicator="label"
          supportDataElement
          contextualHelp={
            <ContextualHelp>
              <Heading>Price</Heading>
              <Content>
                Get the price for this item.
              </Content>
            </ContextualHelp>
          }
        />
        <WrappedTextField
          name="quantityDataElement"
          component={ TextField }
          width="size-4600"
          label="Quantity Data Element"
          necessityIndicator="label"
          supportDataElement
          contextualHelp={
            <ContextualHelp>
              <Heading>Quantity</Heading>
              <Content>
                Get the quantity for this item.
              </Content>
            </ContextualHelp>
          }
        />
        <WrappedTextField
          name="discountDataElement"
          component={ TextField }
          width="size-4600"
          label="Discount Data Element"
          necessityIndicator="label"
          supportDataElement
          contextualHelp={
            <ContextualHelp>
              <Heading>Quantity</Heading>
              <Content>
                Get the discount decimal value for this item.
              </Content>
            </ContextualHelp>
          }
        />
        <WrappedTextField
          name="currency"
          component={ TextField }
          width="size-4600"
          label="Currency Code"
          necessityIndicator="label"
          supportDataElement
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Currency Code</Heading>
              <Content>
                <Text>
                  Default currency from configuration will be used.  Override currency if different from configuration.  Use ISO-4217 currency code, such as USD or EUR.
                </Text>
              </Content>
            </ContextualHelp>
          }
        />
      </DisclosurePanel>
    </Disclosure>
  </Flex>
);
