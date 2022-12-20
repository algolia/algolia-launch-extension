import React from 'react';

import ExtensionView from '../components/extensionView';

import ConfigurationFields from './components/convertAfterSearch/fields';
import getConfigurationInitValues from './components/convertAfterSearch/getInitValues';
import getConfigurationSettings from './components/convertAfterSearch/getSettings';
import validateConfigurationFields from './components/convertAfterSearch/validate';

export default () => (
  <ExtensionView
    getInitialValues={({ initInfo }) => ({
      ...getConfigurationInitValues(initInfo)
    })}
    getSettings={({ values }) => ({
      ...getConfigurationSettings(values)
    })}
    validate={(values) => ({
      ...validateConfigurationFields(values)
    })}
    render={() => (
      <>
        <ConfigurationFields />
      </>
    )}
  />
);
