import React from 'react';
import ExtensionView from '../components/extensionView';
import ConfigurationFields from './components/purchase/fields';
import getConfigurationInitValues from './components/purchase/getInitValues';
import getConfigurationSettings from './components/purchase/getSettings';
import validateConfigurationFields from './components/purchase/validate';

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
