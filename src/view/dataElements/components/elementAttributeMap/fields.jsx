import {
  Accordion,
  ActionButton,
  Button,
  Content,
  ContextualHelp,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Flex,
  Heading,
  Text,
  TextField,
  Tooltip,
  TooltipTrigger,
  View
} from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import Delete from '@spectrum-icons/workflow/Delete';
import React, { useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import WrappedTextField from '../../../components/wrappedTextField';

const DEFAULT_MAPPING = {
  selector: 'html',
  attributeName: 'lang',
  outputKey: ''
};

function MappingFields({ index, canRemove, onRemove, onOutputKeyChange }) {
  return (
    <View
      borderWidth="thin"
      borderColor="dark"
      borderRadius="medium"
      padding="size-200"
    >
      <Flex direction="column" gap="size-100">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          minHeight="size-400"
        >
          <Heading level={4} margin={0}>
            Mapping {index + 1}
          </Heading>
          {canRemove ? (
            <TooltipTrigger>
              <ActionButton
                isQuiet
                aria-label={`Remove mapping ${index + 1}`}
                onPress={onRemove}
              >
                <Delete />
              </ActionButton>
              <Tooltip>Remove mapping</Tooltip>
            </TooltipTrigger>
          ) : null}
        </Flex>

        <WrappedTextField
          name={`mappings.${index}.selector`}
          component={TextField}
          width="size-4600"
          label="Element Selector"
          isRequired
          necessityIndicator="label"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Element Selector</Heading>
              <Content>
                <Text>
                  Enter the CSS selector of the element to read. The first
                  matching element is used. Defaults to html.
                </Text>
              </Content>
            </ContextualHelp>
          }
        />

        <WrappedTextField
          name={`mappings.${index}.attributeName`}
          component={TextField}
          width="size-4600"
          label="Attribute / Property Name"
          onChange={onOutputKeyChange}
          isRequired
          necessityIndicator="label"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Attribute / Property Name</Heading>
              <Content>
                <Text>
                  Enter the attribute or property to read from the element (for
                  example: lang, data-locale, content). Defaults to lang.
                </Text>
              </Content>
            </ContextualHelp>
          }
        />

        <WrappedTextField
          name={`mappings.${index}.outputKey`}
          component={TextField}
          width="size-4600"
          label="Output Key"
          onChange={onOutputKeyChange}
          necessityIndicator="label"
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Output Key</Heading>
              <Content>
                <Text>
                  Optional. The key used in the returned JSON object (for
                  example: Accept-Language). Defaults to the attribute name. All
                  mappings are merged into one object, so each key must be
                  unique.
                </Text>
              </Content>
            </ContextualHelp>
          }
        />
      </Flex>
    </View>
  );
}

export default function () {
  const { control, getValues, trigger } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'mappings'
  });
  const addButtonRef = useRef(null);

  // Duplicate output keys are a cross-row error, so every row's output key
  // must be revalidated when any row's effective key or the row count changes.
  const revalidateOutputKeys = () => {
    const names = (getValues('mappings') || []).map(
      (_, index) => `mappings.${index}.outputKey`
    );
    if (names.length) {
      trigger(names).catch(() => {});
    }
  };

  return (
    <Accordion defaultExpandedKeys={['general']}>
      <Disclosure id="general">
        <DisclosureTitle>General</DisclosureTitle>
        <DisclosurePanel>
          <Flex direction="column" gap="size-200">
            <Text>
              Add one or more attribute mappings. Each mapping becomes a key in
              the returned JSON object (for example, HTTP headers).
            </Text>

            {fields.map((field, index) => (
              <MappingFields
                key={field.id}
                index={index}
                canRemove={fields.length > 1}
                onRemove={() => {
                  remove(index);
                  revalidateOutputKeys();
                  addButtonRef.current?.focus();
                }}
                onOutputKeyChange={revalidateOutputKeys}
              />
            ))}

            <View>
              <Button
                ref={addButtonRef}
                variant="secondary"
                onPress={() => append({ ...DEFAULT_MAPPING })}
              >
                <Add />
                <Text>Add Mapping</Text>
              </Button>
            </View>
          </Flex>
        </DisclosurePanel>
      </Disclosure>
    </Accordion>
  );
}
