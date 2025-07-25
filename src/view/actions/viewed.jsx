import React from 'react';
import ExtensionView from '../components/extensionView';
import ConfigurationFields from './components/viewed/fields';
import getConfigurationInitValues from './components/viewed/getInitValues';
import getConfigurationSettings from './components/viewed/getSettings';
import validateConfigurationFields from './components/viewed/validate';

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
