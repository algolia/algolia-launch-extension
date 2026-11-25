import { Content, Heading, Text, View } from '@adobe/react-spectrum';
import React from 'react';

export default function () {
  return (
    <View maxWidth="size-6000">
      <Heading level={3}>Hits List</Heading>
      <Content>
        <Text>
          Returns the event details (<code>indexName</code>,{' '}
          <code>objectIDs</code>, <code>timestamp</code>) of the hits that were
          just rendered. Use it as the Event Details Data Element of the{' '}
          <b>Viewed</b> action in a rule whose event is <b>Hits List Changed</b>
          . It returns an empty object for any other event.
        </Text>
      </Content>
    </View>
  );
}
