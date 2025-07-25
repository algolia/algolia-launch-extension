import React from 'react';
import ExtensionView from '../components/extensionView';
import ConfigurationFields from './components/converted/fields';
import getConfigurationInitValues from './components/converted/getInitValues';
import getConfigurationSettings from './components/converted/getSettings';
import validateConfigurationFields from './components/converted/validate';

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
