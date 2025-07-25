import React from 'react';
import ExtensionView from '../components/extensionView';
import ConfigurationFields from './components/clicked/fields';
import getConfigurationInitValues from './components/clicked/getInitValues';
import getConfigurationSettings from './components/clicked/getSettings';
import validateConfigurationFields from './components/clicked/validate';

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
      <>
        <ConfigurationFields />
      </>
    ) }
  />
);
