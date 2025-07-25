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
          name="hitQuerySelector"
          component={ TextField }
          width="size-4600"
          label="Hit Element Div/Class Name"
          isRequired
          necessityIndicator="label"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Hit Element Query Selector</Heading>
              <Content>
                <Text>
                  Enter the HTML Element Name and/or CSS Class Name that has the dataset attributes
                  (<code>data-insights-object-id</code>, <code>data-insights-query-id</code> (optional), <code>data-insights-position</code> (optional))
                  on the HTML Element.
                </Text>
              </Content>
            </ContextualHelp>
          }
        />

        <WrappedTextField
          name="indexNameQuerySelector"
          component={ TextField }
          width="size-4600"
          label="Index Name Element Div/Class Name"
          isRequired
          necessityIndicator="label"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Index Element Query Selector</Heading>
              <Content>
                <Text>
                  Enter the HTML Element Name and/or CSS Class Name that has the dataset attributes
                  (<code>data-indexname</code>) on the HTML Element.
                </Text>
              </Content>
            </ContextualHelp>
          }
        />
      </DisclosurePanel>
    </Disclosure>
    <Disclosure isQuiet={ true }>
      <DisclosureTitle>Overrides</DisclosureTitle>
      <DisclosurePanel>

        <WrappedTextField
          name="queryIDDataElement"
          component={ TextField }
          width="size-4600"
          label="Query ID Data Element"
          necessityIndicator="label"
          supportDataElement
          contextualHelp={
            <ContextualHelp>
              <Heading>Query ID</Heading>
              <Content>
                Override default approach to return Query ID.
              </Content>
            </ContextualHelp>
          }
        />
        <WrappedTextField
          name="objectIDsDataElement"
          component={ TextField }
          width="size-4600"
          label="Object IDs Data Element"
          necessityIndicator="label"
          supportDataElement
          contextualHelp={
            <ContextualHelp>
              <Heading>Object IDs</Heading>
              <Content>
                Override default approach to return ObjectIDs.
              </Content>
            </ContextualHelp>
          }
        />

        <WrappedTextField
          name="positionsDataElement"
          component={ TextField }
          width="size-4600"
          label="Positions Data Element"
          necessityIndicator="label"
          supportDataElement
          contextualHelp={
            <ContextualHelp>
              <Heading>Positions</Heading>
              <Content>
                Override default approach to return Positions.
              </Content>
            </ContextualHelp>
          }
        />

        <WrappedTextField
          name="indexNameDataElement"
          component={ TextField }
          width="size-4600"
          label="Index Name Data Element"
          necessityIndicator="label"
          supportDataElement
          contextualHelp={
            <ContextualHelp>
              <Heading>Index Name</Heading>
              <Content>
                Override default approach to return Index Name.
              </Content>
            </ContextualHelp>
          }
        />
      </DisclosurePanel>
    </Disclosure>
  </Flex>
);
