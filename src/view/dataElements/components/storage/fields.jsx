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
    <Accordion defaultExpandedKeys={['overrides']}>
      <Disclosure id="overrides">
        <DisclosureTitle>Overrides</DisclosureTitle>
        <DisclosurePanel>
          <WrappedTextField
            name="recordIDDataElement"
            component={TextField}
            width="size-4600"
            label="Record ID Data Element"
            necessityIndicator="label"
            supportDataElement
            contextualHelp={
              <ContextualHelp>
                <Heading>Record ID</Heading>
                <Content>
                  Override default approach to use page url as the record id.
                  The record id is used to store and look up data to send to
                  Algolia for this product/page.
                </Content>
              </ContextualHelp>
            }
          />
          <WrappedTextField
            name="priceDataElement"
            component={TextField}
            width="size-4600"
            label="Price Data Element"
            necessityIndicator="label"
            supportDataElement
            contextualHelp={
              <ContextualHelp>
                <Heading>Price</Heading>
                <Content>Get the price for this item.</Content>
              </ContextualHelp>
            }
          />
          <WrappedTextField
            name="quantityDataElement"
            component={TextField}
            width="size-4600"
            label="Quantity Data Element"
            necessityIndicator="label"
            supportDataElement
            contextualHelp={
              <ContextualHelp>
                <Heading>Quantity</Heading>
                <Content>Get the quantity for this item.</Content>
              </ContextualHelp>
            }
          />
          <WrappedTextField
            name="discountDataElement"
            component={TextField}
            width="size-4600"
            label="Discount Data Element"
            necessityIndicator="label"
            supportDataElement
            contextualHelp={
              <ContextualHelp>
                <Heading>Discount</Heading>
                <Content>Get the discount decimal value for this item.</Content>
              </ContextualHelp>
            }
          />
          <WrappedTextField
            name="currency"
            component={TextField}
            width="size-4600"
            label="Currency Code"
            necessityIndicator="label"
            supportDataElement
            contextualHelp={
              <ContextualHelp variant="info">
                <Heading>Currency Code</Heading>
                <Content>
                  <Text>
                    Default currency from configuration will be used. Override
                    currency if different from configuration. Use ISO-4217
                    currency code, such as USD or EUR.
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
