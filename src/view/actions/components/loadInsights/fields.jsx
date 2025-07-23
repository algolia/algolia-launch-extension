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
          name="version"
          component={ TextField }
          width="size-4600"
          label="Insight Library Version"
          necessityIndicator="label"
          defaultValue="2.13.0"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Insight Library Version</Heading>
              <Content>
                <Text>
                  Enter the Algolia Insight version. The default value is <b>2.13.0</b>.
                </Text>
              </Content>
            </ContextualHelp>
          }
        />
        <WrappedTextField
          name="userHasOptedOutDataElement"
          component={ TextField }
          width="size-4600"
          label="User Opt Out Data Element"
          necessityIndicator="label"
          supportDataElement
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>User Opt Out Data Element</Heading>
              <Content>
                <Text>
                  Select a Data Element that will retrieve the user's decision on tracking.
                </Text>
              </Content>
            </ContextualHelp>
          }
        />
        <WrappedCheckboxField
          name="useUserTokenCookie"
          component={ Checkbox }
          width="size-4600"
          label="Use User Token Cookie"
          necessityIndicator="label"
          defaultValue={ true }
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Use User Token Cookie</Heading>
              <Content>
                <Text>
                  Check this box if you want Algolia to generate a User Token cookie. The default value is <b>false</b>.
                </Text>
              </Content>
            </ContextualHelp>
          }
        />
      </DisclosurePanel>
    </Disclosure>
  </Flex>
);
