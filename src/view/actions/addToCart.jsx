import React from 'react';
import ExtensionView from '../components/extensionView';
import ConfigurationFields from './components/addToCart/fields';
import getConfigurationInitValues from './components/addToCart/getInitValues';
import getConfigurationSettings from './components/addToCart/getSettings';
import validateConfigurationFields from './components/addToCart/validate';

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
