import React from 'react';
import ExtensionView from '../components/extensionView';
import ConfigurationFields from './components/addedToCart/fields';
import getConfigurationInitValues from './components/addedToCart/getInitValues';
import getConfigurationSettings from './components/addedToCart/getSettings';
import validateConfigurationFields from './components/addedToCart/validate';

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
