import { Content, ContextualHelp, Flex, Heading, Radio, RadioGroup } from "@adobe/react-spectrum";
import React from "react";
import WrappedRadioGroup from "../../../components/WrappedRadioGroup";

export default () => (
  <Flex direction="column" gap="size-65">
    <WrappedRadioGroup
      name="storageStrategy"
      component={RadioGroup}
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
              Select the storage.
            </Text>
          </Content>
        </ContextualHelp>
      }
    >
      <Radio value="localStorage">Local Storage</Radio>
      <Radio value="sessionStorage">Session Storage</Radio>
    </WrappedRadioGroup>
  </Flex>
);
