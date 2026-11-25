import {
  Accordion,
  Checkbox,
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
import WrappedCheckboxField from '../../../components/wrappedCheckboxField';
import WrappedTextField from '../../../components/wrappedTextField';

export default function () {
  return (
    <Accordion allowsMultipleExpanded defaultExpandedKeys={['general']}>
      <Disclosure id="general">
        <DisclosureTitle>General</DisclosureTitle>
        <DisclosurePanel>
          <Text>
            Fires when new hits are added to an InstantSearch or Autocomplete
            hit list. Use it together with the <b>Viewed</b> action and the{' '}
            <b>Hits List</b> data element as its Event Details. Hits must have
            the <code>data-insights-object-id</code> attribute. If InstantSearch
            already uses the insights middleware (<code>insights: true</code>),
            it sends its own view events and this event would double-count them.
          </Text>

          <WrappedTextField
            name="listSelector"
            component={TextField}
            width="size-4600"
            label="Hit List Selector"
            isRequired
            necessityIndicator="label"
            contextualHelp={
              <ContextualHelp variant="info">
                <Heading>Hit List Selector</Heading>
                <Content>
                  <Text>
                    CSS selector(s) of the hit list elements to watch. Defaults
                    to <code>.ais-AutocompleteIndexList</code>,{' '}
                    <code>.aa-List</code>, <code>.ais-InfiniteHits-list</code>{' '}
                    and <code>.ais-Hits-list</code>.
                  </Text>
                </Content>
              </ContextualHelp>
            }
          />

          <WrappedTextField
            name="indexNameQuerySelector"
            component={TextField}
            width="size-4600"
            label="Index Name Element Selector"
            isRequired
            necessityIndicator="label"
            contextualHelp={
              <ContextualHelp variant="info">
                <Heading>Index Name Element Selector</Heading>
                <Content>
                  <Text>
                    CSS selector of the closest ancestor of the hit list that
                    has the <code>data-indexname</code> or{' '}
                    <code>data-insights-index</code> attribute. If it is not
                    found, the default Index Name of the extension is used.
                  </Text>
                </Content>
              </ContextualHelp>
            }
          />

          <WrappedTextField
            name="debounceMs"
            component={TextField}
            width="size-4600"
            label="Debounce (ms)"
            isRequired
            necessityIndicator="label"
            contextualHelp={
              <ContextualHelp variant="info">
                <Heading>Debounce</Heading>
                <Content>
                  <Text>
                    Time to wait after the last change in a list before the
                    event fires, so one render results in one event per list.
                  </Text>
                </Content>
              </ContextualHelp>
            }
          />

          <WrappedCheckboxField
            name="dedupe"
            component={Checkbox}
            width="size-4600"
            label="Only report each item once per page view"
            defaultValue={false}
            contextualHelp={
              <ContextualHelp variant="info">
                <Heading>Deduplicate</Heading>
                <Content>
                  <Text>
                    Autocomplete re-renders the same items whenever the panel
                    reopens or the query changes. Enable this to skip objectIDs
                    already reported for the same index during this page view.
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
