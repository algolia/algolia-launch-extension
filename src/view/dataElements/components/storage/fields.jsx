import {
  Content,
  ContextualHelp,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Flex,
  Heading,
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
