import React from 'react';
import { TextField, Flex, RadioGroup, Radio, ContextualHelp, Heading, Content, Text } from "@adobe/react-spectrum";
import WrappedRadioGroup from "../../../components/WrappedRadioGroup";
import WrappedTextField from '../../../components/wrappedTextField';

export default () => (
  <Flex direction="column" gap="size-65">
    <WrappedTextField
      name="eventName"
      component={TextField}
      width="size-4600"
      label="Event Name"
      isRequired
      necessityIndicator="label"
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>Event Name</Heading>
          <Content>
            <Text>
              Enter any event name that identifies this event.
            </Text>
          </Content>
        </ContextualHelp>
      }
    />

    <WrappedTextField
      name="eventDetailsElement"
      component={TextField}
      width="size-4600"
      label="Event Details Data Element"
      isRequired
      necessityIndicator="label"
      supportDataElement
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>Event Details</Heading>
          <Content>
            <Text>
              Set the Data Element that will return Event Details
              (objectId, queryId (optional), and position (optional)).
            </Text>
          </Content>
        </ContextualHelp>
      }
    />

    <WrappedTextField
      name="userTokenDataElement"
      component={TextField}
      width="size-4600"
      label="User Token Data Element"
      isRequired
      necessityIndicator="label"
      supportDataElement
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>User Token</Heading>
          <Content>
            <Text>
              Set the Data Element that will return the User Token.
            </Text>
          </Content>
        </ContextualHelp>
      }
    />

    <WrappedTextField
      name="indexDataElement"
      component={TextField}
      width="size-4600"
      label="Index Name Data Element"
      necessityIndicator="label"
      supportDataElement
      contextualHelp={
        <ContextualHelp variant="info">
          <Heading>Index Name</Heading>
          <Content>
            <Text>
              Set a Data Element that will return the Index Name to be passed with this event.
              If empty, the default Index Name configured in the Extension will be used.
            </Text>
          </Content>
        </ContextualHelp>
      }
    />

    {/*<WrappedRadioGroup*/}
    {/*  name="strategyProcessClicks"*/}
    {/*  component={RadioGroup}*/}
    {/*  width="size-4600"*/}
    {/*  label="Conversion Strategy"*/}
    {/*  isRequired*/}
    {/*  necessityIndicator="label"*/}
    {/*  defaultValue="single"*/}
    {/*  contextualHelp={*/}
    {/*    <ContextualHelp variant="info">*/}
    {/*      <Heading>Conversion Strategy</Heading>*/}
    {/*      <Content>*/}
    {/*        <Text>*/}
    {/*          Select on the conversion to process the click*/}
    {/*          for the current page/product or process all the clicks as conversion.*/}
    {/*        </Text>*/}
    {/*      </Content>*/}
    {/*    </ContextualHelp>*/}
    {/*  }*/}
    {/*>*/}
    {/*  <Radio value="single">Convert click on the current page/product.</Radio>*/}
    {/*  <Radio value="all">Convert all clicks</Radio>*/}
    {/*</WrappedRadioGroup>*/}
  </Flex>
);
