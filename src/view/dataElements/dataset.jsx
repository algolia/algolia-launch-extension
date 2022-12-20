import React from 'react';

import ExtensionView from '../components/extensionView';

import ConfigurationFields from './components/dataset/fields';
import getConfigurationInitValues from './components/dataset/getInitValues';
import getConfigurationSettings from './components/dataset/getSettings';
import validateConfigurationFields from './components/dataset/validate';

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
      <ConfigurationFields />
    )}
  />
);
