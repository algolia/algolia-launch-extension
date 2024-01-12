import React from 'react';
import ExtensionView from '../components/extensionView';
import ConfigurationFields from './components/loadInsights/fields';
import getConfigurationInitValues from './components/loadInsights/getInitValues';
import getConfigurationSettings from './components/loadInsights/getSettings';
import validateConfigurationFields from './components/loadInsights/validate';

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
