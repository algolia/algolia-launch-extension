import React from 'react';
import ExtensionView from '../components/extensionView';
import ConfigurationFields from './components/storage/fields';
import getConfigurationInitValues from './components/storage/getInitValues';
import getConfigurationSettings from './components/storage/getSettings';
import validateConfigurationFields from './components/storage/validate';

export default () => (
  <ExtensionView
    getInitialValues={ ({ initInfo }) => ({
      ...getConfigurationInitValues(initInfo)
    }) }
    getSettings={ ({ values }) => ({
      ...getConfigurationSettings(values)
    }) }
    validate={ (values) => ({
      ...validateConfigurationFields(values)
    }) }
    render={ () => (
      <ConfigurationFields />
    ) }
  />
);
