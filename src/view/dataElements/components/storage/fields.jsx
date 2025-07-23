import {
  Content,
  ContextualHelp,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Flex,
  Heading,
  Radio,
  RadioGroup
} from '@adobe/react-spectrum';
import React from 'react';
import WrappedRadioGroup from '../../../components/WrappedRadioGroup';

export default () => (
  <Flex direction="column" gap="size-65">
    <Disclosure defaultExpanded={ true } isQuiet={ true }>
      <DisclosureTitle>General</DisclosureTitle>
      <DisclosurePanel>
        <WrappedRadioGroup
          name="storageStrategy"
          component={ RadioGroup }
          width="size-4600"
          label="Storage Strategy"
          isRequired
          necessityIndicator="label"
          defaultValue="single"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Storage Strategy</Heading>
              <Content>
                <Text>
                  Select the storage type.
                </Text>
              </Content>
            </ContextualHelp>
          }
        >
          <Radio value="localStorage">Local Storage</Radio>
          <Radio value="sessionStorage">Session Storage</Radio>
        </WrappedRadioGroup>
      </DisclosurePanel>
    </Disclosure>
  </Flex>
);
