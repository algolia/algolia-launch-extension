import React from 'react';
import ExtensionView from '../components/extensionView';
import ConfigurationFields from './components/convertedAfterSearch/fields';
import getConfigurationInitValues from './components/convertedAfterSearch/getInitValues';
import getConfigurationSettings from './components/convertedAfterSearch/getSettings';
import validateConfigurationFields from './components/convertedAfterSearch/validate';

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
