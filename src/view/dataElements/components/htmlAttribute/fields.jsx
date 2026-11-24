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
            name="selector"
            component={TextField}
            width="size-4600"
            label="Element Selector"
            isRequired
            necessityIndicator="label"
            contextualHelp={
              <ContextualHelp variant="info">
                <Heading>Element Selector</Heading>
                <Content>
                  <Text>
                    Enter the CSS selector of the element to read. The first
                    matching element is used. Defaults to html.
                  </Text>
                </Content>
              </ContextualHelp>
            }
          />

          <WrappedTextField
            name="attributeName"
            component={TextField}
            width="size-4600"
            label="Attribute / Property Name"
            isRequired
            necessityIndicator="label"
            contextualHelp={
              <ContextualHelp variant="info">
                <Heading>Attribute / Property Name</Heading>
                <Content>
                  <Text>
                    Enter the attribute or property to read from the element
                    (for example: lang, data-locale, title). Defaults to lang.
                  </Text>
                </Content>
              </ContextualHelp>
            }
          />

          <WrappedTextField
            name="outputKey"
            component={TextField}
            width="size-4600"
            label="Output Key"
            necessityIndicator="label"
            contextualHelp={
              <ContextualHelp variant="info">
                <Heading>Output Key</Heading>
                <Content>
                  <Text>
                    Optional. The key used in the returned JSON object (for
                    example: Accept-Language). Defaults to the attribute name.
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
