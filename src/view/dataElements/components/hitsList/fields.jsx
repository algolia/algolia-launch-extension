import {
  Accordion,
  Content,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Heading,
  Text
} from '@adobe/react-spectrum';
import React from 'react';

export default function () {
  return (
    <Accordion defaultExpandedKeys={['general']}>
      <Disclosure id="general">
        <DisclosureTitle>General</DisclosureTitle>
        <DisclosurePanel>
          <Content>
            <Heading level={4} marginTop={0}>
              Hits List
            </Heading>
            <Text>
              Returns the event details (<code>indexName</code>,{' '}
              <code>objectIDs</code>, <code>timestamp</code>) of the hits that
              were just rendered. Use it as the Event Details Data Element of
              the <strong>Viewed</strong> action in a rule whose event is{' '}
              <strong>Hits List Changed</strong>. It returns an empty object for
              any other event.
            </Text>
          </Content>
        </DisclosurePanel>
      </Disclosure>
    </Accordion>
  );
}
