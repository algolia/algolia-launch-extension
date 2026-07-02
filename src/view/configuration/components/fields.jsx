import {
  Content,
  ContextualHelp,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Flex,
  Heading,
  Link,
  Radio,
  RadioGroup,
  Text,
  TextField
} from '@adobe/react-spectrum';
import React from 'react';
import { useWatch } from 'react-hook-form';
import WrappedRadioGroup from '../../components/WrappedRadioGroup';
import WrappedTextField from '../../components/wrappedTextField';

export default function () {
  const credentialType = useWatch({ name: 'credentialType' }) || 'credentials';
  const usingProxy = credentialType === 'proxy';

  return (
    <Flex direction="column" gap="size-65">
      <Disclosure defaultExpanded isQuiet>
        <DisclosureTitle>Authentication</DisclosureTitle>
        <DisclosurePanel>
          <Flex direction="column" gap="size-200">
            <WrappedRadioGroup
              name="credentialType"
              component={RadioGroup}
              defaultValue="credentials"
              label="Authentication method"
              contextualHelp={
                <ContextualHelp variant="info">
                  <Heading>Authentication method</Heading>
                  <Content>
                    <Text>
                      Choose how the extension authenticates with Algolia.
                      Select <b>Default</b> to send events directly to Algolia
                      using your Application ID and Search API Key. Select{' '}
                      <b>Proxy</b> to route events through your own server,
                      which injects the credentials server-side and keeps them
                      hidden from the browser.
                    </Text>
                  </Content>
                </ContextualHelp>
              }
            >
              <Radio value="credentials">Default</Radio>
              <Radio value="proxy">Proxy</Radio>
            </WrappedRadioGroup>

            {usingProxy ? (
              <>
                <WrappedTextField
                  name="proxyUrl"
                  component={TextField}
                  width="size-4600"
                  label="Proxy URL"
                  isRequired
                  necessityIndicator="label"
                  supportDataElement
                  contextualHelp={
                    <ContextualHelp variant="info">
                      <Heading>Proxy URL</Heading>
                      <Content>
                        <Text>
                          Enter the URL of your server to route Insights events
                          through before they are forwarded to Algolia. Your
                          proxy is responsible for injecting the Algolia
                          Application ID and Search API Key, so those fields can
                          be left blank to keep the credentials hidden from the
                          browser. You can also use a data element to set this
                          value dynamically.
                        </Text>
                      </Content>
                    </ContextualHelp>
                  }
                />
                <WrappedTextField
                  name="appId"
                  component={TextField}
                  width="size-4600"
                  label="Application ID"
                  necessityIndicator="label"
                  contextualHelp={
                    <ContextualHelp variant="info">
                      <Heading>Application ID</Heading>
                      <Content>
                        <Text>
                          Optional when a Proxy URL is configured, since the
                          proxy supplies the credentials. Enter the Application
                          ID found on the Algolia Dashboard in the{' '}
                          <Link
                            href="https://www.algolia.com/account/api-keys/all"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            API Keys
                          </Link>{' '}
                          section only if your proxy requires it.
                        </Text>
                      </Content>
                    </ContextualHelp>
                  }
                />
                <WrappedTextField
                  name="apiKey"
                  component={TextField}
                  width="size-4600"
                  label="Search API Key"
                  necessityIndicator="label"
                  contextualHelp={
                    <ContextualHelp variant="info">
                      <Heading>Search API Key</Heading>
                      <Content>
                        <Text>
                          Optional when a Proxy URL is configured. Leave blank
                          to keep the key hidden from the browser; the proxy
                          injects it server-side.
                        </Text>
                      </Content>
                    </ContextualHelp>
                  }
                />
              </>
            ) : (
              <>
                <WrappedTextField
                  name="appId"
                  component={TextField}
                  width="size-4600"
                  label="Application ID"
                  isRequired
                  necessityIndicator="label"
                  contextualHelp={
                    <ContextualHelp variant="info">
                      <Heading>Application ID</Heading>
                      <Content>
                        <Text>
                          Enter the Application ID found on the Algolia
                          Dashboard in the{' '}
                          <Link
                            href="https://www.algolia.com/account/api-keys/all"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            API Keys
                          </Link>{' '}
                          section.
                        </Text>
                      </Content>
                    </ContextualHelp>
                  }
                />
                <WrappedTextField
                  name="apiKey"
                  component={TextField}
                  width="size-4600"
                  label="Search API Key"
                  isRequired
                  necessityIndicator="label"
                  contextualHelp={
                    <ContextualHelp variant="info">
                      <Heading>Search API Key</Heading>
                      <Content>
                        <Text>
                          Enter the Search API Key found on the Algolia
                          Dashboard in the{' '}
                          <Link
                            href="https://www.algolia.com/account/api-keys/all"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            API Keys
                          </Link>{' '}
                          section.
                        </Text>
                      </Content>
                    </ContextualHelp>
                  }
                />
              </>
            )}
          </Flex>
        </DisclosurePanel>
      </Disclosure>
      <Disclosure defaultExpanded isQuiet>
        <DisclosureTitle>Configuration</DisclosureTitle>
        <DisclosurePanel>
          <WrappedTextField
            name="indexName"
            component={TextField}
            width="size-4600"
            label="Index Name"
            isRequired
            necessityIndicator="label"
            contextualHelp={
              <ContextualHelp variant="info">
                <Heading>Index Name</Heading>
                <Content>
                  <Text>
                    Enter the Index Name that contain the Products or Content.
                    This Index will be used as a default.
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
            name="authenticatedUserTokenDataElement"
            component={TextField}
            width="size-4600"
            label="Authenticated User Token Data Element"
            necessityIndicator="label"
            supportDataElement
            contextualHelp={
              <ContextualHelp variant="info">
                <Heading>Authenticated User Token</Heading>
                <Content>
                  <Text>
                    Set the Data Element that will return the Authenticated User
                    Token.
                  </Text>
                </Content>
              </ContextualHelp>
            }
          />
          <WrappedTextField
            name="currency"
            component={TextField}
            width="size-4600"
            label="Currency Code"
            necessityIndicator="label"
            supportDataElement
            contextualHelp={
              <ContextualHelp variant="info">
                <Heading>Currency Code</Heading>
                <Content>
                  <Text>
                    Specify the currency as ISO-4217 currency code, such as USD
                    or EUR.
                  </Text>
                </Content>
              </ContextualHelp>
            }
          />
        </DisclosurePanel>
      </Disclosure>
    </Flex>
  );
}
