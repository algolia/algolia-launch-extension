import React from 'react';
import ExtensionView from '../components/extensionView';
import ConfigurationFields from './components/queryString/fields';
import getConfigurationInitValues from './components/queryString/getInitValues';
import getConfigurationSettings from './components/queryString/getSettings';
import validateConfigurationFields from './components/queryString/validate';

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
