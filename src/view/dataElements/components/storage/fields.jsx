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
                  Override the default of using the page URL as the record ID.
                  The record ID is a localStorage lookup key for this
                  product/page. It is not sent to Algolia.
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
                <Content>
                  Get the price for this item. Updates stored{' '}
                  <code>objectData</code>. Storage always returns{' '}
                  <code>objectData</code>; with no commerce values it is a
                  single empty object (<code>{'[{}]'}</code>).
                </Content>
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
