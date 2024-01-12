import React from 'react';
import ExtensionView from '../components/extensionView';
import ConfigurationFields from './components/purchased/fields';
import getConfigurationInitValues from './components/purchased/getInitValues';
import getConfigurationSettings from './components/purchased/getSettings';
import validateConfigurationFields from './components/purchased/validate';

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
