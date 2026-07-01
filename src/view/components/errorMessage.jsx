import { Content, Heading, IllustratedMessage } from '@adobe/react-spectrum';
import NotFound from '@spectrum-icons/illustrations/NotFound';
import React from 'react';

export default function ({ message = 'There was an error!' }) {
  return (
    <IllustratedMessage marginTop="size-1000">
      <NotFound />
      <Heading>An error has occured</Heading>
      <Content>{message}</Content>
    </IllustratedMessage>
  );
}
